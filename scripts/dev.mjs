// Local dev server: serves /site statically (with Vercel-style clean URLs)
// and mounts api/contact.ts at POST /api/contact, exactly as Vercel does in
// production. Zero dependencies; needs Node 22.18+ for TypeScript imports.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SITE = join(ROOT, "site");
const PORT = Number(process.env.PORT) || 3065;

// Load .env.local so SEND_DEV_API_KEY reaches the contact function
const envPath = join(ROOT, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2].replace(/^"(.*)"$/, "$1");
    }
  }
}

const { POST: contactPost } = await import("../api/contact.ts");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};

async function handleApi(req, res) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") headers.set(key, value);
    else if (Array.isArray(value)) headers.set(key, value.join(", "));
  }

  const request = new Request(`http://localhost:${PORT}${req.url}`, {
    method: req.method,
    headers,
    body: Buffer.concat(chunks),
  });

  const response = await contactPost(request);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}

async function handleStatic(req, res) {
  let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  if (pathname.endsWith("/")) pathname += "index.html";

  let file = normalize(join(SITE, pathname));
  if (!file.startsWith(SITE)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  // Clean URLs: /attorneys -> attorneys.html
  if (!extname(file) && existsSync(`${file}.html`)) file += ".html";

  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}

createServer(async (req, res) => {
  try {
    if (req.url.split("?")[0] === "/api/contact") {
      if (req.method !== "POST") {
        res.writeHead(405, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Method not allowed" }));
      }
      return await handleApi(req, res);
    }
    return await handleStatic(req, res);
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal error");
  }
}).listen(PORT, () => {
  const keyState = process.env.SEND_DEV_API_KEY ? "loaded" : "MISSING — form will 503";
  console.log(`HML dev server → http://localhost:${PORT}  (send.dev key: ${keyState})`);
});
