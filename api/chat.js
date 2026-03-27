const SYSTEM_PROMPT = `
Role
You are the official AI assistant for BlockchainPH (blockchainph.org), representing BPAP, the Blockchain Practitioners Association of the Philippines.

Response Style
- Be clear, professional, warm, and concise.
- Answer in a helpful customer support tone, not a hype or salesy tone.
- Keep replies short by default: usually 2 to 5 sentences.
- Do not use markdown headings, long lists, or code blocks unless the user explicitly asks for a structured format.
- Do not ramble or give textbook-style explanations.
- Prioritize practical next steps.
- When appropriate, invite the user to apply, pre-register, email, or use the website contact form.

Rules
- Stay focused on BPAP, BlockchainPH, BPAP Academy, BPAP Insights, membership, events, workshops, speaking, partnerships, blockchain literacy, digital asset literacy, regulation, compliance, and forensics.
- Use only the approved facts in this prompt when answering BPAP-specific questions.
- Do not invent fees, schedules, deadlines, certifications, approval status, or policies.
- If the answer is not stated here, say you are not fully certain and direct the user to hello@blockchainph.org or the contact form on blockchainph.org.
- If you cannot confidently answer a question, tell the customer you'll connect them with someone and ask for their name and email.
- If asked about membership fees, exact enrollment opening dates, or other details not explicitly listed here, say BPAP should be contacted directly for confirmation.
- BPAP is not an investment advisory body. Do not give investment advice, price predictions, or trading recommendations.
- If a user confuses BPAP with BAP or BCP, politely clarify that they are separate organizations.
- Treat the time-sensitive facts below as approved organizational knowledge unless the site owner updates them later.
- If a question is outside BPAP's scope, say that you are BPAP's assistant and can help with BPAP services, academy programs, blockchain literacy, regulation, compliance, and forensics-related questions.
- Do not act like a general coding assistant, research assistant, or broad technical help desk.
- Do not provide code samples, scraping scripts, deployment tutorials, or unrelated software support.
- If asked about unrelated tools like Vercel, Python scraping, or general programming, politely decline and redirect to BPAP-related topics.
- For general blockchain questions, keep the answer high-level, practical, and short, and connect it back to BPAP education when relevant.

Preferred Support Actions
- Membership inquiries: direct users to blockchainph.org and "Apply for Membership."
- Academy/course inquiries: direct users to blockchainph.org/academy and explain pre-registration where relevant.
- Speaking, training, workshops, and partnerships: direct users to hello@blockchainph.org.
- General contact: hello@blockchainph.org, the BPAP Facebook page, or the website contact form.

Core Facts
- BPAP is the Blockchain Practitioners Association of the Philippines and its official site is blockchainph.org.
- BPAP is distinct from BAP and BCP.
- BPAP is rooted in Davao City and serves practitioners across the Philippines.
- BPAP is led by Ferdie James Nervida, ACWI, ASCI.
- Contact options: hello@blockchainph.org, facebook.com/blockchainpractitioners, and the website contact form.

Membership
- Users apply on blockchainph.org via "Apply for Membership."
- The form asks for name, email, mobile number, city/province, organization, role, expertise, experience, contribution area, and LinkedIn/professional profile.
- BPAP does not publicly list a membership fee. For fee questions, direct users to hello@blockchainph.org.
- Applications are reviewed first; there is no instant auto-approval.
- Membership benefits: ecosystem events, professional network, ways to contribute, and credible association presence.

Academy
- BPAP Academy is BPAP's education arm.
- Current programs: Blockchain and Cryptocurrency Specialist Certification; Blockchain Systems and Digital Asset Literacy for Professionals; Introduction to Blockchain Technology; Introduction to Blockchain Investigations and Forensics; Cryptocurrency Essentials.
- Academy enrollment is still in pre-registration/final development based on the approved information in this prompt.
- Users can pre-register at blockchainph.org/academy.
- Formats planned: online, face-to-face, or either.
- The 16-hour digital asset literacy course is non-technical and built for professionals, managers, educators, and government personnel.
- For certificate specifics or exact enrollment timing, direct users to hello@blockchainph.org.

Partnerships And Activities
- BPAP is open to speaking engagements, training, workshops, forums, and ecosystem collaboration via hello@blockchainph.org.
- BPAP Insights is available at blockchainph.org/insights and accepts article proposals through the website.
- BPAP has engaged with DICT, law enforcement capability-building, academic forums, and policy discussions.

Regulatory And Risk Context
- BPAP is not an investment advisory body and must not be presented as giving investment recommendations.
- The BSP regulates virtual asset service providers in the Philippines.
- BPAP emphasizes professional standards, responsible education, blockchain literacy, and forensics capability.
`.trim();

