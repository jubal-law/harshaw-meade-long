/**
 * Contact form handler for HarshawMeadeLong.com.
 *
 * Vercel serverless function (web handler). Sends two emails through the
 * send.dev HTTP API, following the askjubal beta-request pattern:
 *   1. an internal notification to the firm inbox
 *   2. a confirmation to the person who wrote in, in the firm's voice
 *
 * Requires SEND_DEV_API_KEY in the environment.
 */

const FROM = { email: "hello@jubal.law", name: "Harshaw, Meade & Long LLP" };
const RECIPIENT = process.env.CONTACT_RECIPIENT || "hello@jubal.law";

interface ContactPayload {
  name?: string;
  email?: string;
  matter?: string;
  message?: string;
  honeypot?: string;
  formLoadTime?: number;
  submissionTime?: number;
}

interface SendDevEmailParams {
  to: string[];
  subject: string;
  html: string;
  text: string;
  tags?: string[];
}

const MATTER_TYPES = [
  "Corporate",
  "Litigation",
  "Estates",
  "IP & Media",
  "Water Rights",
  "Frontier Commerce",
  "Other",
];

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendEmailViaSendDev(params: SendDevEmailParams) {
  const apiKey = process.env.SEND_DEV_API_KEY;
  const apiUrl =
    process.env.SEND_DEV_API_URL || "https://api.send.dev/v1/emails/send";

  if (!apiKey) {
    throw new Error("SEND_DEV_API_KEY not configured");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      from: FROM,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      tags: params.tags ?? ["hml-contact"],
    }),
  });

  if (!response.ok) {
    const err = (await response.json().catch(() => ({}))) as {
      error?: string;
      message?: string;
    };
    throw new Error(
      err.error || err.message || `send.dev failed: ${response.status}`,
    );
  }

  return response.json();
}

