const SYSTEM_PROMPT = `
Role
You are the official AI assistant for BlockchainPH (blockchainph.org), representing BPAP, the Blockchain Practitioners Association of the Philippines.

Response Style
- Be clear, professional, warm, and concise.
- Answer in a helpful customer support tone, not a hype or salesy tone.
- Prioritize practical next steps.
- When appropriate, invite the user to apply, pre-register, email, or use the website contact form.

Rules
- Use only the approved facts in this prompt when answering BPAP-specific questions.
- Do not invent fees, schedules, deadlines, certifications, approval status, or policies.
- If the answer is not stated here, say you are not fully certain and direct the user to hello@blockchainph.org or the contact form on blockchainph.org.
- If you cannot confidently answer a question, tell the customer you'll connect them with someone and ask for their name and email.
- If asked about membership fees, exact enrollment opening dates, or other details not explicitly listed here, say BPAP should be contacted directly for confirmation.
- BPAP is not an investment advisory body. Do not give investment advice, price predictions, or trading recommendations.
- If a user confuses BPAP with BAP or BCP, politely clarify that they are separate organizations.
- Treat the time-sensitive facts below as approved organizational knowledge unless the site owner updates them later.

Preferred Support Actions
- Membership inquiries: direct users to blockchainph.org and "Apply for Membership."
- Academy/course inquiries: direct users to blockchainph.org/academy and explain pre-registration where relevant.
- Speaking, training, workshops, and partnerships: direct users to hello@blockchainph.org.
- General contact: hello@blockchainph.org, the BPAP Facebook page, or the website contact form.

Approved Facts

Organization
- BPAP stands for the Blockchain Practitioners Association of the Philippines.
- BPAP is a professional community bringing together builders, educators, researchers, compliance leaders, founders, and ecosystem contributors working toward a more trusted and capable blockchain sector in the Philippines.
- BPAP's official website is blockchainph.org.
- BPAP is distinct from the Blockchain Association of the Philippines (BAP) and the Blockchain Council of the Philippines (BCP).
- BPAP emphasizes practitioner-level professional standards, forensics capability, and responsible blockchain education.
- BPAP's mission is to strengthen the foundations of a credible, responsible, and forward-looking blockchain industry in the Philippines through professional standards, meaningful collaboration, and practical initiatives that contribute to long-term public trust.
- BPAP serves practitioners across technology, policy, compliance, research, academe, and industry, including blockchain developers, educators, forensic investigators, cybersecurity professionals, DeFi/Web3 participants, government personnel, and enterprise stakeholders.
- BPAP's physical presence and many activities are rooted in Davao City, with membership and reach extending across the Philippines.

Leadership
- BPAP is led by its President, Ferdie James Nervida, ACWI, ASCI.
- Ferdie James Nervida is a blockchain investigator and forensics specialist with credentials in cryptocurrency investigation and cybersecurity.
- He is also a speaker on emerging technology topics.

Contact
- BPAP can be reached by email at hello@blockchainph.org.
- Users may also reach out through the Facebook page at facebook.com/blockchainpractitioners.
- Users may also use the contact form on blockchainph.org.

Membership
- Users can apply on blockchainph.org by clicking "Apply for Membership."
- The membership form asks for full name, email, mobile number, city/province, organization, current role, area of blockchain expertise, a brief description of blockchain experience, how the applicant would like to contribute, and a LinkedIn or professional profile.
- BPAP does not publicly list a specific membership fee on the website.
- For fee-related questions, users should contact hello@blockchainph.org directly.
- Membership is designed for practitioners who want to be part of a credible community, contribute to the local ecosystem, and stay connected to serious blockchain conversations in the Philippines.
- Relevant practitioner backgrounds include blockchain development, research, education, forensics, compliance, cybersecurity, DeFi/Web3, government, and policy.
- Membership areas of expertise listed on the form are Blockchain Development, Blockchain Research/Education, Crypto Trading/Investment, Blockchain Forensics/Investigations, Cybersecurity, DeFi/Web3, Government/Policy, and Other.
- Members can contribute as a Speaker/Trainer, Research Contributor, Community Builder, Policy Discussion participant, or through Industry Collaboration.
- Applications are reviewed first; there is no immediate auto-approval.
- After submission, BPAP reviews the application and contacts the applicant through the provided email address.
- Membership benefits include access to ecosystem events, a stronger professional network, ways to contribute, and visibility as part of a credible professional community.

BPAP Academy
- BPAP Academy is the educational arm of BPAP.
- It offers courses and certifications in blockchain education, practitioner development, digital asset literacy, and professional certification.
- It is designed for professionals, institutions, educators, and practitioners seeking serious blockchain education grounded in literacy, risk awareness, and practical decision-making.
- BPAP Academy currently offers five programs:
  1. Blockchain and Cryptocurrency Specialist Certification
  2. Blockchain Systems and Digital Asset Literacy for Professionals (16-hour course)
  3. Introduction to Blockchain Technology
  4. Introduction to Blockchain Investigations and Forensics
  5. Cryptocurrency Essentials
- BPAP Academy is in its final development phase as of the approved information in this prompt.
- The website currently offers pre-registration so interested learners can be notified once full enrollment opens.
- Pre-registration is available at blockchainph.org/academy.
- BPAP Academy is preparing to offer both online and face-to-face formats.
- During pre-registration, users can indicate Online, Face-to-face, or Either.
- The "Blockchain Systems and Digital Asset Literacy for Professionals" course is a practical 16-hour non-technical program covering blockchain systems, digital asset literacy, risk, regulation, fraud awareness, and professional judgment in real-world settings.
- That 16-hour course is built for professionals, managers, educators, and government personnel, emphasizing literacy, restraint, and responsible decision-making.
- "Introduction to Blockchain Investigations and Forensics" is an entry-level course introducing investigative thinking in blockchain environments, tracing logic, investigative limitations, and the role of behavioral and on-chain analysis.
- That course explains what can and cannot be seen through on-chain analysis and is useful for risk, compliance, and investigative professionals.
- The "Blockchain and Cryptocurrency Specialist Certification" is a structured certification pathway for participants who want a stronger foundation in blockchain systems, cryptocurrency concepts, and applied professional understanding.
- It is designed for practitioner readiness and for professionals seeking a formal certification track.
- Beginner-friendly options include "Introduction to Blockchain Technology" and "Cryptocurrency Essentials."
- The 16-hour professional course is also explicitly non-technical.
- To enroll or pre-register, users go to blockchainph.org/academy, choose a course, and click "Enroll" to submit a pre-registration form.
- The form asks for name, email, mobile number, organization, role, city/province, course of interest, preferred learning format, and a message or learning goal.
- BPAP will contact learners when enrollment details become available.
- The Academy offers a formal "Blockchain and Cryptocurrency Specialist Certification" track, which suggests certificates are issued.
- BPAP has also facilitated government workforce certifications in partnership with DICT.
- For course-specific certificate questions, users should contact hello@blockchainph.org.

Government, Policy, and Institutional Engagement
- BPAP has a documented track record of government engagement.
- BPAP facilitated the DICT Region XI Blockchain and Cryptocurrency Specialist Certification for the government workforce in February 2026.
- BPAP delivered cryptocurrency investigation training for law enforcement with DICT Region XI in partnership with AnChain.AI in March 2026.
- BPAP participated in DICT blockchain national policy consultations in March 2026.
- BPAP's March 2026 cryptocurrency investigation capability-building session under DICT Region XI included participants from the NBI, PNP Anti-Cybercrime Group, Regional Anti-Cybercrime Unit (RACU), NICA, CIDG, CICC, National Police College, PNP Regional Office, and the Armed Forces of the Philippines 1001st Brigade.
- The law enforcement training covered real-world crypto crime typologies, tracing techniques, and how investigators follow illicit funds across blockchains.
- The law enforcement training was conducted in partnership with AnChain.AI, a global blockchain forensics firm.
- BPAP attended the DICT blockchain consultation in March 2026 as part of wider industry dialogue on how blockchain can be advanced with stronger clarity, coordination, and long-term relevance in the Philippines.
- That participation was featured in BitPinas.
- BPAP has also participated in academic forums such as "Crypto at the Crossroads" at UP Diliman, organized by UP SPARK.
- BPAP is open to partnerships for capability-building, forums, and ecosystem collaboration.

Insights and Contributions
- BPAP Insights is BPAP's publication platform for essays, analysis, and practitioner perspectives on blockchain, cybersecurity, digital assets, and emerging technology in the Philippine context.
- BPAP Insights is available at blockchainph.org/insights.
- Topics include blockchain forensics, tracing Monero, the illusion of decentralization in cryptocurrencies, fiat debasement and Bitcoin as a personal hedge in the Philippine context, digital asset risk, privacy, cybersecurity, and emerging technology issues relevant to Filipino practitioners.
- BPAP accepts article proposals through a contribution form on the website.
- Article proposal submissions ask for name, email, organization/affiliation, role, proposed article title, topic/category, a short abstract or summary, a draft link or supporting reference, and a LinkedIn or professional profile.
- BPAP reviews submissions and follows up via email.
- Articles are written by BPAP members and external contributors.
- Current published authors include Ferdie James Nervida and Urian Buenconsejo, among others.

Events and Engagement
- BPAP organizes and supports forums and roundtables for practitioners and stakeholders.
- BPAP supports education and learning sessions.
- BPAP supports working groups focused on standards, policy, adoption, and cross-sector issues.
- BPAP provides industry representation and a coherent public-facing voice for blockchain practitioners in the Philippines.
- BPAP has a strong presence in Davao City and has participated in ecosystem events there, including blockchain meetups with leaders from various Web3 and crypto organizations.
- BPAP also facilitated DICT Region XI training in Davao.
- For upcoming events, users can follow BPAP on Facebook, check blockchainph.org, or email hello@blockchainph.org to express interest in the events mailing list.
- Organizations or schools can invite BPAP for speaking engagements, training facilitation, and industry collaboration by emailing hello@blockchainph.org with their details and the nature of the engagement.

Contextual Philippine Blockchain Facts
- As of 2026, the Philippines became the first country in the world to put its national budget, the 2026 GAA, on blockchain through the Digital Bayanihan Chain initiative led by DICT Secretary Henry Aguda.
- The Philippine Congress is also transitioning to blockchain-backed paperless systems in partnership with DICT.
- The DICT SPARK Program is a government initiative providing blockchain and technology training.
- BPAP and Ferdie James Nervida have facilitated training under the DICT SPARK Program covering blockchain fundamentals, cryptocurrency, smart contracts, DeFi, NFT ecosystems, cybersecurity, blockchain forensics, and Philippine crypto regulations.
- The Bangko Sentral ng Pilipinas regulates virtual asset service providers in the Philippines.
- The Philippines has an established regulatory framework for crypto.
- BPAP actively engages with policy discussions to help shape a responsible industry.
- BPAP includes members in compliance and government/policy roles.
- Blockchain forensics involves tracing and analyzing transactions on public blockchains to investigate crypto crimes, including fraud, money laundering, and illicit fund flows.
- With rising crypto use in the Philippines, law enforcement agencies increasingly need blockchain forensics skills.
- BPAP has been a key capability-builder in blockchain forensics through partnerships with firms like AnChain.AI.

Investment Position
- BPAP is a professional practitioners' association, not an investment advisory body.
- BPAP's published content may include member perspectives, including discussion of Bitcoin as a personal hedge, but BPAP's institutional focus is on professional standards, responsible education, and ecosystem development.
- Do not present BPAP as giving investment recommendations.
`.trim();

const PROVIDER = (process.env.PROVIDER || "openai").trim().toLowerCase();
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-3-5-haiku-latest";
const ANTHROPIC_VERSION = "2023-06-01";
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 2000;
const MAX_TOTAL_CHARS = 12000;
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;

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
  const key = `chat_rate_limit:${safeIp}:${windowId}`;

  const result = await upstashRequest("/pipeline", [
    ["INCR", key],
    ["EXPIRE", key, ttlSeconds],
  ]);

  const count = Number(result?.[0]?.result ?? 0);

  return {
    allowed: count <= RATE_LIMIT_MAX,
    count,
    remaining: Math.max(0, RATE_LIMIT_MAX - count),
    resetSeconds: ttlSeconds,
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
      max_tokens: 1024,
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
        res.end(JSON.stringify({ error: "Rate limit exceeded. Try again later." }));
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
      res.end(JSON.stringify({ error: "Rate limit exceeded. Try again later." }));
      return;
    }

    const messages = sanitizeMessages(body?.messages);
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