const PROVIDER = (process.env.PROVIDER || "openai").trim().toLowerCase();
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-3-5-haiku-latest";
const ANTHROPIC_VERSION = "2023-06-01";
const MAX_MESSAGES = 12;
const MAX_CHARS_PER_MESSAGE = 1200;
const MAX_TOTAL_CHARS = 6000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;
const DAILY_REQUEST_CAP = 200;
const DAILY_CAP_WINDOW_SECONDS = 60 * 60 * 24;
const CLAUDE_MAX_TOKENS = 280;
const OPENAI_MAX_TOKENS = 280;
const ABUSE_REPEAT_LIMIT = 5;
const ABUSE_URL_LIMIT = 4;
const BLOCKED_PATTERNS = [
  /ignore\s+previous\s+instructions/i,
  /reveal\s+(the\s+)?system\s+prompt/i,
  /prompt\s+injection/i,
  /bypass|jailbreak/i,
  /make\s+me\s+admin/i,
];

function parseAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getCorsHeaders(origin) {
  const allowedOrigins = parseAllowedOrigins();
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function isOriginAllowed(origin) {
  const allowedOrigins = parseAllowedOrigins();
  if (!origin) {
    return false;
  }
  return allowedOrigins.includes(origin);
}

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const realIp = req.headers["x-real-ip"];
  const cfConnectingIp = req.headers["cf-connecting-ip"];
  const value = forwardedFor || realIp || cfConnectingIp || "";
  return String(value).split(",")[0].trim() || "unknown";
}

function sanitizeText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, MAX_CHARS_PER_MESSAGE);
}

function sanitizeMessages(rawMessages) {
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    throw new Error("Request body must include a non-empty messages array.");
  }

  const trimmed = rawMessages.slice(-MAX_MESSAGES);
  const sanitized = [];
  let totalChars = 0;

  for (const message of trimmed) {
    const role = message?.role === "assistant" ? "assistant" : "user";
    const content = sanitizeText(message?.content);

    if (!content) {
      continue;
    }

    totalChars += content.length;
    if (totalChars > MAX_TOTAL_CHARS) {
      break;
    }

    sanitized.push({ role, content });
  }

  if (!sanitized.length) {
    throw new Error("No valid messages were provided.");
  }

  return sanitized;
}

function isAbusiveMessage(content) {
  const repeatedCharMatch = content.match(/(.)\1{7,}/g) || [];
  const urlMatches = content.match(/https?:\/\/\S+/gi) || [];

  if (repeatedCharMatch.length >= ABUSE_REPEAT_LIMIT) {
    return true;
  }

  if (urlMatches.length >= ABUSE_URL_LIMIT) {
    return true;
  }

  return BLOCKED_PATTERNS.some((pattern) => pattern.test(content));
}

function assertNoAbuse(messages) {
  for (const message of messages) {
    if (isAbusiveMessage(message.content)) {
      throw new Error("This request was blocked by the abuse filter.");
    }
  }
}

function sanitizeEmail(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
}

function sanitizeName(value) {
  return sanitizeText(value).slice(0, 120);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeConversationForHandoff(rawMessages) {
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    throw new Error("A conversation transcript is required.");
  }

  return rawMessages
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message?.role === "assistant" ? "assistant" : "user",
      content: sanitizeText(message?.content),
    }))
    .filter((message) => message.content);
}