export async function POST(request: Request): Promise<Response> {
  try {
    if (!process.env.SEND_DEV_API_KEY) {
      return json(
        {
          error:
            "The form is not configured yet. Please email counsel@harshawmeadelong.com directly.",
        },
        503,
      );
    }

    const body = (await request.json().catch(() => ({}))) as ContactPayload;
    const {
      name = "",
      email = "",
      matter = "",
      message = "",
      honeypot = "",
      formLoadTime = 0,
      submissionTime = Date.now(),
    } = body;

    // Silent honeypot pass so bots don't learn they were filtered
    if (honeypot) {
      return json({ message: "Received." });
    }

    const timeSpent = formLoadTime ? submissionTime - formLoadTime : 0;
    if (timeSpent && timeSpent < 2500) {
      return json({ error: "Please take a moment to fill out the form." }, 400);
    }

    if (!name.trim() || !email.trim() || !matter.trim()) {
      return json(
        { error: "Name, email, and the nature of your matter are required." },
        400,
      );
    }

    if (name.length > 120 || email.length > 200 || message.length > 4000) {
      return json({ error: "One or more fields exceed the allowed length." }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Please enter a valid email address." }, 400);
    }

    if (!MATTER_TYPES.includes(matter)) {
      return json({ error: "Please select a practice from the list." }, 400);
    }

    // Geo/agent context injected by Vercel
    const h = request.headers;
    const clientIp =
      (h.get("x-forwarded-for") || "unknown").split(",")[0]?.trim() || "unknown";
    const location = [
      h.get("x-vercel-ip-city") || "",
      h.get("x-vercel-ip-country-region") || "",
      h.get("x-vercel-ip-country") || "",
    ]
      .filter(Boolean)
      .join(", ") || "Unknown";
    const userAgent = h.get("user-agent") || "Unknown";

    const submittedAt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      matter: escapeHtml(matter),
      message: escapeHtml(message),
      userAgent: escapeHtml(userAgent),
      location: escapeHtml(location),
      clientIp: escapeHtml(clientIp),
    };

    // 1. Internal notification
    await sendEmailViaSendDev({
      to: [RECIPIENT],
      subject: `[HML contact] ${name} · ${matter}`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 620px; margin: 0 auto; color: #1F2937;">
          <div style="height: 4px; background: #B99457;"></div>
          <div style="background: #0F1B2B; padding: 24px 28px;">
            <p style="margin: 0; color: #F6F2EA; font-size: 18px; letter-spacing: 0.15em;">HARSHAW MEADE LONG &middot; LLP</p>
            <p style="margin: 6px 0 0; color: #B99457; font-size: 11px; letter-spacing: 0.2em; font-family: Arial, sans-serif;">NEW CONSULTATION REQUEST</p>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #E3DCCD; border-top: none; padding: 28px;">
            <p style="margin: 6px 0;"><strong>Name:</strong> ${safe.name}</p>
            <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${safe.email}" style="color: #96763E;">${safe.email}</a></p>
            <p style="margin: 6px 0;"><strong>Nature of matter:</strong> ${safe.matter}</p>
            ${safe.message ? `
            <div style="border-top: 1px solid #E3DCCD; margin-top: 20px; padding-top: 20px;">
              <p style="margin: 0 0 8px; font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.15em; color: #96763E;">THEIR MATTER, BRIEFLY</p>
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${safe.message}</p>
            </div>` : ""}
            <div style="border-top: 1px solid #E3DCCD; margin-top: 24px; padding-top: 16px; font-family: Arial, sans-serif; font-size: 12px; color: #8A93A1;">
              <p style="margin: 3px 0;">Submitted: ${submittedAt} (Kansas City time)</p>
              <p style="margin: 3px 0;">Location: ${safe.location} &middot; IP: ${safe.clientIp}</p>
              <p style="margin: 3px 0; word-break: break-all;">User agent: ${safe.userAgent}</p>
            </div>
          </div>
        </div>
      `,
      text: [
        "New consultation request — HarshawMeadeLong.com",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Nature of matter: ${matter}`,
        message ? `\nTheir matter, briefly:\n${message}` : "",
        "",
        "---",
        `Submitted: ${submittedAt} (Kansas City time)`,
        `Location: ${location} · IP: ${clientIp}`,
        `User agent: ${userAgent}`,
      ]
        .filter(Boolean)
        .join("\n"),
      tags: ["hml-contact"],
    });

    // 2. Confirmation to the sender, in the firm's voice
    await sendEmailViaSendDev({
      to: [email],
      subject: "Received — Harshaw, Meade & Long LLP",
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; color: #1F2937;">
          <div style="height: 4px; background: #B99457;"></div>
          <div style="background: #0F1B2B; padding: 24px 28px;">
            <p style="margin: 0; color: #F6F2EA; font-size: 18px; letter-spacing: 0.15em;">HARSHAW MEADE LONG &middot; LLP</p>
            <p style="margin: 6px 0 0; color: #B99457; font-size: 11px; letter-spacing: 0.2em; font-family: Arial, sans-serif;">COUNSEL FOR THE LONG VIEW</p>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #E3DCCD; border-top: none; padding: 28px;">
            <p style="margin: 0 0 16px; font-size: 17px;">Dear ${safe.name},</p>
            <p style="margin: 0 0 16px; line-height: 1.7;">Your inquiry has been received. A member of the firm responds within one business day.</p>
            <p style="margin: 0 0 16px; line-height: 1.7;">We read every matter before we reply. If yours is urgent, the founding office can be reached at (816)&nbsp;555-1939.</p>
            <p style="margin: 24px 0 0;">Harshaw, Meade &amp; Long LLP</p>
            <p style="margin: 2px 0 0; color: #8A93A1; font-size: 14px;">1907 Butler Place, Suite 100, Kansas City, Missouri 64108</p>
            <div style="border-top: 1px solid #E3DCCD; margin-top: 28px; padding-top: 16px; font-family: Arial, sans-serif; font-size: 11px; line-height: 1.6; color: #8A93A1;">
              Harshaw, Meade &amp; Long is the demonstration practice of <a href="https://jubal.law" style="color: #96763E;">Jubal.law</a>.
              No legal services are offered, and this message does not create an attorney&ndash;client relationship.
            </div>
          </div>
        </div>
      `,
      text: [
        `Dear ${name},`,
        "",
        "Your inquiry has been received. A member of the firm responds within one business day.",
        "",
        "We read every matter before we reply. If yours is urgent, the founding office can be reached at (816) 555-1939.",
        "",
        "Harshaw, Meade & Long LLP",
        "1907 Butler Place, Suite 100, Kansas City, Missouri 64108",
        "",
        "---",
        "Harshaw, Meade & Long is the demonstration practice of Jubal.law. No legal services are offered, and this message does not create an attorney-client relationship.",
      ].join("\n"),
      tags: ["hml-contact-confirmation"],
    });

    return json({ message: "Received." });
  } catch (error) {
    console.error("Contact form error:", error);
    return json(
      { error: "Something went wrong. Please try again in a moment." },
      500,
    );
  }
}
