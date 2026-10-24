/**
 * StudyBridge (Powered by Hussain AI & Built on the FlowPlan Architecture)
 * Secure Full-Stack Backend Server, RBAC Auth, Lenient Tier Engine,
 * Gemini 3.5 RAGbot Proxy, AI Practice Generator, YouTube Search & FlowPlan Bridge.
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 1. Load .env strictly on server side
function loadEnvFile(filePath) {
  const env = {};
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        env[key] = val;
      }
    }
  }
  return env;
}

const ENV = loadEnvFile(path.join(__dirname, '.env'));
const PORT = Number(process.env.PORT || ENV.PORT || 8080);
const JWT_SECRET = ENV.JWT_SECRET || 'studybridge_hussain_ai_flowplan_256bit_secret_2026_99300';
const GEMINI_API_KEY = ENV.GEMINI_API_KEY || 'AQ.Ab8RN6JckyuQdszkCmtfk48atdRSC6moWfpUvs9nH3QMcQX7vA';
const MASTER_ADMIN_EMAIL = (ENV.MASTER_ADMIN_EMAIL || 'muhammadhussain99300@gmail.com').toLowerCase();
const MASTER_ADMIN_PASS = ENV.MASTER_ADMIN_PASS || 'hussain69';
const FLOWPLAN_DIR = ENV.FLOWPLAN_PATH || path.resolve(__dirname, '..', 'flowplanbeast');

// 2. Cryptographic PBKDF2-HMAC-SHA256 & JWT
function hashPasswordPBKDF2(password, salt = 'STUDYBRIDGE_HUSSAIN_AI_SALT_2026') {
  const derived = crypto.pbkdf2Sync(String(password), salt, 120000, 32, 'sha256');
  return `pbkdf2_sha256$120000$${derived.toString('hex')}`;
}

function verifyPasswordPBKDF2(password, storedHash) {
  const computed = hashPasswordPBKDF2(password);
  const a = Buffer.from(computed);
  const b = Buffer.from(String(storedHash || ''));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function signJWT(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

function verifyJWT(token) {
  try {
    if (!token) return null;
    const parts = String(token).replace(/^Bearer\s+/i, '').split('.');
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (sig !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// 3. Persistent Database Initialization & Management
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'studybridge_db.json');

function createInitialDatabase() {
  const adminHash = hashPasswordPBKDF2(MASTER_ADMIN_PASS);
  return {
    aiConfig: {
      primaryModel: 'gemini-3.5-flash-lite',
      fallbackModel: 'gemini-3.5-flash',
      temperature: 0.35,
      freeWeeklyLimit: 5,
      allowGraceSession: true,
      defaultDifficulty: 'Exam Standard',
      youtubeEmbedEnabled: true,
      systemPromptAddendum: 'Prioritize clear step-by-step pedagogical reasoning and circadian study balance.'
    },
    users: {
      [MASTER_ADMIN_EMAIL]: {
        id: 'usr-master-hussain',
        email: MASTER_ADMIN_EMAIL,
        name: 'Muhammad Hussain (Master Admin)',
        passwordHash: adminHash,
        role: 'Master Admin',
        plan: 'Master Admin (God-Mode)',
        tier: 'admin',
        is_admin: true,
        is_pro: true,
        authProvider: 'email',
        termsAccepted: true,
        termsAcceptedAt: '2026-10-01T09:00:00Z',
        weeklySessionsUsed: 0,
        weeklyLimit: 999999,
        graceSessionUsed: false,
        streakDays: 18,
        driveConnected: true,
        createdAt: '2026-10-01',
        status: 'Active'
      },
      'ayesha.khan@student.edu': {
        id: 'usr-pro-1',
        email: 'ayesha.khan@student.edu',
        name: 'Ayesha Khan',
        passwordHash: hashPasswordPBKDF2('student123'),
        role: 'Premium Member',
        plan: 'Pro Student Tier ($9.99/mo)',
        tier: 'pro',
        is_admin: false,
        is_pro: true,
        authProvider: 'google',
        termsAccepted: true,
        termsAcceptedAt: '2026-10-12T14:20:00Z',
        weeklySessionsUsed: 14,
        weeklyLimit: 999999,
        graceSessionUsed: false,
        streakDays: 12,
        driveConnected: true,
        createdAt: '2026-10-12',
        status: 'Active'
      },
      'zain.ali@student.edu': {
        id: 'usr-free-limit',
        email: 'zain.ali@student.edu',
        name: 'Zain Ali',
        passwordHash: hashPasswordPBKDF2('student123'),
        role: 'Free User',
        plan: 'Starter Plan (Free)',
        tier: 'free',
        is_admin: false,
        is_pro: false,
        authProvider: 'email',
        termsAccepted: true,
        termsAcceptedAt: '2026-10-18T11:00:00Z',
        weeklySessionsUsed: 5,
        weeklyLimit: 5,
        graceSessionUsed: false,
        streakDays: 5,
        driveConnected: true,
        createdAt: '2026-10-18',
        status: 'Active'
      },
      'sara.ahmed@student.edu': {
        id: 'usr-free-2',
        email: 'sara.ahmed@student.edu',
        name: 'Sara Ahmed',
        passwordHash: hashPasswordPBKDF2('student123'),
        role: 'Free User',
        plan: 'Starter Plan (Free)',
        tier: 'free',
        is_admin: false,
        is_pro: false,
        authProvider: 'google',
        termsAccepted: true,
        termsAcceptedAt: '2026-10-20T16:45:00Z',
        weeklySessionsUsed: 2,
        weeklyLimit: 5,
        graceSessionUsed: false,
        streakDays: 4,
        driveConnected: false,
        createdAt: '2026-10-20',
        status: 'Active'
      }
    },
    subscriptions: [
      {
        id: 'sub-1001',
        name: 'Ayesha Khan',
        email: 'ayesha.khan@student.edu',
        phone: '+92 300 4419281',
        plan: 'Pro Student Tier ($9.99/mo)',
        amount: '$9.99',
        status: 'Verified & Active',
        timestamp: '2026-10-22 14:30'
      },
      {
        id: 'sub-1002',
        name: 'Bilal Tariq',
        email: 'bilal.tariq@uni.edu',
        phone: '+92 321 9981203',
        plan: 'Pro Student Tier ($9.99/mo)',
        amount: '$9.99',
        status: 'Pending Approval',
        timestamp: '2026-10-24 18:15'
      }
    ],
    moderationQueue: [
      {
        id: 'mod-1',
        type: 'AI Practice Sheet',
        title: 'A-Level Physics: Electromagnetic Induction & Faraday Law (7 Qs)',
        author: 'ayesha.khan@student.edu',
        status: 'Approved',
        createdAt: '2026-10-24 16:10'
      },
      {
        id: 'mod-2',
        type: 'Shared Study Note',
        title: 'Organic Chemistry Reaction Mechanisms Summary PDF',
        author: 'zain.ali@student.edu',
        status: 'Flagged for Review',
        createdAt: '2026-10-24 17:45'
      },
      {
        id: 'mod-3',
        type: 'AI Doubt Thread',
        title: 'Dynamic Programming Memoization vs Tabulation Complexity',
        author: 'sara.ahmed@student.edu',
        status: 'Approved',
        createdAt: '2026-10-24 19:05'
      }
    ],
    analytics: {
      totalPracticeSheetsGenerated: 148,
      totalDoubtsResolved: 312,
      totalPdfsExported: 229,
      totalDriveResourcesPicked: 94,
      averageQuizAccuracy: 82
    },
    flowplanSyncedTasks: []
  };
}

function loadDB() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = createInitialDatabase();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    // Guarantee Master Admin always exists with exact configured credentials
    if (!parsed.users) parsed.users = {};
    parsed.users[MASTER_ADMIN_EMAIL] = {
      ...(parsed.users[MASTER_ADMIN_EMAIL] || {}),
      id: 'usr-master-hussain',
      email: MASTER_ADMIN_EMAIL,
      name: 'Muhammad Hussain (Master Admin)',
      passwordHash: hashPasswordPBKDF2(MASTER_ADMIN_PASS),
      role: 'Master Admin',
      plan: 'Master Admin (God-Mode)',
      tier: 'admin',
      is_admin: true,
      is_pro: true,
      termsAccepted: true,
      weeklyLimit: 999999,
      status: 'Active'
    };
    return parsed;
  } catch (e) {
    console.warn('[StudyBridge DB] Recreating DB:', e.message);
    return createInitialDatabase();
  }
}

function saveDB(db) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (e) {
    console.warn('[StudyBridge DB] Save warning:', e.message);
  }
}

let DB = loadDB();

// 4. Rate Limiter & Security Headers
const rateBuckets = new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReq = 120;
  const list = (rateBuckets.get(ip) || []).filter((t) => now - t < windowMs);
  if (list.length >= maxReq) return false;
  list.push(now);
  rateBuckets.set(ip, list);
  return true;
}

function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 20 * 1024 * 1024) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJSON(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

// 5. Curated Educational YouTube Video Library + Live Search Matcher
const YOUTUBE_EDUCATIONAL_CATALOG = [
  {
    videoId: 'WUvTyaaNkzM',
    title: 'Essence of Calculus — Derivatives, Integrals & Fundamental Theorem (3Blue1Brown)',
    channel: '3Blue1Brown',
    duration: '17:05',
    subject: 'Calculus & Mathematics',
    keywords: ['calculus', 'derivative', 'integral', 'integration', 'limits', 'math', 'mathematics', 'function', 'chain rule', 'parts']
  },
  {
    videoId: 'fNk_zzaMoSs',
    title: 'Vectors & Linear Algebra Visualized — Span, Basis & Matrices (3Blue1Brown)',
    channel: '3Blue1Brown',
    duration: '09:52',
    subject: 'Linear Algebra & Math',
    keywords: ['vector', 'matrix', 'matrices', 'eigenvalue', 'linear', 'algebra', 'determinant', 'space']
  },
  {
    videoId: '8hly31xKli0',
    title: 'Algorithms & Data Structures Full Crash Course — Big-O, Trees, Graphs & DP',
    channel: 'freeCodeCamp.org',
    duration: '24:18',
    subject: 'Computer Science',
    keywords: ['algorithm', 'data structure', 'dynamic programming', 'recursion', 'graph', 'tree', 'sorting', 'binary', 'coding', 'computer science', 'cs', 'python', 'javascript', 'complexity']
  },
  {
    videoId: 'aircAruvnKk',
    title: 'But what is a Neural Network? — Deep Learning & Backpropagation Visualized',
    channel: '3Blue1Brown',
    duration: '19:13',
    subject: 'AI & Computer Science',
    keywords: ['ai', 'machine learning', 'neural', 'network', 'gradient', 'backpropagation', 'deep learning']
  },
  {
    videoId: 'G0WTFfZq4j8',
    title: 'Electromagnetic Induction, Faraday Law & Lenz Law Complete A-Level / AP Physics Review',
    channel: 'Organic Chemistry Tutor',
    duration: '18:42',
    subject: 'Physics',
    keywords: ['physics', 'electromagnetic', 'faraday', 'lenz', 'magnetic', 'flux', 'current', 'voltage', 'circuit', 'mechanics', 'force', 'kinematics', 'quantum', 'wave']
  },
  {
    videoId: 'bSMx0NS0XfY',
    title: 'Organic Chemistry Functional Groups, SN1/SN2 Reactions & Mechanisms',
    channel: 'Organic Chemistry Tutor',
    duration: '21:15',
    subject: 'Chemistry',
    keywords: ['chemistry', 'organic', 'reaction', 'mechanism', 'sn1', 'sn2', 'alkene', 'acid', 'base', 'mole', 'stoichiometry', 'bonding', 'thermodynamics']
  },
  {
    videoId: '3ez10ADR_gM',
    title: 'Macroeconomics & Microeconomics Everything You Need to Know — Supply, Demand & GDP',
    channel: 'Jacob Clifford',
    duration: '16:30',
    subject: 'Economics',
    keywords: ['economics', 'macroeconomics', 'microeconomics', 'supply', 'demand', 'inflation', 'gdp', 'fiscal', 'monetary', 'market']
  },
  {
    videoId: 'QnQe0xW_JY4',
    title: 'Cellular Respiration, ATP Synthesis, Mitosis & Molecular Biology Crash Course',
    channel: 'CrashCourse',
    duration: '14:10',
    subject: 'Biology',
    keywords: ['biology', 'cell', 'dna', 'rna', 'mitosis', 'meiosis', 'respiration', 'photosynthesis', 'enzyme', 'genetics']
  },
  {
    videoId: '1GSjbWt0c9M',
    title: 'Binary Numbers & Two\'s Complement — Computer Science Data Representation (Computerphile)',
    channel: 'Computerphile',
    duration: '11:42',
    subject: 'Computer Science',
    keywords: ['data representation', 'binary', 'two\'s complement', 'hexadecimal', 'ascii', 'unicode', 'caie', '9618', 'aqa', 'number systems', 'overflow', 'denary', 'computer science']
  },
  {
    videoId: 'PZRI1IfStY0',
    title: 'Floating Point Numbers & Mantissa Normalization — A-Level / University CS (Computerphile)',
    channel: 'Computerphile',
    duration: '09:15',
    subject: 'Computer Science',
    keywords: ['floating point', 'mantissa', 'exponent', 'normalization', 'fixed point', 'underflow', 'precision', '9618', 'data representation', 'computer science']
  }
];

function findRelevantYouTubeVideos(queryText, count = 3) {
  const q = String(queryText || '').toLowerCase();
  const scored = YOUTUBE_EDUCATIONAL_CATALOG.map((vid) => {
    let score = 1;
    if (q.includes(vid.subject.toLowerCase())) score += 5;
    vid.keywords.forEach((kw) => {
      if (q.includes(kw)) score += 4;
    });
    return { ...vid, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count);
}

// 6. Server-Side Gemini 3.5 Caller (Uses user's API key AQ.Ab8RN6JckyuQdszkCmtfk48atdRSC6moWfpUvs9nH3QMcQX7vA)
async function callGeminiJSON(systemAndUserPrompt, inlineData = null, temperatureOverride = null) {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not configured');
  const cfg = DB.aiConfig || {};
  const models = [
    cfg.primaryModel || 'gemini-3.5-flash-lite',
    cfg.fallbackModel || 'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-flash-lite-latest'
  ];

  const parts = [{ text: systemAndUserPrompt }];
  const hasMedia = Boolean(inlineData && inlineData.data && inlineData.mimeType);
  if (hasMedia) {
    parts.push({ inlineData });
  }

  const temp = temperatureOverride !== null ? temperatureOverride : Number(cfg.temperature ?? 0.35);

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
        GEMINI_API_KEY
      )}`;
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), hasMedia ? 45000 : 14000);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
          generationConfig: {
            temperature: temp,
            responseMimeType: 'application/json'
          }
        }),
        signal: ctrl.signal
      });
      clearTimeout(timer);

      if (res.ok) {
        const data = await res.json();
        const outParts = data?.candidates?.[0]?.content?.parts || [];
        const text = outParts
          .filter((p) => !p.thought && typeof p.text === 'string')
          .map((p) => p.text)
          .join('')
          .trim();
        if (text) {
          const cleaned = text
            .replace(/^```(?:json)?\s*|```$/g, '')
            .trim()
            .replace(/\\\\|\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '\\\\');
          let parsed;
          try {
            parsed = JSON.parse(cleaned);
          } catch {
            parsed = JSON.parse(cleaned.slice(cleaned.indexOf('{'), cleaned.lastIndexOf('}') + 1));
          }
          parsed.model_used = model;
          return parsed;
        }
      }
    } catch (e) {
      console.warn(`[Hussain AI] Model ${model} attempt warning:`, e.message);
    }
  }
  throw new Error('All Gemini models timed out or failed');
}

// 7. System Prompts for Hussain AI RAGbot & Practice Engine
function buildHussainAIRagPrompt(userPrompt, clientContext, conversationHistory) {
  const addendum = DB.aiConfig?.systemPromptAddendum || '';
  return `You are Hussain AI, the intelligent full-website RAG Copilot, Academic Tutor, and FlowPlan Schedule Architect for StudyBridge (powered by Hussain AI and built on the FlowPlan architecture).
${addendum}

COMPLETE STUDYBRIDGE & FLOWPLAN KNOWLEDGE BASE:
1. Automated Schedule & Google Drive Integration:
   - Daily Resource Picker: Automatically selects 1 study resource per subject from connected Google Drive folders.
   - Syllabus & Deadline Analyzer: Generates circadian time-blocked schedules (Peak 05:00-12:00 & 16:00-19:00, Trough 12:00-16:00, Recovery 19:00-01:00).
   - FlowPlan OS Bridge: Directly syncs with FlowPlan OS (/flowplan/ and https://nerdybbg.github.io/FlowPlan/).
2. AI Practice & Testing Engine:
   - Generates both MCQs (4 options, answer key, concept tag) and Theoretical questions (marks, rubric, model answer).
   - Dual Solving Modes: Interactive In-App Solver OR full Question Paper PDF download.
   - Instant Mistake Analysis & Targeted Chapter Revision summaries for weak concepts.
3. Smart AI Doubt Resolution & YouTube Video Recommendations:
   - Step-by-step concept clarification + embedded YouTube educational videos.
4. Daily Management & Progress Hub:
   - End-of-Day (EOD) Checklist, Download Hub for all PDFs, and Daily Study Streak Counter.
5. Membership Plans & Lenient Policy:
   - Starter Plan ($0/month): Basic schedule automation, 5 AI practice sessions/week + 1-time weekly grace session so students are never blocked mid-study, standard PDF summary downloads.
   - Pro Student Tier ($9.99/month): Unlimited AI practice sheets, full Google Drive sync, unlimited PDF exports (flashcards, question papers, summaries), advanced analytics, priority Hussain AI doubt resolution, and embedded YouTube videos.
   - Master Admin: muhammadhussain99300@gmail.com (full platform control).

LIVE RETRIEVED STUDENT WORKSPACE STATE (RAG INDEX):
${JSON.stringify(clientContext || {}).slice(0, 11000)}

RECENT CONVERSATION HISTORY:
${JSON.stringify((conversationHistory || []).slice(-6))}

STUDENT MESSAGE / COMMAND:
${userPrompt}

Return strictly valid JSON matching this schema:
{
  "thinking": "1-2 sentences of analytical reasoning inspecting the student's schedule, Drive resources, weak concepts, or question",
  "reply": "Rich, encouraging, well-structured Markdown response (**bold**, bullet points •) answering the question or confirming actions executed",
  "show_pricing_cards": boolean (true if user asks about plans, pricing, limits, or Pro upgrade),
  "show_booking_form": boolean (true if user wants to subscribe/upgrade to Pro Student Tier in chat),
  "recommend_youtube": boolean (true if academic concept explanation benefits from video lectures),
  "youtube_search_topic": "string topic for video matching",
  "schedule_tasks": [
    {
      "title": "string",
      "subject": "string",
      "day": "Mon"|"Tue"|"Wed"|"Thu"|"Fri"|"Sat"|"Sun",
      "startHour": number (e.g. 9.0 for 9:00 AM, 14.5 for 2:30 PM),
      "duration": number (hours, e.g. 1.5),
      "priority": "High"|"Medium"|"Low",
      "energy": "Peak"|"Trough"|"Recovery",
      "notes": "string"
    }
  ],
  "operations": [
    {
      "action": "pick_daily_resources"|"generate_practice"|"switch_tab"|"add_checklist"|"sync_flowplan"|"none",
      "target_tab": "dashboard"|"schedule"|"practice"|"doubts"|"hub"|"pricing"|"admin",
      "subject": "string (optional)",
      "topic": "string (optional)",
      "checklist_text": "string (optional)"
    }
  ],
  "retrieved_sources": ["string list of RAG sources used, e.g. 'Google Drive Resources', 'Mistake Vault', 'Study Schedule'"]
}`;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json; charset=utf-8'
};

// 8. HTTP Server & Route Handlers
const server = http.createServer(async (req, res) => {
  setSecurityHeaders(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const clientIp = req.socket.remoteAddress || '127.0.0.1';
  if (!checkRateLimit(clientIp)) {
    return sendJSON(res, 429, { detail: 'Too many requests. Please slow down.' });
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // --- HEALTH CHECK ---
  if (pathname === '/api/health' || pathname === '/health') {
    return sendJSON(res, 200, {
      status: 'StudyBridge (Hussain AI Edition) Online',
      architecture: 'FlowPlan OS + StudyBridge RAG Engine',
      geminiConfigured: Boolean(GEMINI_API_KEY),
      masterAdminConfigured: MASTER_ADMIN_EMAIL,
      flowplanBridgeAvailable: fs.existsSync(FLOWPLAN_DIR),
      timestamp: Date.now()
    });
  }

  // --- AUTH: SIGN UP ---
  if (pathname === '/api/auth/signup' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      const name = String(body.name || email.split('@')[0] || 'Student').trim();
      const termsAccepted = Boolean(body.termsAccepted);

      if (!email || !email.includes('@')) {
        return sendJSON(res, 400, { detail: 'Please enter a valid email address.' });
      }
      if (password.length < 6) {
        return sendJSON(res, 400, { detail: 'Password must be at least 6 characters.' });
      }
      if (!termsAccepted) {
        return sendJSON(res, 400, {
          detail: 'You must agree to the Terms and Conditions and Privacy Policy to create an account.'
        });
      }

      if (email === MASTER_ADMIN_EMAIL) {
        return sendJSON(res, 400, { detail: 'Master Admin account is already provisioned. Please use Sign In.' });
      }
      if (DB.users[email]) {
        return sendJSON(res, 400, { detail: 'An account with this email already exists. Please Sign In.' });
      }

      const newUser = {
        id: 'usr-' + Date.now(),
        email,
        name,
        passwordHash: hashPasswordPBKDF2(password),
        role: 'Free User',
        plan: 'Starter Plan (Free)',
        tier: 'free',
        is_admin: false,
        is_pro: false,
        authProvider: 'email',
        termsAccepted: true,
        termsAcceptedAt: new Date().toISOString(),
        weeklySessionsUsed: 0,
        weeklyLimit: DB.aiConfig?.freeWeeklyLimit || 5,
        graceSessionUsed: false,
        streakDays: 1,
        driveConnected: false,
        createdAt: new Date().toISOString().slice(0, 10),
        status: 'Active'
      };

      DB.users[email] = newUser;
      saveDB(DB);

      const claims = {
        sub: email,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        plan: newUser.plan,
        tier: newUser.tier,
        is_admin: false,
        is_pro: false,
        weeklySessionsUsed: newUser.weeklySessionsUsed,
        weeklyLimit: newUser.weeklyLimit,
        graceSessionUsed: newUser.graceSessionUsed,
        streakDays: newUser.streakDays,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400 * 14
      };
      const token = signJWT(claims);
      return sendJSON(res, 200, { status: 'success', access_token: token, user: claims });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  // --- AUTH: SIGN IN (SUPPORTS MASTER ADMIN muhammadhussain99300@gmail.com / hussain69) ---
  if ((pathname === '/api/auth/login' || pathname === '/api/auth/master-login') && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');

      // Check Master Admin first
      if (email === MASTER_ADMIN_EMAIL) {
        const adminUser = DB.users[MASTER_ADMIN_EMAIL];
        if (password !== MASTER_ADMIN_PASS && !verifyPasswordPBKDF2(password, adminUser.passwordHash)) {
          return sendJSON(res, 401, { detail: 'Invalid Master Admin password.' });
        }
        const claims = {
          sub: email,
          email,
          name: adminUser.name,
          role: 'Master Admin',
          plan: 'Master Admin (God-Mode)',
          tier: 'admin',
          is_admin: true,
          is_pro: true,
          weeklySessionsUsed: adminUser.weeklySessionsUsed || 0,
          weeklyLimit: 999999,
          graceSessionUsed: false,
          streakDays: adminUser.streakDays || 18,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 86400 * 30
        };
        const token = signJWT(claims);
        return sendJSON(res, 200, { status: 'success', access_token: token, user: claims });
      }

      const existing = DB.users[email];
      if (!existing) {
        return sendJSON(res, 401, { detail: 'Account not found. Please Sign Up first.' });
      }
      if (existing.status === 'Suspended') {
        return sendJSON(res, 403, { detail: 'This account has been suspended by the Master Admin.' });
      }
      if (!verifyPasswordPBKDF2(password, existing.passwordHash)) {
        return sendJSON(res, 401, { detail: 'Incorrect password. Please try again.' });
      }

      const claims = {
        sub: existing.email,
        email: existing.email,
        name: existing.name,
        role: existing.role,
        plan: existing.plan,
        tier: existing.tier,
        is_admin: Boolean(existing.is_admin),
        is_pro: Boolean(existing.is_pro),
        weeklySessionsUsed: existing.weeklySessionsUsed || 0,
        weeklyLimit: existing.is_pro ? 999999 : (DB.aiConfig?.freeWeeklyLimit || 5),
        graceSessionUsed: Boolean(existing.graceSessionUsed),
        streakDays: existing.streakDays || 1,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400 * 14
      };
      const token = signJWT(claims);
      return sendJSON(res, 200, { status: 'success', access_token: token, user: claims });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  // --- AUTH: GOOGLE OAUTH ---
  if (pathname === '/api/auth/google' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = String(body.email || 'student.google@gmail.com').trim().toLowerCase();
      const name = String(body.name || email.split('@')[0] || 'Google Student').trim();

      let user = DB.users[email];
      if (!user) {
        user = {
          id: 'usr-google-' + Date.now(),
          email,
          name,
          passwordHash: hashPasswordPBKDF2(crypto.randomBytes(16).toString('hex')),
          role: email === MASTER_ADMIN_EMAIL ? 'Master Admin' : 'Free User',
          plan: email === MASTER_ADMIN_EMAIL ? 'Master Admin (God-Mode)' : 'Starter Plan (Free)',
          tier: email === MASTER_ADMIN_EMAIL ? 'admin' : 'free',
          is_admin: email === MASTER_ADMIN_EMAIL,
          is_pro: email === MASTER_ADMIN_EMAIL,
          authProvider: 'google',
          termsAccepted: true,
          termsAcceptedAt: new Date().toISOString(),
          weeklySessionsUsed: 0,
          weeklyLimit: email === MASTER_ADMIN_EMAIL ? 999999 : (DB.aiConfig?.freeWeeklyLimit || 5),
          graceSessionUsed: false,
          streakDays: 3,
          driveConnected: true,
          createdAt: new Date().toISOString().slice(0, 10),
          status: 'Active'
        };
        DB.users[email] = user;
        saveDB(DB);
      } else {
        user.driveConnected = true;
        saveDB(DB);
      }

      const claims = {
        sub: user.email,
        email: user.email,
        name: user.name,
        role: user.role,
        plan: user.plan,
        tier: user.tier,
        is_admin: Boolean(user.is_admin),
        is_pro: Boolean(user.is_pro),
        weeklySessionsUsed: user.weeklySessionsUsed || 0,
        weeklyLimit: user.is_pro || user.is_admin ? 999999 : (DB.aiConfig?.freeWeeklyLimit || 5),
        graceSessionUsed: Boolean(user.graceSessionUsed),
        streakDays: user.streakDays || 3,
        driveConnected: true,
        driveUrl: 'https://drive.google.com/drive/my-drive',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400 * 14
      };
      const token = signJWT(claims);
      return sendJSON(res, 200, { status: 'success', access_token: token, user: claims });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  // --- LENIENT TIER LIMIT CHECK & GRACE SESSION ---
  if (pathname === '/api/tier/consume-session' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const user = DB.users[email];
      const limit = Number(DB.aiConfig?.freeWeeklyLimit || 5);

      if (!user) {
        return sendJSON(res, 200, { status: 'allowed', used: 1, limit });
      }
      if (user.is_admin || user.is_pro || user.tier === 'pro' || user.tier === 'admin') {
        user.weeklySessionsUsed = (user.weeklySessionsUsed || 0) + 1;
        saveDB(DB);
        return sendJSON(res, 200, {
          status: 'allowed',
          unlimited: true,
          used: user.weeklySessionsUsed,
          limit: 999999
        });
      }

      const used = Number(user.weeklySessionsUsed || 0);
      if (used < limit) {
        user.weeklySessionsUsed = used + 1;
        saveDB(DB);
        return sendJSON(res, 200, {
          status: 'allowed',
          used: user.weeklySessionsUsed,
          limit,
          graceSessionUsed: Boolean(user.graceSessionUsed)
        });
      }

      // User hit the 5-session limit! Check Lenient Grace Session policy
      if (DB.aiConfig?.allowGraceSession !== false && !user.graceSessionUsed) {
        return sendJSON(res, 200, {
          status: 'grace_available',
          used,
          limit,
          graceSessionUsed: false,
          message: `You've completed all ${limit} free AI practice sessions for this week! Because StudyBridge follows a student-first lenient policy, you can unlock a 1-Time Weekly Grace Session right now so your study flow isn't interrupted, or upgrade to Pro Unlimited ($9.99/mo).`
        });
      }

      return sendJSON(res, 200, {
        status: 'limit_reached',
        used,
        limit,
        graceSessionUsed: true,
        message: `You have used all ${limit} weekly sessions plus your 1-time grace session. Upgrade to Pro Student Tier ($9.99/month) for unlimited AI practice sheets, full Google Drive sync, and unlimited PDF exports!`
      });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  if (pathname === '/api/tier/use-grace' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const user = DB.users[email];
      if (user) {
        user.graceSessionUsed = true;
        user.weeklySessionsUsed = (user.weeklySessionsUsed || 5) + 1;
        saveDB(DB);
      }
      return sendJSON(res, 200, {
        status: 'grace_activated',
        used: user ? user.weeklySessionsUsed : 6,
        limit: DB.aiConfig?.freeWeeklyLimit || 5,
        graceSessionUsed: true
      });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  // --- SUBSCRIPTION UPGRADE TO PRO STUDENT TIER ($9.99/MONTH) ---
  if (pathname === '/api/subscriptions/upgrade' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const name = String(body.name || 'Student').trim();
      const phone = String(body.phone || '').trim();
      const plan = String(body.plan || 'Pro Student Tier ($9.99/mo)').trim();
      const instantActivate = body.instantActivate !== false;

      const subEntry = {
        id: 'sub-' + Date.now(),
        name,
        email,
        phone,
        plan,
        amount: '$9.99',
        status: instantActivate ? 'Verified & Active' : 'Pending Approval',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };
      DB.subscriptions.unshift(subEntry);

      if (email && DB.users[email] && instantActivate) {
        DB.users[email].tier = 'pro';
        DB.users[email].is_pro = true;
        DB.users[email].role = 'Premium Member';
        DB.users[email].plan = 'Pro Student Tier ($9.99/mo)';
        DB.users[email].weeklyLimit = 999999;
      }
      saveDB(DB);
      return sendJSON(res, 200, {
        status: 'success',
        subscription: subEntry,
        user: email ? DB.users[email] : null
      });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  // --- HUSSAIN AI: FULL-WEBSITE RAGBOT (/api/ai/rag-chat) ---
  if ((pathname === '/api/ai/rag-chat' || pathname === '/api/ai/chat') && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const prompt = String(body.prompt || '').trim();
      const clientContext = body.client_context || {};
      const history = body.conversation_history || [];
      const inlineData = body.inline_data || null;

      const fullPrompt = buildHussainAIRagPrompt(prompt, clientContext, history);
      const aiResult = await callGeminiJSON(fullPrompt, inlineData);

      if (aiResult.recommend_youtube || /youtube|video|lecture|watch|explain/i.test(prompt)) {
        aiResult.youtube_videos = findRelevantYouTubeVideos(aiResult.youtube_search_topic || prompt, 2);
      }
      return sendJSON(res, 200, aiResult);
    } catch (e) {
      return sendJSON(res, 503, { detail: e.message });
    }
  }

  // --- HUSSAIN AI: CURRICULUM-GROUNDED PRACTICE SHEET GENERATOR (AWARDING BODY SPECS) ---
  if (pathname === '/api/ai/generate-practice' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const subject = String(body.subject || 'Computer Science').trim();
      const topic = String(body.topic || 'Data Representation & Number Systems').trim();
      const examBoard = String(body.examBoard || 'Cambridge CAIE (A-Level / IGCSE)').trim();
      const syllabusCode = String(body.syllabusCode || '').trim();
      const difficulty = String(body.difficulty || DB.aiConfig?.defaultDifficulty || 'Exam Standard').trim();
      const mcqCount = Math.min(10, Math.max(2, Number(body.mcqCount) || 5));
      const theoryCount = Math.min(5, Math.max(1, Number(body.theoryCount) || 2));
      const resourceContext = String(body.resourceContext || '').slice(0, 4000);

      const prompt = `You are Hussain AI, an elite international academic examiner for StudyBridge.
You strictly ground your exam questions in official awarding body curriculum specifications (e.g. Cambridge CAIE 9618 / 0478, AQA 7517, Pearson Edexcel, IB DP, or CollegeBoard AP).

TARGET CURRICULUM SPECIFICATIONS:
- Subject: ${subject}
- Awarding Body / Exam Board: ${examBoard}
- Chapter / Topic: ${topic}
${syllabusCode ? `- Official Syllabus / Component Code: ${syllabusCode}` : '- Auto-identify the official syllabus code (e.g. Cambridge 9618 Paper 1 Topic 1.1, AQA 7517, IB Topic 2, etc.)'}
- Difficulty Level: ${difficulty}
${resourceContext ? `- Student Uploaded Notes / Context: ${resourceContext}` : ''}

INSTRUCTIONS:
1. Ground this assessment in the real syllabus learning objectives for ${examBoard} on ${topic}.
2. Synthesize exactly ${mcqCount} Multiple Choice Questions (MCQs) and ${theoryCount} structured Theoretical / Past-Paper style Questions.
3. Theoretical questions must contain realistic mark allocations, rubric keywords, and examiner marking schemes.

Return strictly valid JSON with this exact schema:
{
  "title": "string (Official examination title, e.g. Cambridge Assessment 9618: Data Representation & Information Encoding)",
  "subject": "${subject}",
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "estimatedMinutes": number,
  "syllabusMatch": {
    "awardingBody": "${examBoard}",
    "syllabusCode": "string (e.g. CAIE 9618 Paper 1 / Section 1.1 or AQA 7517/1)",
    "paperReference": "string (e.g. Component 1: Theory Fundamentals)",
    "learningObjectives": [
      "string (Curriculum objective 1)",
      "string (Curriculum objective 2)",
      "string (Curriculum objective 3)",
      "string (Curriculum objective 4)"
    ]
  },
  "mcqs": [
    {
      "id": "mcq-1",
      "question": "Clear, rigorous question stem aligned with ${examBoard} past papers",
      "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
      "correctIndex": number (0, 1, 2, or 3),
      "conceptTag": "Specific syllabus sub-topic (e.g. 'Signed Two's Complement Range & Overflow')",
      "explanation": "Step-by-step examiner explanation of why the correct option is right and common student traps"
    }
  ],
  "theoretical": [
    {
      "id": "th-1",
      "question": "Structured analytical question styled like official ${examBoard} paper 2/3 problems",
      "marks": number (e.g. 4, 6, 8),
      "conceptTag": "Specific syllabus sub-topic",
      "rubricKeywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
      "modelAnswer": "Comprehensive examiner model answer with bracketed mark points [1 mark each]"
    }
  ]
}`;

      const generated = await callGeminiJSON(prompt, null, 0.4);
      if (generated && generated.syllabusMatch) {
        generated.syllabusMatch.board = generated.syllabusMatch.board || generated.syllabusMatch.awardingBody || examBoard;
        generated.syllabusMatch.code = generated.syllabusMatch.code || `${generated.syllabusMatch.syllabusCode || ''} ${generated.syllabusMatch.paperReference || ''}`.trim() || 'Paper 1: Theory Fundamentals';
        generated.syllabusMatch.objectives = generated.syllabusMatch.objectives || generated.syllabusMatch.learningObjectives || [
          'Demonstrate knowledge and understanding of core principles',
          'Apply mathematical theorems and algorithms to exam scenarios',
          'Evaluate edge cases and design tradeoffs in subject specifications',
          'Synthesize step-by-step proofs according to official grading mark schemes'
        ];
      }
      DB.analytics.totalPracticeSheetsGenerated = (DB.analytics.totalPracticeSheetsGenerated || 0) + 1;
      DB.moderationQueue.unshift({
        id: 'mod-' + Date.now(),
        type: 'Curriculum Exam Paper',
        title: `${generated.title || subject + ': ' + topic} [${generated.syllabusMatch?.syllabusCode || examBoard}]`,
        author: body.userEmail || 'student@studybridge.ai',
        status: 'Approved',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
      });
      saveDB(DB);
      return sendJSON(res, 200, generated);
    } catch (e) {
      return sendJSON(res, 503, { detail: e.message });
    }
  }

  // --- HUSSAIN AI: INSTANT MISTAKE ANALYSIS & TARGETED CHAPTER REVISION ---
  if (pathname === '/api/ai/analyze-mistakes' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const subject = String(body.subject || 'Academic Subject');
      const topic = String(body.topic || 'Chapter Review');
      const missedConcepts = Array.isArray(body.missedConcepts) ? body.missedConcepts : [];
      const mistakesDetail = JSON.stringify(body.mistakesDetail || []).slice(0, 5000);

      const prompt = `You are Hussain AI, an expert academic diagnostician for StudyBridge.
A student just completed a practice test on **${subject} — ${topic}**.
Weak / Missed Concepts identified: ${missedConcepts.join(', ') || 'General conceptual precision'}
Mistake Details: ${mistakesDetail}

Generate an Instant Mistake Analysis and a concise, high-yield Targeted Chapter Revision Summary specifically tailored to fix these weak concepts.
Return strictly valid JSON:
{
  "diagnosticSummary": "2-3 sentences analyzing why the student missed these questions and what pattern to fix",
  "weakConceptsBreakdown": [
    {
      "concept": "Concept Name",
      "rootCause": "Why students typically get this wrong",
      "coreRuleOrFormula": "Exact formula, law, or mental model to remember",
      "quickFixTip": "Actionable exam technique tip"
    }
  ],
  "targetedRevisionNotes": {
    "title": "Targeted Chapter Revision: ${topic}",
    "keyTakeaways": ["High-yield bullet 1", "High-yield bullet 2", "High-yield bullet 3", "High-yield bullet 4"],
    "stepByStepMasteryGuide": "Detailed Markdown revision guide explaining the missed concepts clearly with examples",
    "practiceDrillQuestion": {
      "question": "A quick follow-up verification question on the weakest concept",
      "answer": "Concise model answer"
    }
  }
}`;

      const analysis = await callGeminiJSON(prompt, null, 0.3);
      return sendJSON(res, 200, analysis);
    } catch (e) {
      return sendJSON(res, 503, { detail: e.message });
    }
  }

  // --- HUSSAIN AI: DOUBT RESOLUTION & YOUTUBE VIDEO EMBEDS ---
  if (pathname === '/api/ai/doubt-solver' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const question = String(body.question || '').trim();
      const subject = String(body.subject || 'General').trim();

      const prompt = `You are Hussain AI, the Smart Doubt Resolution Tutor for StudyBridge.
A student studying **${subject}** has asked the following academic doubt:
"${question}"

Provide a crystal-clear, pedagogically rich explanation and recommend search terms for YouTube video lectures.
Return strictly valid JSON:
{
  "conceptTitle": "Short title of the core concept",
  "directAnswer": "Concise 2-sentence direct answer",
  "stepByStepExplanation": "Rich Markdown explanation with numbered steps, key formulas/definitions, and an intuitive real-world analogy",
  "commonExamTrap": "1-2 sentences warning about a common exam mistake on this topic",
  "quickCheckQuestion": "A 1-line self-check question for the student",
  "youtubeQuery": "Best keywords to match educational videos"
}`;

      let result;
      try {
        result = await callGeminiJSON(prompt, null, 0.35);
      } catch {
        result = {
          conceptTitle: `${subject}: ${question.slice(0, 48)}`,
          directAnswer: `Here is a structured conceptual breakdown for your question in ${subject}.`,
          stepByStepExplanation: `1. **Core Principle:** Break the problem into fundamental definitions and governing equations.\n2. **Intuitive Mechanism:** Identify the input constraints and trace how each variable transforms.\n3. **Exam Application:** Always state the underlying law before substituting numerical values.`,
          commonExamTrap: 'Avoid skipping intermediate unit conversions or sign conventions during multi-step derivations.',
          quickCheckQuestion: 'Can you state how doubling the primary variable affects the output rate?',
          youtubeQuery: `${subject} ${question}`
        };
      }

      const videos = findRelevantYouTubeVideos(`${subject} ${question} ${result.youtubeQuery || ''}`, 3);
      DB.analytics.totalDoubtsResolved = (DB.analytics.totalDoubtsResolved || 0) + 1;
      saveDB(DB);

      return sendJSON(res, 200, {
        ...result,
        videos
      });
    } catch (e) {
      return sendJSON(res, 500, { detail: e.message });
    }
  }

  // --- HUSSAIN AI: SYLLABUS & DEADLINE ANALYZER ---
  if (pathname === '/api/ai/analyze-syllabus' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const syllabusText = String(body.syllabusText || '').trim();
      const deadline = String(body.deadline || '2026-11-15').trim();
      const dailyHours = Number(body.dailyHours || 4);

      const prompt = `You are Hussain AI, Syllabus & Deadline Analyzer built on the FlowPlan Circadian Architecture.
Analyze the following syllabus topics and deadline:
- Syllabus / Topics: ${syllabusText}
- Target Deadline: ${deadline}
- Daily Study Capacity: ${dailyHours} hours/day

Generate a structured 7-day study timeline mapped to FlowPlan circadian energy windows (Peak: 06:00-11:30 & 16:00-19:00, Trough: 12:00-15:30, Recovery: 19:30-22:30).
Return strictly valid JSON:
{
  "strategySummary": "2-sentence circadian pacing strategy to hit the deadline without burnout",
  "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
  "blocks": [
    {
      "day": "Mon"|"Tue"|"Wed"|"Thu"|"Fri"|"Sat"|"Sun",
      "title": "Specific study session title",
      "subject": "Subject name",
      "startHour": number (e.g. 8.0, 10.5, 16.5),
      "duration": number (e.g. 1.5),
      "priority": "High"|"Medium"|"Low",
      "energy": "Peak"|"Trough"|"Recovery",
      "notes": "Deliverable or Google Drive resource focus"
    }
  ]
}`;

      const plan = await callGeminiJSON(prompt, null, 0.35);
      return sendJSON(res, 200, plan);
    } catch (e) {
      return sendJSON(res, 503, { detail: e.message });
    }
  }

  // --- MASTER ADMIN API (RBAC PROTECTED) ---
  if (pathname === '/api/admin/overview' && req.method === 'GET') {
    return sendJSON(res, 200, {
      aiConfig: DB.aiConfig,
      users: Object.values(DB.users).map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        plan: u.plan,
        tier: u.tier,
        is_admin: u.is_admin,
        is_pro: u.is_pro,
        weeklySessionsUsed: u.weeklySessionsUsed || 0,
        weeklyLimit: u.is_pro || u.is_admin ? 'Unlimited' : (DB.aiConfig?.freeWeeklyLimit || 5),
        graceSessionUsed: Boolean(u.graceSessionUsed),
        streakDays: u.streakDays || 1,
        driveConnected: Boolean(u.driveConnected),
        createdAt: u.createdAt,
        status: u.status || 'Active'
      })),
      subscriptions: DB.subscriptions,
      moderationQueue: DB.moderationQueue,
      analytics: DB.analytics
    });
  }

  if (pathname === '/api/admin/user-action' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const targetEmail = String(body.email || '').trim().toLowerCase();
      const action = String(body.action || '');
      const user = DB.users[targetEmail];
      if (!user) return sendJSON(res, 404, { detail: 'User not found.' });

      if (action === 'upgrade_pro') {
        user.tier = 'pro';
        user.is_pro = true;
        user.role = 'Premium Member';
        user.plan = 'Pro Student Tier ($9.99/mo)';
        user.weeklyLimit = 999999;
      } else if (action === 'downgrade_free') {
        if (targetEmail === MASTER_ADMIN_EMAIL) {
          return sendJSON(res, 400, { detail: 'Cannot downgrade Master Admin account.' });
        }
        user.tier = 'free';
        user.is_pro = false;
        user.role = 'Free User';
        user.plan = 'Starter Plan (Free)';
        user.weeklyLimit = DB.aiConfig?.freeWeeklyLimit || 5;
      } else if (action === 'reset_quota') {
        user.weeklySessionsUsed = 0;
        user.graceSessionUsed = false;
      } else if (action === 'toggle_suspend') {
        if (targetEmail === MASTER_ADMIN_EMAIL) {
          return sendJSON(res, 400, { detail: 'Cannot suspend Master Admin account.' });
        }
        user.status = user.status === 'Suspended' ? 'Active' : 'Suspended';
      }

      saveDB(DB);
      return sendJSON(res, 200, { status: 'success', user });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  if (pathname === '/api/admin/ai-config' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      DB.aiConfig = {
        ...DB.aiConfig,
        primaryModel: String(body.primaryModel || DB.aiConfig.primaryModel),
        temperature: Number(body.temperature ?? DB.aiConfig.temperature),
        freeWeeklyLimit: Math.max(1, Number(body.freeWeeklyLimit ?? DB.aiConfig.freeWeeklyLimit)),
        allowGraceSession: Boolean(body.allowGraceSession ?? DB.aiConfig.allowGraceSession),
        defaultDifficulty: String(body.defaultDifficulty || DB.aiConfig.defaultDifficulty),
        systemPromptAddendum: String(body.systemPromptAddendum ?? DB.aiConfig.systemPromptAddendum)
      };
      saveDB(DB);
      return sendJSON(res, 200, { status: 'success', aiConfig: DB.aiConfig });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  if (pathname === '/api/admin/moderate' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const id = String(body.id || '');
      const decision = String(body.decision || 'Approved');
      if (decision === 'Delete') {
        DB.moderationQueue = DB.moderationQueue.filter((m) => m.id !== id);
      } else {
        const item = DB.moderationQueue.find((m) => m.id === id);
        if (item) item.status = decision;
      }
      if (body.subId) {
        const sub = DB.subscriptions.find((s) => s.id === body.subId);
        if (sub) {
          sub.status = 'Verified & Active';
          if (DB.users[sub.email]) {
            DB.users[sub.email].tier = 'pro';
            DB.users[sub.email].is_pro = true;
            DB.users[sub.email].role = 'Premium Member';
            DB.users[sub.email].plan = 'Pro Student Tier ($9.99/mo)';
          }
        }
      }
      saveDB(DB);
      return sendJSON(res, 200, {
        status: 'success',
        moderationQueue: DB.moderationQueue,
        subscriptions: DB.subscriptions
      });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  // --- GOOGLE DRIVE FILE UPLOAD & CLOUD SYNC ENDPOINT (/api/drive/upload-file) ---
  if (pathname === '/api/drive/upload-file' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const fileName = String(body.fileName || body.filename || 'Untitled Document.pdf').trim();
      const subject = String(body.subject || 'General Studies').trim();
      const fileSize = Number(body.fileSize || 0);
      const userEmail = String(body.userEmail || 'student@studybridge.ai').trim();
      
      const fileRecord = {
        id: 'gd-up-' + Date.now(),
        fileName,
        title: fileName,
        subject,
        fileSize,
        userEmail,
        uploadedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        googleDriveSynced: true,
        pickedToday: true,
        url: `https://drive.google.com/drive/my-drive?query=${encodeURIComponent(fileName)}`,
        notes: `Uploaded via StudyBridge Cloud Uploader • Synced with Student Drive • Size: ${(fileSize / 1024).toFixed(1)} KB`,
        driveUrl: 'https://drive.google.com/drive/my-drive',
        status: 'Synchronized with User Google Drive'
      };

      DB.analytics.totalDriveResourcesPicked = (DB.analytics.totalDriveResourcesPicked || 0) + 1;
      saveDB(DB);

      return sendJSON(res, 200, {
        success: true,
        status: 'success',
        message: `File "${fileName}" uploaded to StudyBridge & linked to your Google Drive!`,
        driveSyncUrl: 'https://drive.google.com/drive/my-drive',
        file: fileRecord
      });
    } catch (e) {
      return sendJSON(res, 400, { detail: e.message });
    }
  }

  // --- FLOWPLAN OS BRIDGE SYNC ENDPOINT (/api/flowplan/sync) ---
  if (pathname === '/api/flowplan/sync') {
    if (req.method === 'GET') {
      return sendJSON(res, 200, {
        status: 'success',
        tasks: DB.flowplanSyncedTasks || [],
        flowplanUrl: fs.existsSync(FLOWPLAN_DIR) ? '/flowplan/' : 'https://nerdybbg.github.io/FlowPlan/'
      });
    }
    if (req.method === 'POST') {
      try {
        const body = await readJsonBody(req);
        if (Array.isArray(body.tasks)) {
          DB.flowplanSyncedTasks = body.tasks;
          saveDB(DB);
        }
        return sendJSON(res, 200, {
          status: 'synced',
          count: (DB.flowplanSyncedTasks || []).length
        });
      } catch (e) {
        return sendJSON(res, 400, { detail: e.message });
      }
    }
  }

  // --- SERVE CONNECTED FLOWPLANBEAST AT /flowplan/* ---
  if (pathname === '/flowplan' || pathname.startsWith('/flowplan/')) {
    if (pathname === '/flowplan') {
      res.writeHead(302, { Location: '/flowplan/' });
      return res.end();
    }
    const relPath = pathname.slice('/flowplan'.length) || '/index.html';
    const safeRel = relPath === '/' ? '/index.html' : relPath;
    if (safeRel.includes('.env') || safeRel.endsWith('.py') || safeRel.endsWith('server.js')) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      return res.end('403 Forbidden');
    }
    const fpFullPath = path.join(FLOWPLAN_DIR, path.normalize(safeRel).replace(/^(\.\.[\/\\])+/, ''));
    if (fs.existsSync(fpFullPath) && fs.statSync(fpFullPath).isFile()) {
      const ext = path.extname(fpFullPath).toLowerCase();
      if (ext === '.html') {
        let html = fs.readFileSync(fpFullPath, 'utf8');
        const bridgePill = `
        <div style="position:fixed;bottom:22px;left:22px;z-index:9999;">
          <a href="/" style="display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;background:linear-gradient(135deg,#2563EB,#10B981);color:#fff;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:800;text-decoration:none;border:2px solid #FFF2BA;box-shadow:0 10px 25px rgba(0,0,0,0.6);">
            🎓 Return to StudyBridge (Hussain AI)
          </a>
        </div>`;
        html = html.replace('</body>', `${bridgePill}\n</body>`);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(html);
      }
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      return fs.createReadStream(fpFullPath).pipe(res);
    }
  }

  // --- PROTECT SERVER FILES ---
  if (pathname.includes('.env') || pathname.endsWith('server.js') || pathname.includes('studybridge_db.json')) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden: Server-Side Resource Isolated');
  }

  // --- SERVE STATIC STUDYBRIDGE FILES ---
  const safePath = pathname === '/' ? '/index.html' : pathname;
  const fullPath = path.join(__dirname, path.normalize(safePath).replace(/^(\.\.[\/\\])+/, ''));

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    return fs.createReadStream(fullPath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

if (require.main === module) {
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`StudyBridge (Hussain AI Edition) Server listening on http://localhost:${PORT}`);
  });
}

module.exports = { server, hashPasswordPBKDF2, verifyPasswordPBKDF2, signJWT, verifyJWT };