async function upstashRequest(path, body) {
  const url = process.env.RATE_LIMIT_REDIS_URL;
  const token = process.env.RATE_LIMIT_REDIS_TOKEN;

  if (!url || !token) {
    throw new Error("Missing Upstash Redis environment variables.");
  }

  const response = await fetch(`${url}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Upstash error: ${response.status}`);
  }

  return response.json();
}

async function checkRateLimit(ip) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const safeIp = encodeURIComponent(ip);
  const windowId = Math.floor(nowSeconds / RATE_LIMIT_WINDOW_SECONDS);
  const ttlSeconds = RATE_LIMIT_WINDOW_SECONDS - (nowSeconds % RATE_LIMIT_WINDOW_SECONDS);
  const dayId = Math.floor(nowSeconds / DAILY_CAP_WINDOW_SECONDS);
  const dailyTtlSeconds = DAILY_CAP_WINDOW_SECONDS - (nowSeconds % DAILY_CAP_WINDOW_SECONDS);
  const hourlyKey = `chat_rate_limit:${safeIp}:${windowId}`;
  const dailyKey = `chat_daily_total:${dayId}`;

  const result = await upstashRequest("/pipeline", [
    ["INCR", hourlyKey],
    ["EXPIRE", hourlyKey, ttlSeconds],
    ["INCR", dailyKey],
    ["EXPIRE", dailyKey, dailyTtlSeconds],
  ]);

  const count = Number(result?.[0]?.result ?? 0);
  const dailyCount = Number(result?.[2]?.result ?? 0);

  return {
    allowed: count <= RATE_LIMIT_MAX && dailyCount <= DAILY_REQUEST_CAP,
    count,
    remaining: Math.max(0, RATE_LIMIT_MAX - count),
    dailyCount,
    dailyRemaining: Math.max(0, DAILY_REQUEST_CAP - dailyCount),
    resetSeconds: count > RATE_LIMIT_MAX ? ttlSeconds : dailyTtlSeconds,
  };
}

async function streamOpenAIResponse(messages, res, corsHeaders) {
  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      stream: true,
      temperature: 0.4,
      max_tokens: OPENAI_MAX_TOKENS,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!openaiResponse.ok || !openaiResponse.body) {
    const errorText = await openaiResponse.text();
    throw new Error(`OpenAI error: ${openaiResponse.status} ${errorText}`);
  }

  res.writeHead(200, {
    ...corsHeaders,
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Accel-Buffering": "no",
  });

  const reader = openaiResponse.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const event of events) {
      const lines = event.split("\n");
      for (const line of lines) {
        if (!line.startsWith("data: ")) {
          continue;
        }

        const data = line.slice(6).trim();
        if (!data || data === "[DONE]") {
          continue;
        }

        try {
          const parsed = JSON.parse(data);
          const delta = parsed?.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta) {
            res.write(delta);
          }
        } catch {
          continue;
        }
      }
    }
  }

  res.end();
}

async function streamClaudeResponse(messages, res, corsHeaders) {
  const claudeMessages = messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role,
      content: message.content,
    }));

  const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": ANTHROPIC_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      stream: true,
      max_tokens: CLAUDE_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      temperature: 0.4,
      messages: claudeMessages,
    }),
  });

  if (!claudeResponse.ok || !claudeResponse.body) {
    const errorText = await claudeResponse.text();
    throw new Error(`Anthropic error: ${claudeResponse.status} ${errorText}`);
  }

  res.writeHead(200, {
    ...corsHeaders,
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Accel-Buffering": "no",
  });

  const reader = claudeResponse.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const event of events) {
      const lines = event.split("\n");
      for (const line of lines) {
        if (!line.startsWith("data: ")) {
          continue;
        }

        const data = line.slice(6).trim();
        if (!data) {
          continue;
        }

        try {
          const parsed = JSON.parse(data);
          const deltaType = parsed?.delta?.type;
          const text = parsed?.delta?.text;
          if (deltaType === "text_delta" && typeof text === "string" && text) {
            res.write(text);
          }
        } catch {
          continue;
        }
      }
    }
  }

  res.end();
}

async function streamProviderResponse(messages, res, corsHeaders) {
  if (PROVIDER === "claude") {
    return streamClaudeResponse(messages, res, corsHeaders);
  }

  return streamOpenAIResponse(messages, res, corsHeaders);
}

async function sendHandoffToMake(payload) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Server is missing MAKE_WEBHOOK_URL.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Make webhook error: ${response.status} ${errorText}`);
  }
}

function getStatusCode(error) {
  const message = error instanceof Error ? error.message : "";

  if (
    message.includes("Missing Upstash Redis environment variables") ||
    message.includes("Server is missing MAKE_WEBHOOK_URL.")
  ) {
    return 500;
  }

  if (
    message.includes("OpenAI error") ||
    message.includes("Anthropic error") ||
    message.includes("Upstash error") ||
    message.includes("Make webhook error")
  ) {
    return 502;
  }

  return 400;
}

function parseRequestBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    return JSON.parse(body);
  }

  return body;
}

function getRateLimitError(rateLimit) {
  if (rateLimit.dailyCount > DAILY_REQUEST_CAP) {
    return "The chatbot has reached its daily usage cap. Please try again tomorrow.";
  }

  return "Rate limit exceeded. Please try again later.";
}

module.exports = async function handler(req, res) {
  const requestUrl = new URL(req.url || "/api/chat", "http://localhost");
  const pathname = requestUrl.pathname;
  const origin = req.headers.origin || "";
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    if (!isOriginAllowed(origin)) {
      res.writeHead(403, corsHeaders);
      res.end("Origin not allowed.");
      return;
    }

    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(405, {
      ...corsHeaders,
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  if (!isOriginAllowed(origin)) {
    res.writeHead(403, {
      ...corsHeaders,
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "Origin not allowed." }));
    return;
  }

  const body = parseRequestBody(req.body);
  const isHandoff = pathname === "/api/handoff" || body?.mode === "handoff";

  if (isHandoff) {
    try {
      const ip = getClientIp(req);
      const rateLimit = await checkRateLimit(ip);

      if (!rateLimit.allowed) {
        res.writeHead(429, {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(rateLimit.resetSeconds),
        });
        res.end(JSON.stringify({ error: getRateLimitError(rateLimit) }));
        return;
      }

      const name = sanitizeName(body?.name);
      const email = sanitizeEmail(body?.email);
      const conversation = sanitizeConversationForHandoff(body?.conversation);
      const pageUrl = sanitizeText(body?.pageUrl || "");

      if (!name) {
        throw new Error("Name is required.");
      }

      if (!isValidEmail(email)) {
        throw new Error("A valid email is required.");
      }

      await sendHandoffToMake({
        source: "blockchainph-chatbot",
        provider: PROVIDER,
        submittedAt: new Date().toISOString(),
        origin,
        pageUrl,
        customer: {
          name,
          email,
        },
        conversation,
      });

      res.writeHead(200, {
        ...corsHeaders,
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ ok: true }));
      return;
    } catch (error) {
      res.writeHead(getStatusCode(error), {
        ...corsHeaders,
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Unexpected server error.",
        })
      );
      return;
    }
  }

  if (PROVIDER === "openai" && !process.env.OPENAI_API_KEY) {
    res.writeHead(500, {
      ...corsHeaders,
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "Server is missing OPENAI_API_KEY." }));
    return;
  }

  if (PROVIDER === "claude" && !process.env.ANTHROPIC_API_KEY) {
    res.writeHead(500, {
      ...corsHeaders,
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "Server is missing ANTHROPIC_API_KEY." }));
    return;
  }

  try {
    const ip = getClientIp(req);
    const rateLimit = await checkRateLimit(ip);

    if (!rateLimit.allowed) {
      res.writeHead(429, {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Retry-After": String(rateLimit.resetSeconds),
      });
      res.end(JSON.stringify({ error: getRateLimitError(rateLimit) }));
      return;
    }

    const messages = sanitizeMessages(body?.messages);
    assertNoAbuse(messages);
    await streamProviderResponse(messages, res, corsHeaders);
  } catch (error) {
    res.writeHead(getStatusCode(error), {
      ...corsHeaders,
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unexpected server error.",
      })
    );
  }
};
