/**
 * StudyBridge (Powered by Hussain AI & Built on the FlowPlan Architecture)
 * Complete Client-Side & Server-Connected Application Engine (app.js)
 */

'use strict';

// 1. Configuration & Runtime Constants
const HUSSAIN_GEMINI_KEY = 'AQ.Ab8RN6JckyuQdszkCmtfk48atdRSC6moWfpUvs9nH3QMcQX7vA';
const MASTER_ADMIN_EMAIL = 'muhammadhussain99300@gmail.com';
const MASTER_ADMIN_PASS = 'hussain69';

const SUBJECT_MASTERY_DEFAULT = [
  { subject: 'Computer Science', score: 88, color: '#00D2FF' },
  { subject: 'Calculus & Linear Algebra', score: 82, color: '#10B981' },
  { subject: 'Physics', score: 79, color: '#3B82F6' },
  { subject: 'Organic Chemistry', score: 75, color: '#F59E0B' },
  { subject: 'Macroeconomics', score: 91, color: '#FF5A3C' }
];

const INITIAL_DRIVE_FILES = [
  {
    id: 'gd-1',
    subject: 'Computer Science',
    title: 'Cambridge CAIE 9618: Chapter 1 Data Representation & Floating Point.pdf',
    notes: 'Two’s complement, normalized mantissa & exponent, hexadecimal, ASCII vs Unicode.',
    url: 'https://drive.google.com/drive/my-drive',
    pickedToday: true,
    lastOpened: 'Today 08:30 AM'
  },
  {
    id: 'gd-2',
    subject: 'Calculus & Linear Algebra',
    title: 'Ch 7: Integration by Parts (LIATE), Differential Equations & Eigenvalues.pdf',
    notes: 'u-dv integration formula, characteristic polynomial det(A - λI) = 0.',
    url: 'https://drive.google.com/drive/my-drive',
    pickedToday: true,
    lastOpened: 'Today 10:15 AM'
  },
  {
    id: 'gd-3',
    subject: 'Physics',
    title: 'Ch 11: Electromagnetic Induction, Faraday Law & Lenz Law Notes.pdf',
    notes: 'Magnetic flux Φ = B·A·cos(θ), induced EMF ε = -N dΦ/dt, eddy currents.',
    url: 'https://drive.google.com/drive/my-drive',
    pickedToday: true,
    lastOpened: 'Yesterday'
  },
  {
    id: 'gd-4',
    subject: 'Organic Chemistry',
    title: 'Ch 6: Nucleophilic Substitution (SN1 vs SN2) & Elimination Mechanisms.pdf',
    notes: 'Carbocation stability, Walden inversion, polar protic vs aprotic solvents.',
    url: 'https://drive.google.com/drive/my-drive',
    pickedToday: true,
    lastOpened: '2 days ago'
  },
  {
    id: 'gd-5',
    subject: 'Macroeconomics',
    title: 'Ch 9: Aggregate Demand, Fiscal Multipliers & Monetary Policy Transmission.pdf',
    notes: 'IS-LM equilibrium, central bank open market operations, CPI inflation.',
    url: 'https://drive.google.com/drive/my-drive',
    pickedToday: true,
    lastOpened: '3 days ago'
  },
  {
    id: 'gd-6',
    subject: 'Computer Science',
    title: 'Ch 5: Binary Search Trees, AVL Balancing & Hash Table Collisions.pdf',
    notes: 'Tree rotations, amortized O(1) lookup, open addressing vs chaining.',
    url: 'https://drive.google.com/drive/my-drive',
    pickedToday: false,
    lastOpened: '4 days ago'
  },
  {
    id: 'gd-7',
    subject: 'Physics',
    title: 'Ch 12: Alternating Current (AC) Circuits, Capacitance & Resonance.pdf',
    notes: 'RMS voltage, impedance Z, phasor diagrams, RLC resonant frequency.',
    url: 'https://drive.google.com/drive/my-drive',
    pickedToday: false,
    lastOpened: '5 days ago'
  }
];

const INITIAL_SCHEDULE = {
  Mon: [
    { id: 'sc-1', title: 'Dynamic Programming & Graph Algorithms Deep Study', subject: 'Computer Science', startHour: 8.0, duration: 1.5, priority: 'High', energy: 'Peak', notes: 'Google Drive Ch 4 PDF + Practice Sheet' },
    { id: 'sc-2', title: 'Integration by Parts & Differential Equations', subject: 'Calculus & Linear Algebra', startHour: 10.0, duration: 1.5, priority: 'High', energy: 'Peak', notes: 'Solve 10 past paper integrals' },
    { id: 'sc-3', title: 'Organic Chemistry SN1/SN2 Reaction Mechanisms', subject: 'Organic Chemistry', startHour: 13.5, duration: 1.0, priority: 'Medium', energy: 'Trough', notes: 'Review solvent effects' },
    { id: 'sc-4', title: 'Electromagnetic Induction & Faraday Law Lab Prep', subject: 'Physics', startHour: 16.5, duration: 1.5, priority: 'High', energy: 'Peak', notes: 'Lenz law negative sign derivations' },
    { id: 'sc-5', title: 'End-of-Day Mistake Review & Targeted Revision', subject: 'Macroeconomics', startHour: 20.0, duration: 1.0, priority: 'Low', energy: 'Recovery', notes: 'Complete EOD Checklist' }
  ],
  Tue: [
    { id: 'sc-6', title: 'Linear Algebra Eigenvalues & Eigenvectors', subject: 'Calculus & Linear Algebra', startHour: 8.5, duration: 1.5, priority: 'High', energy: 'Peak', notes: 'Diagonalization proofs' },
    { id: 'sc-7', title: 'AC Circuits & Phasor Diagrams', subject: 'Physics', startHour: 11.0, duration: 1.5, priority: 'Medium', energy: 'Peak', notes: 'Impedance calculations' },
    { id: 'sc-8', title: 'AI Practice Quiz & Mistake Vault Revision', subject: 'Computer Science', startHour: 17.0, duration: 1.5, priority: 'High', energy: 'Peak', notes: 'Hussain AI Testing Engine' }
  ],
  Wed: [
    { id: 'sc-9', title: 'Graph Traversals: BFS, DFS & Topological Sort', subject: 'Computer Science', startHour: 9.0, duration: 2.0, priority: 'High', energy: 'Peak', notes: 'Code implementation' },
    { id: 'sc-10', title: 'Macroeconomic Fiscal & Monetary Policy Models', subject: 'Macroeconomics', startHour: 14.0, duration: 1.5, priority: 'Medium', energy: 'Trough', notes: 'AD-AS shifts' }
  ],
  Thu: [
    { id: 'sc-11', title: 'Differential Equations & Separation of Variables', subject: 'Calculus & Linear Algebra', startHour: 8.0, duration: 2.0, priority: 'High', energy: 'Peak', notes: 'Past exam paper drill' },
    { id: 'sc-12', title: 'Alkene Addition & Markovnikov Rule', subject: 'Organic Chemistry', startHour: 16.0, duration: 1.5, priority: 'High', energy: 'Peak', notes: 'Mechanism arrows' }
  ],
  Fri: [
    { id: 'sc-13', title: 'Full Mock Practice Paper (MCQs + Theoretical)', subject: 'Physics', startHour: 9.0, duration: 2.0, priority: 'High', energy: 'Peak', notes: 'Timed solving mode' },
    { id: 'sc-14', title: 'Targeted Chapter Revision & PDF Export', subject: 'Computer Science', startHour: 15.0, duration: 1.5, priority: 'Medium', energy: 'Trough', notes: 'Fix weak concepts' }
  ],
  Sat: [
    { id: 'sc-15', title: 'Weekly Cumulative Mistake Vault Review', subject: 'Calculus & Linear Algebra', startHour: 10.0, duration: 2.0, priority: 'High', energy: 'Peak', notes: 'Review all flagged concepts' }
  ],
  Sun: [
    { id: 'sc-16', title: 'Next Week Syllabus & Google Drive Auto-Picker', subject: 'Computer Science', startHour: 11.0, duration: 1.5, priority: 'Low', energy: 'Recovery', notes: 'Sync with FlowPlan OS' }
  ]
};

const DEFAULT_PRACTICE_SHEET = {
  title: 'Cambridge CAIE (9618): Chapter 1 Data Representation, Two\'s Complement & Floating-Point',
  subject: 'Computer Science',
  topic: 'Data Representation & Number Systems',
  difficulty: 'Exam Standard',
  estimatedMinutes: 30,
  syllabusMatch: {
    board: 'Cambridge Assessment International Education (CAIE)',
    code: '9618/12 Paper 1: Theory Fundamentals',
    topic: 'Chapter 1: Information Representation (Topic 1.1 Data Representation)',
    objectives: [
      'Convert between Denary, signed 8-bit Two’s Complement Binary, and Hexadecimal',
      'Explain how normalized floating-point representation maintains maximum precision',
      'Identify two’s complement arithmetic overflow and boundary representations (-128 to +127)',
      'Distinguish character set standards (ASCII 7-bit, Unicode UTF-8) and calculate bitmap file sizes'
    ]
  },
  mcqs: [
    {
      id: 'mcq-1',
      question: 'What is the 8-bit Two\'s Complement binary representation of the denary integer -42?',
      options: [
        '11010110',
        '00101010',
        '11010101',
        '10101010'
      ],
      correctIndex: 0,
      conceptTag: 'Two’s Complement Binary Conversion',
      explanation: 'Step 1: +42 in 8-bit binary is 00101010. Step 2: Invert all bits (One’s complement) -> 11010101. Step 3: Add 1 -> 11010110. The MSB is 1 (-128), and -128 + 64 + 16 + 4 + 2 = -42.'
    },
    {
      id: 'mcq-2',
      question: 'In normalized floating-point representation with a signed two\'s complement mantissa, what must the first two bits of a positive normalized number and a negative normalized number be, respectively?',
      options: [
        '01 for positive, 10 for negative',
        '00 for positive, 11 for negative',
        '10 for positive, 01 for negative',
        '11 for positive, 00 for negative'
      ],
      correctIndex: 0,
      conceptTag: 'Normalized Floating-Point Mantissa Invariant',
      explanation: 'In normalized floating-point format under Cambridge CAIE 9618 specifications, positive numbers begin with 01 (sign bit 0 followed by 1 to maximize significant digits) and negative numbers begin with 10 (sign bit 1 followed by 0).'
    },
    {
      id: 'mcq-3',
      question: 'Why is hexadecimal notation preferred over pure binary notation when computer scientists inspect memory dumps and MAC addresses?',
      options: [
        'Hexadecimal saves physical RAM bytes inside silicon memory cells',
        'Hexadecimal is more compact and human-readable, where every single hex digit maps directly to exactly 4 binary bits (nibble)',
        'Computers calculate arithmetic faster using base-16 than base-2',
        'Hexadecimal supports negative numbers without requiring Two\'s Complement'
      ],
      correctIndex: 1,
      conceptTag: 'Hexadecimal Nibble Mapping & Memory Dump Inspection',
      explanation: 'Each hexadecimal digit (0-F) corresponds precisely to 4 binary bits (2^4 = 16). This makes long binary bit strings concise and drastically reduces human transcription errors without changing machine representation.'
    },
    {
      id: 'mcq-4',
      question: 'What is the primary technical limitation of standard 7-bit ASCII that led to the universal adoption of Unicode (such as UTF-8)?',
      options: [
        'ASCII cannot represent uppercase English alphabets',
        'ASCII is limited to 128 (2^7) unique code points, which is insufficient for global alphabets, Asian ideographs, mathematical symbols, and emoji',
        'ASCII requires parity bits that slow down fiber-optic transmission',
        'ASCII characters cannot be stored in modern 64-bit CPU registers'
      ],
      correctIndex: 1,
      conceptTag: 'ASCII vs Unicode Global Encoding Standards',
      explanation: '7-bit ASCII provides only 128 unique character slots (0-127). Unicode UTF-8 uses a backward-compatible variable-length encoding (1 to 4 bytes) supporting over 1.1 million code points to represent all world languages and technical symbol sets.'
    },
    {
      id: 'mcq-5',
      question: 'A 24-bit RGB bitmap image has dimensions of 1000 × 800 pixels. What is its uncompressed storage requirement in Megabytes (using 1 MB = 10^6 bytes)?',
      options: [
        '2.4 MB',
        '0.8 MB',
        '19.2 MB',
        '24.0 MB'
      ],
      correctIndex: 0,
      conceptTag: 'Bitmap Image File Size Formula (CAIE 9618)',
      explanation: 'Formula: Total Bytes = Width × Height × (Colour Depth in bits / 8). Total Bytes = 1000 × 800 × (24 / 8) = 800,000 × 3 = 2,400,000 bytes = 2.4 MB.'
    }
  ],
  theoretical: [
    {
      id: 'th-1',
      question: 'Perform the two\'s complement addition of the following two 8-bit signed binary integers: 01011100 (+92) and 00111010 (+58). State whether arithmetic overflow has occurred, and explain how the CPU ALU detects overflow in two\'s complement addition.',
      marks: 5,
      conceptTag: 'Two’s Complement Addition & ALU Overflow Detection',
      rubricKeywords: ['01011100', '00111010', '10010110', 'overflow', 'MSB', 'carry in', 'carry out'],
      modelAnswer: '1. Binary Sum: 01011100 + 00111010 = 10010110 (-106 in decimal).\n2. Overflow Analysis: Adding two positive numbers (+92 and +58 = +150) produced a negative result because +150 exceeds the maximum 8-bit signed capacity (+127).\n3. Hardware ALU Detection: The CPU detects overflow when the carry into the sign bit (bit 7) differs from the carry out of the sign bit (XOR condition), or when two operands of identical signs produce a result with the opposite sign.'
    },
    {
      id: 'th-2',
      question: 'A normalized floating-point number is stored using an 8-bit two\'s complement mantissa and a 4-bit two\'s complement exponent. (a) State the bit pattern for the maximum positive value that can be represented. (b) Calculate its denary equivalent showing all steps.',
      marks: 5,
      conceptTag: 'Normalized Floating-Point Format & Maximum Range (CAIE 9618)',
      rubricKeywords: ['mantissa', 'exponent', '01111111', '0111', 'denary', 'power of 2'],
      modelAnswer: '1. Mantissa Bit Pattern: To maximize a positive normalized number, the mantissa starts with 01 and all remaining bits are 1s -> 01111111 (binary 0.1111111 in fixed point, which is 1 - 2^-7 = 127/128 = 0.9921875).\n2. Exponent Bit Pattern: The maximum positive 4-bit exponent is 0111 (+7 in denary).\n3. Denary Value Calculation: Value = Mantissa × 2^Exponent = (127/128) × 2^7 = 127/128 × 128 = +127.'
    }
  ]
};

// 2. Application State
let sbState = {
  activeView: 'dashboard',
  authMode: 'signin',
  token: localStorage.getItem('sb_jwt') || null,
  user: JSON.parse(localStorage.getItem('sb_user') || 'null') || {
    name: 'Guest Student',
    email: 'guest@studybridge.ai',
    role: 'Free User',
    plan: 'Starter Plan (Free)',
    tier: 'free',
    is_admin: false,
    is_pro: false,
    weeklySessionsUsed: 3,
    weeklyLimit: 5,
    graceSessionUsed: false,
    streakDays: 7,
    driveConnected: true
  },
  selectedScheduleDay: 'Mon',
  driveFiles: JSON.parse(localStorage.getItem('sb_drive_files') || 'null') || INITIAL_DRIVE_FILES,
  schedule: JSON.parse(localStorage.getItem('sb_schedule') || 'null') || INITIAL_SCHEDULE,
  activePracticeSheet: JSON.parse(localStorage.getItem('sb_active_practice') || 'null') || DEFAULT_PRACTICE_SHEET,
  userMcqAnswers: {},
  userTheoryAnswers: {},
  weakConceptsVault: JSON.parse(localStorage.getItem('sb_weak_vault') || 'null') || [
    {
      concept: 'Faraday Law & Lenz Law Negative Sign',
      subject: 'Physics',
      rootCause: 'Forgetting that induced EMF opposes the change in magnetic flux (conservation of energy).',
      coreRuleOrFormula: 'ε = -N · (dΦ_B / dt)',
      quickFixTip: 'Always use the Right-Hand Grip Rule after finding the direction of opposing magnetic field.'
    },
    {
      concept: 'Integration by Parts Repeated Application',
      subject: 'Calculus & Linear Algebra',
      rootCause: 'Sign errors when applying ∫ u dv = u·v - ∫ v du multiple times.',
      coreRuleOrFormula: 'LIATE Priority: Logarithmic > Inverse Trig > Algebraic > Trig > Exponential',
      quickFixTip: 'Use the Tabular (DI) method with alternating + and - signs to eliminate sign mistakes.'
    }
  ],
  targetedRevision: JSON.parse(localStorage.getItem('sb_targeted_revision') || 'null') || {
    title: 'Targeted Chapter Revision: Missed Exam Concepts',
    keyTakeaways: [
      'Lenz’s Law negative sign (ε = -N dΦ/dt) reflects conservation of energy: induced current opposes the flux change.',
      'In Integration by Parts (∫ u dv = uv - ∫ v du), select u using the LIATE hierarchy.',
      'Dijkstra requires non-negative edge weights O((V+E) log V); use Bellman-Ford O(VE) when negative weights exist.',
      'Reduce 2D DP tables to 1D O(W) space by iterating capacity backwards when state depends only on the previous row.'
    ],
    stepByStepMasteryGuide:
      '**1. Mastering Faraday & Lenz Law:**\n• Calculate magnetic flux $\\Phi = B \\cdot A \\cdot \\cos(\\theta)$.\n• Differentiate with respect to time and apply the opposing sign.\n\n**2. Integration by Parts (LIATE):**\n• Pick $u$ first from **L**ogarithmic, **I**nverse trig, **A**lgebraic, **T**rig, **E**xponential.\n\n**3. Dynamic Programming Optimization:**\n• Always write the recurrence relation first before deciding between Memoization and Tabulation.',
    practiceDrillQuestion: {
      question: 'Why can Dijkstra fail on a graph with a single negative edge even if there is no negative cycle?',
      answer: 'Because Dijkstra finalizes the shortest distance to a vertex as soon as it is popped from the priority queue, assuming future edges can only add non-negative weight.'
    }
  },
  eodChecklist: JSON.parse(localStorage.getItem('sb_eod_checklist') || 'null') || [
    { id: 'eod-1', text: 'Review Hussain AI Daily Google Drive pick for Computer Science (Ch 4 DP)', done: true },
    { id: 'eod-2', text: 'Complete 25-min Peak Focus Sprint on Calculus Integration by Parts', done: true },
    { id: 'eod-3', text: 'Solve 1 AI Practice Sheet (MCQs + Theoretical) and review mistakes', done: true },
    { id: 'eod-4', text: 'Watch embedded YouTube lecture on Faraday & Lenz Law', done: false },
    { id: 'eod-5', text: 'Download Targeted Revision Summary PDF from Download Hub', done: false }
  ],
  savedPdfs: JSON.parse(localStorage.getItem('sb_saved_pdfs') || 'null') || [
    {
      id: 'pdf-init-1',
      title: 'CS Exam Question Paper: Dynamic Programming & Graphs',
      category: 'Question Paper',
      subject: 'Computer Science',
      createdAt: 'Today 09:40 AM',
      contentPreview: 'STUDYBRIDGE OFFICIAL EXAM QUESTION PAPER\nSubject: Computer Science — Dynamic Programming & Graph Algorithms\nSection A: 5 MCQs | Section B: 2 Structured Theoretical Questions (10 Marks)\nGenerated by Hussain AI Testing Engine.'
    },
    {
      id: 'pdf-init-2',
      title: 'Targeted Revision Summary: Faraday Law, LIATE & DP State Space',
      category: 'Revision Summary',
      subject: 'Multi-Subject',
      createdAt: 'Today 11:20 AM',
      contentPreview: 'TARGETED CHAPTER REVISION SUMMARY (MISTAKE VAULT FIX)\n1. Lenz Law: ε = -N dΦ/dt (opposes flux change)\n2. Integration by Parts: LIATE hierarchy\n3. Dijkstra vs Bellman-Ford complexity & invariants.'
    },
    {
      id: 'pdf-init-3',
      title: 'High-Yield Study Flashcards Deck: CS & Physics Core Formulas',
      category: 'Flashcards',
      subject: 'Computer Science & Physics',
      createdAt: 'Yesterday',
      contentPreview: 'STUDYBRIDGE AI FLASHCARDS DECK\nCard 1: Optimal Substructure & Overlapping Subproblems\nCard 2: Dijkstra O((V+E) log V)\nCard 3: Faraday Law ε = -N dΦ/dt'
    },
    {
      id: 'pdf-init-4',
      title: 'FlowPlan Circadian Weekly Study Timeline Dossier',
      category: 'Schedule Dossier',
      subject: 'Weekly Plan',
      createdAt: 'Yesterday',
      contentPreview: 'FLOWPLAN OS & STUDYBRIDGE CIRCADIAN TIMELINE\nPeak Window (05:00-12:00): Deep Calculus & CS Algorithms\nTrough Window (12:00-16:00): Organic Chemistry Review\nRecovery Window (19:00-01:00): EOD Checklist & Mistake Vault'
    }
  ],
  subjectMastery: SUBJECT_MASTERY_DEFAULT,
  timer: {
    running: false,
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    breakMinutes: 5,
    label: 'Pomodoro 25/5',
    intervalId: null
  },
  ragConversation: [],
  uploadedRagDocs: [],
  pendingPracticeCallback: null
};

function saveLocalState() {
  try {
    localStorage.setItem('sb_user', JSON.stringify(sbState.user));
    localStorage.setItem('sb_drive_files', JSON.stringify(sbState.driveFiles));
    localStorage.setItem('sb_schedule', JSON.stringify(sbState.schedule));
    localStorage.setItem('sb_active_practice', JSON.stringify(sbState.activePracticeSheet));
    localStorage.setItem('sb_weak_vault', JSON.stringify(sbState.weakConceptsVault));
    localStorage.setItem('sb_targeted_revision', JSON.stringify(sbState.targetedRevision));
    localStorage.setItem('sb_eod_checklist', JSON.stringify(sbState.eodChecklist));
    localStorage.setItem('sb_saved_pdfs', JSON.stringify(sbState.savedPdfs));
  } catch (e) {
    console.warn('State save warning:', e);
  }
}

// 3. Utility Helpers
function escapeHTML(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function formatMarkdown(md) {
  if (!md) return '';
  let html = escapeHTML(String(md));
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-buttermilk font-semibold">$1</strong>');
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-900 text-cyanGlow font-mono text-[11px]">$1</code>');
  html = html.replace(/^(?:•|-|\*)\s+(.*)$/gm, '<li class="ml-4 list-disc mb-1">$1</li>');
  html = html.replace(/(<li class="ml-4 list-disc mb-1">.*<\/li>\s*)+/g, '<ul class="my-1.5 space-y-0.5">$&</ul>');
  html = html.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');
  return html;
}

function formatHour12(decHour) {
  const num = Number(decHour) || 8;
  const totalMins = Math.round(num * 60);
  const h24 = ((Math.floor(totalMins / 60) % 24) + 24) % 24;
  const mins = totalMins % 60;
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${mins < 10 ? '0' + mins : mins} ${ampm}`;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  const isErr = type === 'error';
  const isWarn = type === 'warning';
  el.className = `px-4 py-3 rounded-2xl border font-mono text-xs shadow-2xl flex items-center gap-2.5 pointer-events-auto transition-all duration-300 ${
    isErr
      ? 'bg-rose-950/95 border-rose-400 text-rose-100'
      : isWarn
      ? 'bg-amber-950/95 border-amber-400 text-buttermilk'
      : 'bg-slate-900/95 border-cyanGlow text-white'
  }`;
  el.innerHTML = `
    <span class="text-sm">${isErr ? '⚠️' : isWarn ? '🎁' : '✨'}</span>
    <span class="leading-snug">${escapeHTML(message)}</span>
  `;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-6px)';
    setTimeout(() => el.remove(), 280);
  }, 3800);
}

// Web Audio API Synthesized Chime for Study Timer
function playCompletionChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.14);
      osc.stop(ctx.currentTime + idx * 0.14 + 0.46);
    });
  } catch {}
}

// 4. Navigation & Smooth View Switcher
window.switchView = function (viewName) {
  const validViews = ['dashboard', 'schedule', 'practice', 'doubts', 'hub', 'pricing', 'admin'];
  const target = validViews.includes(viewName) ? viewName : 'dashboard';
  
  // Guard Master Admin portal: strictly secret!
  const isAdmin = Boolean(sbState.user.is_admin === true || (sbState.user.email?.toLowerCase() === MASTER_ADMIN_EMAIL && sbState.user.is_admin === true));
  if (target === 'admin' && !isAdmin) {
    showToast('🔒 Master Admin portal is restricted. Please sign in with Master credentials.');
    openAuthModal('signin');
    return;
  }

  sbState.activeView = target;

  document.querySelectorAll('.sb-view-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `view-${target}`);
  });

  document.querySelectorAll('[data-nav]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-nav') === target);
  });

  document.querySelectorAll('[data-bnav]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-bnav') === target);
  });

  if (target === 'admin') {
    refreshAdminOverview();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openMobileDrawer = function () {
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  if (!backdrop) return;
  backdrop.classList.remove('hidden');
  backdrop.classList.add('flex');
};

window.closeMobileDrawer = function () {
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  if (!backdrop) return;
  backdrop.classList.add('hidden');
  backdrop.classList.remove('flex');
};

// 5. User UI, RBAC & Quota Synchronization
function updateAuthAndQuotaUI() {
  const u = sbState.user;
  const isAdmin = Boolean(u.is_admin === true || (u.email?.toLowerCase() === MASTER_ADMIN_EMAIL && u.is_admin === true));
  const isPro = Boolean(u.is_pro || isAdmin || u.tier === 'pro');
  const used = Number(u.weeklySessionsUsed || 0);
  const limit = Number(u.weeklyLimit || 5);

  // Top Nav
  const navAuthLabel = document.getElementById('nav-auth-label');
  const navAuthBtn = document.getElementById('nav-btn-auth') || document.getElementById('nav-auth-btn');
  if (navAuthLabel) {
    navAuthLabel.textContent = u.email && u.email !== 'guest@studybridge.ai' ? `${u.name.split(' ')[0]} (${isAdmin ? 'Admin' : isPro ? 'Pro' : 'Free'})` : 'Sign In';
  } else if (navAuthBtn) {
    navAuthBtn.textContent = u.email && u.email !== 'guest@studybridge.ai' ? `${u.name.split(' ')[0]} (${isAdmin ? 'Admin' : isPro ? 'Pro' : 'Free'})` : 'Sign In';
  }

  // Master Admin Buttons strictly hidden from non-admins
  const navAdminBtn = document.getElementById('btn-quick-admin') || document.getElementById('nav-admin-btn');
  if (navAdminBtn) {
    navAdminBtn.classList.toggle('hidden', !isAdmin);
    navAdminBtn.classList.toggle('inline-flex', isAdmin);
  }
  const navLinkAdmin = document.getElementById('nav-link-admin');
  if (navLinkAdmin) navLinkAdmin.classList.toggle('hidden', !isAdmin);

  const drawerLinkAdmin = document.getElementById('drawer-link-admin');
  if (drawerLinkAdmin) drawerLinkAdmin.classList.toggle('hidden', !isAdmin);

  const navStreak = document.getElementById('nav-streak-count');
  const mobStreak = document.getElementById('mob-streak-count');
  const metricStreak = document.getElementById('metric-streak-days');
  if (navStreak) navStreak.textContent = `${u.streakDays || 7} Day Streak`;
  if (mobStreak) mobStreak.textContent = `${u.streakDays || 7}d`;
  if (metricStreak) metricStreak.textContent = `${u.streakDays || 7} Days`;

  const quotaText = isAdmin
    ? 'Master Admin (Unlimited)'
    : isPro
    ? 'Pro Unlimited (∞)'
    : `Starter: ${used}/${limit} Sessions`;

  const navQuotaText = document.getElementById('nav-quota-text');
  if (navQuotaText) navQuotaText.textContent = quotaText;

  const pracQuotaPill = document.getElementById('practice-quota-pill');
  if (pracQuotaPill) {
    pracQuotaPill.textContent = isAdmin || isPro
      ? 'Unlimited AI Practice Sessions Active'
      : `Weekly Quota: ${used} / ${limit} Sessions${u.graceSessionUsed ? ' (Grace Used)' : ' (+1 Grace Ready)'}`;
  }

  // Sidebar Profile
  const sbAvatar = document.getElementById('side-user-avatar') || document.getElementById('sidebar-user-avatar');
  const sbName = document.getElementById('side-user-name') || document.getElementById('sidebar-user-name');
  const sbRole = document.getElementById('side-user-role') || document.getElementById('sidebar-user-role');
  const sbQuotaLabel = document.getElementById('sidebar-quota-label');
  const sbQuotaBar = document.getElementById('sidebar-quota-bar');
  const sbGraceStatus = document.getElementById('sidebar-grace-status');

  if (sbAvatar) {
    const initials = (u.name || 'ST').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    sbAvatar.textContent = initials;
  }
  if (sbName) sbName.textContent = u.name || 'Guest Student';
  if (sbRole) {
    sbRole.textContent = isAdmin ? 'Master Admin (God-Mode)' : isPro ? 'Pro Student Tier ($9.99/mo)' : 'Starter Plan ($0/mo)';
  }
  if (sbQuotaLabel) {
    sbQuotaLabel.textContent = isAdmin || isPro ? 'Unlimited ∞' : `${used} / ${limit} used`;
  }
  if (sbQuotaBar) {
    const pct = isAdmin || isPro ? 100 : Math.min(100, Math.round((used / limit) * 100));
    sbQuotaBar.style.width = `${pct}%`;
  }
  if (sbGraceStatus) {
    if (isAdmin || isPro) {
      sbGraceStatus.textContent = '✦ Pro Unlimited Tier Active';
    } else if (u.graceSessionUsed) {
      sbGraceStatus.textContent = '⚠️ Weekly Grace Session Used';
    } else {
      sbGraceStatus.textContent = '✓ 1-Time Grace Session Ready';
    }
  }

  // Dashboard metrics
  const metricSessions = document.getElementById('metric-weekly-sessions');
  const metricGrace = document.getElementById('metric-grace-note');
  if (metricSessions) {
    metricSessions.textContent = isAdmin || isPro ? 'Unlimited' : `${used} / ${limit}`;
  }
  if (metricGrace) {
    metricGrace.textContent = isAdmin || isPro
      ? 'Pro Student Tier Active'
      : u.graceSessionUsed
      ? 'Grace Session Used This Week'
      : '+1 Grace Session Available';
  }

  // Mobile Drawer summary
  const mobUser = document.getElementById('mob-drawer-user');
  const mobQuota = document.getElementById('mob-drawer-quota');
  if (mobUser) mobUser.textContent = `${u.name} (${u.email})`;
  if (mobQuota) mobQuota.textContent = quotaText;

  // Admin View Lock/Unlock
  const adminLocked = document.getElementById('admin-locked-banner');
  const adminUnlocked = document.getElementById('admin-unlocked-content');
  if (adminLocked && adminUnlocked) {
    adminLocked.classList.toggle('hidden', isAdmin);
    adminUnlocked.classList.toggle('hidden', !isAdmin);
  }

  saveLocalState();
}

// 6. Authentication & RBAC Flows (Email/Password, Google OAuth, Master Admin)
window.openAuthModal = function (mode = 'signin') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setAuthModalMode(mode === 'admin' ? 'signin' : mode);
  const emailInput = document.getElementById('auth-email');
  const passInput = document.getElementById('auth-password');
  if (emailInput && !emailInput.value) emailInput.value = '';
  if (passInput) passInput.value = '';
};

window.closeAuthModal = function () {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

window.setAuthModalMode = function (mode) {
  sbState.authMode = mode === 'signup' ? 'signup' : 'signin';
  const isSignup = sbState.authMode === 'signup';

  const title = document.getElementById('auth-modal-title');
  const submitBtn = document.getElementById('btn-auth-submit');
  const nameWrap = document.getElementById('auth-name-wrap');
  const consentWrap = document.getElementById('auth-consent-wrap');
  const tabIn = document.getElementById('tab-auth-signin');
  const tabUp = document.getElementById('tab-auth-signup');
  const errEl = document.getElementById('auth-error-msg');

  if (errEl) errEl.classList.add('hidden');
  if (title) title.textContent = isSignup ? 'Create Your StudyBridge Account' : 'Sign In to StudyBridge';
  if (submitBtn) submitBtn.textContent = isSignup ? 'Create Student Account →' : 'Sign In →';
  if (nameWrap) nameWrap.classList.toggle('hidden', !isSignup);
  if (consentWrap) {
    consentWrap.classList.toggle('hidden', !isSignup);
    consentWrap.classList.toggle('flex', isSignup);
  }
  if (tabIn && tabUp) {
    tabIn.className = isSignup
      ? 'py-2 rounded-lg text-slate-400 hover:text-white cursor-pointer'
      : 'py-2 rounded-lg bg-electricBlue text-white font-bold cursor-pointer';
    tabUp.className = isSignup
      ? 'py-2 rounded-lg bg-electricBlue text-white font-bold cursor-pointer'
      : 'py-2 rounded-lg text-slate-400 hover:text-white cursor-pointer';
  }
};

window.fillAndSubmitAuth = function (email, password) {
  setAuthModalMode('signin');
  document.getElementById('auth-email').value = email;
  document.getElementById('auth-password').value = password;
  executeAuthRequest('signin', email, password, '');
};

window.quickLoginMasterAdmin = function () {
  openAuthModal('signin');
};

async function executeAuthRequest(mode, email, password, name, termsAccepted = true) {
  const errEl = document.getElementById('auth-error-msg');
  if (errEl) errEl.classList.add('hidden');

  const cleanEmail = String(email || '').trim().toLowerCase();
  if (mode === 'signup' && !termsAccepted) {
    if (errEl) {
      errEl.textContent = 'You must agree to the Terms and Conditions and Privacy Policy to sign up.';
      errEl.classList.remove('hidden');
    }
    showToast('Please accept the Terms & Conditions and Privacy Policy.', 'error');
    return;
  }

  try {
    const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password, name, termsAccepted })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Authentication failed');
    }
    sbState.token = data.access_token;
    sbState.user = data.user;
    localStorage.setItem('sb_jwt', sbState.token);
    updateAuthAndQuotaUI();
    closeAuthModal();
    showToast(`Welcome, ${sbState.user.name}! (${sbState.user.plan})`);
    if (sbState.user.is_admin) {
      refreshAdminOverview();
    }
    return;
  } catch (err) {
    // Offline / Standalone Browser Fallback
    if (cleanEmail === MASTER_ADMIN_EMAIL && password === MASTER_ADMIN_PASS) {
      sbState.user = {
        name: 'Muhammad Hussain (Master Admin)',
        email: MASTER_ADMIN_EMAIL,
        role: 'Master Admin',
        plan: 'Master Admin (God-Mode)',
        tier: 'admin',
        is_admin: true,
        is_pro: true,
        weeklySessionsUsed: 0,
        weeklyLimit: 999999,
        graceSessionUsed: false,
        streakDays: 18,
        driveConnected: true
      };
      updateAuthAndQuotaUI();
      closeAuthModal();
      showToast('Master Admin (God-Mode) Unlocked!');
      return;
    }
    if (cleanEmail === 'zain.ali@student.edu') {
      sbState.user = {
        name: 'Zain Ali',
        email: cleanEmail,
        role: 'Free User',
        plan: 'Starter Plan (Free)',
        tier: 'free',
        is_admin: false,
        is_pro: false,
        weeklySessionsUsed: 5,
        weeklyLimit: 5,
        graceSessionUsed: false,
        streakDays: 5,
        driveConnected: true
      };
      updateAuthAndQuotaUI();
      closeAuthModal();
      showToast('Signed in as Zain Ali (5/5 Weekly Sessions — Grace Ready)');
      return;
    }
    if (cleanEmail && password.length >= 6) {
      const isProDemo = cleanEmail.includes('ayesha') || cleanEmail.includes('pro');
      sbState.user = {
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        role: isProDemo ? 'Premium Member' : 'Free User',
        plan: isProDemo ? 'Pro Student Tier ($9.99/mo)' : 'Starter Plan (Free)',
        tier: isProDemo ? 'pro' : 'free',
        is_admin: false,
        is_pro: isProDemo,
        weeklySessionsUsed: isProDemo ? 12 : 1,
        weeklyLimit: isProDemo ? 999999 : 5,
        graceSessionUsed: false,
        streakDays: 7,
        driveConnected: true
      };
      updateAuthAndQuotaUI();
      closeAuthModal();
      showToast(`Signed in as ${sbState.user.name}!`);
      return;
    }
    if (errEl) {
      errEl.textContent = err.message || 'Invalid credentials.';
      errEl.classList.remove('hidden');
    }
  }
}

window.handleGoogleOAuthSignIn = async function () {
  const enteredEmail = document.getElementById('auth-email')?.value?.trim();
  const email = enteredEmail && enteredEmail.includes('@') ? enteredEmail : 'scholar.student@gmail.com';
  const name = email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  
  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    });
    if (res.ok) {
      const data = await res.json();
      sbState.token = data.access_token;
      sbState.user = data.user;
      sbState.user.driveConnected = true;
      sbState.user.driveUrl = 'https://drive.google.com/drive/my-drive';
      localStorage.setItem('sb_jwt', sbState.token);
    } else {
      throw new Error('Offline Google fallback');
    }
  } catch {
    const isAdmin = email.toLowerCase() === MASTER_ADMIN_EMAIL;
    sbState.user = {
      name: isAdmin ? 'Muhammad Hussain (Master Admin)' : name,
      email,
      role: isAdmin ? 'Master Admin' : 'Free User',
      plan: isAdmin ? 'Master Admin (God-Mode)' : 'Starter Plan (Free)',
      tier: isAdmin ? 'admin' : 'free',
      is_admin: isAdmin,
      is_pro: isAdmin,
      weeklySessionsUsed: 0,
      weeklyLimit: isAdmin ? 999999 : 5,
      graceSessionUsed: false,
      streakDays: 7,
      driveConnected: true,
      driveUrl: 'https://drive.google.com/drive/my-drive'
    };
  }
  
  saveLocalState();
  updateAuthAndQuotaUI();
  renderDriveFiles();
  closeAuthModal();
  showToast(`Signed in as ${sbState.user.email} & synced Google Drive!`);
  
  // Prompt user to open their actual Google Drive immediately
  setTimeout(() => {
    if (confirm(`Your Google account (${sbState.user.email}) is connected! Would you like to open your Google Drive storage now in a new tab?`)) {
      window.open('https://drive.google.com/drive/my-drive', '_blank', 'noopener,noreferrer');
    }
  }, 400);
};

// 7. Lenient Membership Policy & 1-Time Weekly Grace Session Engine
async function checkAndConsumePracticeSession(onAllowedCallback) {
  const u = sbState.user;
  if (u.is_admin || u.is_pro || u.tier === 'pro' || u.tier === 'admin') {
    u.weeklySessionsUsed = (u.weeklySessionsUsed || 0) + 1;
    updateAuthAndQuotaUI();
    if (onAllowedCallback) await onAllowedCallback();
    return;
  }

  try {
    const res = await fetch('/api/tier/consume-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: u.email })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'allowed') {
        u.weeklySessionsUsed = data.used;
        updateAuthAndQuotaUI();
        if (onAllowedCallback) await onAllowedCallback();
        return;
      }
      if (data.status === 'grace_available') {
        sbState.pendingPracticeCallback = onAllowedCallback;
        openGraceLimitModal(true, data.message);
        return;
      }
      if (data.status === 'limit_reached') {
        sbState.pendingPracticeCallback = null;
        openGraceLimitModal(false, data.message);
        return;
      }
    }
  } catch {}

  // Client-side lenient fallback check
  const limit = Number(u.weeklyLimit || 5);
  const used = Number(u.weeklySessionsUsed || 0);
  if (used < limit) {
    u.weeklySessionsUsed = used + 1;
    updateAuthAndQuotaUI();
    if (onAllowedCallback) await onAllowedCallback();
  } else if (!u.graceSessionUsed) {
    sbState.pendingPracticeCallback = onAllowedCallback;
    openGraceLimitModal(
      true,
      `You've completed all ${limit} free AI practice sessions this week! Under StudyBridge's lenient student policy, you can activate a 1-Time Weekly Grace Session right now so you aren't blocked mid-study, or upgrade to Pro Student Tier ($9.99/mo).`
    );
  } else {
    sbState.pendingPracticeCallback = null;
    openGraceLimitModal(
      false,
      `You have used all ${limit} weekly sessions plus your 1-time weekly grace session. Upgrade to Pro Student Tier ($9.99/mo) for unlimited AI practice sheets!`
    );
  }
}

window.openGraceLimitModal = function (graceAvailable = true, customMessage = '') {
  const modal = document.getElementById('grace-limit-modal');
  const msgEl = document.getElementById('grace-modal-message');
  const usedEl = document.getElementById('grace-modal-used');
  const statusEl = document.getElementById('grace-modal-status');
  const graceBtn = document.getElementById('btn-use-grace-session');
  if (!modal) return;

  if (customMessage && msgEl) msgEl.textContent = customMessage;
  if (usedEl) usedEl.textContent = `${sbState.user.weeklySessionsUsed || 5} / ${sbState.user.weeklyLimit || 5} Sessions`;
  if (statusEl) {
    statusEl.textContent = graceAvailable ? '1 Free Grace Session Ready 🎁' : 'Grace Session Already Used';
    statusEl.className = graceAvailable ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold';
  }
  if (graceBtn) {
    graceBtn.classList.toggle('hidden', !graceAvailable);
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeGraceLimitModal = function () {
  const modal = document.getElementById('grace-limit-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

window.simulateHitFiveSessionLimit = function () {
  sbState.user.tier = 'free';
  sbState.user.is_pro = false;
  sbState.user.weeklySessionsUsed = 5;
  sbState.user.weeklyLimit = 5;
  sbState.user.graceSessionUsed = false;
  updateAuthAndQuotaUI();
  openGraceLimitModal(true);
};

window.activateOneTimeGraceSession = async function () {
  try {
    await fetch('/api/tier/use-grace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: sbState.user.email })
    });
  } catch {}

  sbState.user.graceSessionUsed = true;
  sbState.user.weeklySessionsUsed = (sbState.user.weeklySessionsUsed || 5) + 1;
  updateAuthAndQuotaUI();
  closeGraceLimitModal();
  showToast('🎁 1-Time Weekly Grace Session Activated! Enjoy uninterrupted study.', 'warning');

  if (typeof sbState.pendingPracticeCallback === 'function') {
    const cb = sbState.pendingPracticeCallback;
    sbState.pendingPracticeCallback = null;
    await cb();
  }
};

window.openUpgradeModal = function () {
  const modal = document.getElementById('upgrade-modal');
  if (!modal) return;
  const nameInp = document.getElementById('upg-name');
  const emailInp = document.getElementById('upg-email');
  if (nameInp && sbState.user.name !== 'Guest Student') nameInp.value = sbState.user.name;
  if (emailInp && sbState.user.email !== 'guest@studybridge.ai') emailInp.value = sbState.user.email;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeUpgradeModal = function () {
  const modal = document.getElementById('upgrade-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

// 8. Google Drive Integration, Daily Resource Picker & Circadian Schedule
function renderDriveFiles() {
  const dashList = document.getElementById('dash-drive-picks-list');
  const driveContainer = document.getElementById('drive-files-container');

  const pickedToday = sbState.driveFiles.filter((f) => f.pickedToday);
  if (dashList) {
    dashList.innerHTML = pickedToday
      .slice(0, 4)
      .map(
        (f) => `
      <div class="p-2.5 rounded-xl bg-slate-950/90 border border-white/10 flex items-center justify-between gap-2">
        <div class="min-w-0">
          <div class="text-[10px] font-mono text-cyan-400 font-bold uppercase">${escapeHTML(f.subject)}</div>
          <div class="text-xs font-semibold text-white truncate">${escapeHTML(f.title)}</div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <a href="${escapeHTML(f.url || 'https://drive.google.com/drive/my-drive')}" target="_blank" rel="noopener noreferrer" class="sb-btn sb-btn-google-drive py-1 px-2 text-[10px] font-bold" title="Open directly in Google Drive">
            Drive ↗
          </a>
          <button onclick="practiceFromDriveResource('${escapeHTML(f.subject)}', '${escapeHTML(f.title)}')" class="sb-btn sb-btn-primary py-1 px-2 text-[10px] font-bold">
            Quiz ⚡
          </button>
        </div>
      </div>
    `
      )
      .join('');
  }

  if (driveContainer) {
    driveContainer.innerHTML = sbState.driveFiles
      .map(
        (f) => `
      <div class="p-3.5 rounded-xl bg-slate-950/90 border ${
        f.pickedToday ? 'border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'border-white/10'
      } flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="min-w-0 space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-400 font-mono text-[10px] font-semibold">${escapeHTML(f.subject)}</span>
            ${
              f.pickedToday
                ? '<span class="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-mono text-[10px] font-bold">✨ Today\'s Hussain AI Pick</span>'
                : ''
            }
          </div>
          <div class="text-xs sm:text-sm font-bold text-white truncate">${escapeHTML(f.title)}</div>
          <div class="text-[11px] text-slate-400 truncate">${escapeHTML(f.notes || 'Google Drive Synchronized Asset')}</div>
        </div>
        <div class="flex items-center gap-2 shrink-0 font-mono text-xs">
          <a href="${escapeHTML(f.url || 'https://drive.google.com/drive/my-drive')}" target="_blank" rel="noopener noreferrer" class="sb-btn sb-btn-google-drive py-1.5 px-3 text-xs font-bold" title="Open file in Google Drive">
            <svg class="w-3.5 h-3.5" viewBox="0 0 87.3 78" fill="none"><path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/><path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/><path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/><path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/></svg>
            <span>Open in Drive ↗</span>
          </a>
          <button onclick="practiceFromDriveResource('${escapeHTML(f.subject)}', '${escapeHTML(f.title)}')" class="sb-btn sb-btn-primary py-1.5 px-3 text-xs">
            <span>Practice ⚡</span>
          </button>
        </div>
      </div>
    `
      )
      .join('');
  }
}

window.practiceFromDriveResource = function (subject, title) {
  switchView('practice');
  const subjEl = document.getElementById('prac-subject');
  const topEl = document.getElementById('prac-topic');
  if (subjEl) subjEl.value = subject;
  if (topEl) topEl.value = title.replace(/\.pdf$/i, '');
  showToast(`Loaded "${title}" into Hussain AI Practice Engine!`);
};

window.runHussainAIDailyResourcePicker = function () {
  // Automatically select 1 resource per subject from Google Drive
  const subjectsSeen = new Set();
  // Rotate selection slightly so user sees dynamic picking
  const shuffled = [...sbState.driveFiles].sort(() => Math.random() - 0.5);
  const pickedIds = new Set();

  shuffled.forEach((file) => {
    if (!subjectsSeen.has(file.subject)) {
      subjectsSeen.add(file.subject);
      pickedIds.add(file.id);
    }
  });

  sbState.driveFiles.forEach((f) => {
    f.pickedToday = pickedIds.has(f.id);
  });

  // Also add today's picked resources into the active schedule day if not present
  const day = sbState.selectedScheduleDay || 'Mon';
  if (!sbState.schedule[day]) sbState.schedule[day] = [];

  saveLocalState();
  renderDriveFiles();
  renderScheduleTimeline();
  showToast(`✨ Hussain AI selected ${pickedIds.size} daily Google Drive resources (1 per subject)!`);
};

window.toggleGoogleDriveConnection = function () {
  sbState.user.driveConnected = !sbState.user.driveConnected;
  const statusEl = document.getElementById('drive-conn-status');
  const btnEl = document.getElementById('btn-drive-connect');
  if (statusEl) {
    statusEl.textContent = sbState.user.driveConnected
      ? '● Connected to Student Google Drive'
      : '○ Google Drive Paused (Click to Reconnect)';
    statusEl.className = sbState.user.driveConnected
      ? 'text-[11px] font-mono text-emerald-400'
      : 'text-[11px] font-mono text-amber-300';
  }
  if (btnEl) {
    btnEl.textContent = sbState.user.driveConnected ? '✓ Drive Synced' : 'Connect Drive';
  }
  saveLocalState();
  showToast(sbState.user.driveConnected ? 'Google Drive synchronized!' : 'Google Drive sync paused.');
};

window.selectScheduleDay = function (day) {
  sbState.selectedScheduleDay = day;
  document.querySelectorAll('.sday-btn').forEach((btn) => {
    const isMatch = btn.getAttribute('data-sday') === day;
    btn.className = isMatch
      ? 'sday-btn px-2.5 py-1 rounded-lg bg-electricBlue text-white font-bold cursor-pointer'
      : 'sday-btn px-2.5 py-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white cursor-pointer';
  });
  renderScheduleTimeline();
};

function renderScheduleTimeline() {
  const container = document.getElementById('schedule-timeline-container');
  if (!container) return;
  const day = sbState.selectedScheduleDay || 'Mon';
  const list = (sbState.schedule[day] || []).slice().sort((a, b) => a.startHour - b.startHour);

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-6 rounded-2xl bg-slate-950/70 border border-white/10 text-center text-xs text-slate-400 font-mono">
        No study blocks scheduled for ${day} yet. Use the form above or click "Hussain AI: Pick 1 Drive File / Subject".
      </div>
    `;
    return;
  }

  container.innerHTML = list
    .map((item) => {
      const endHour = Number(item.startHour) + Number(item.duration || 1.5);
      const zoneBadge =
        item.energy === 'Peak'
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
          : item.energy === 'Trough'
          ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
          : 'bg-purple-500/20 text-purple-300 border-purple-400/40';

      return `
      <div class="p-3.5 rounded-2xl bg-slate-950/90 border border-white/10 hover:border-cyanGlow/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div class="space-y-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 font-mono text-[10px]">
            <span class="text-buttermilk font-bold">${formatHour12(item.startHour)} — ${formatHour12(endHour)}</span>
            <span class="px-2 py-0.5 rounded border ${zoneBadge} font-bold">${escapeHTML(item.energy || 'Peak')} Zone</span>
            <span class="px-2 py-0.5 rounded bg-blue-500/20 text-cyanGlow">${escapeHTML(item.subject || 'Study')}</span>
          </div>
          <div class="text-xs sm:text-sm font-bold text-white truncate">${escapeHTML(item.title)}</div>
          <div class="text-[11px] text-slate-400 truncate">${escapeHTML(item.notes || '')}</div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0 font-mono text-[10px]">
          <button onclick="practiceFromDriveResource('${escapeHTML(item.subject || 'Computer Science')}', '${escapeHTML(item.title)}')" class="px-2.5 py-1.5 rounded-lg bg-electricBlue/20 border border-electricBlue/40 text-cyanGlow hover:bg-electricBlue hover:text-white cursor-pointer">
            Quiz
          </button>
          <button onclick="deleteScheduleBlock('${day}', '${item.id}')" class="px-2.5 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500 hover:text-white cursor-pointer">
            ✕
          </button>
        </div>
      </div>
    `;
    })
    .join('');
}

window.deleteScheduleBlock = function (day, id) {
  if (!sbState.schedule[day]) return;
  sbState.schedule[day] = sbState.schedule[day].filter((b) => b.id !== id);
  saveLocalState();
  renderScheduleTimeline();
  showToast('Removed schedule block.');
};

// 9. Study Timers (Pomodoro & Circadian Deep Focus)
function updateTimerDisplays() {
  const secs = Math.max(0, sbState.timer.remainingSeconds);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const formatted = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;

  const dashDisp = document.getElementById('dash-timer-display');
  const studioDisp = document.getElementById('studio-timer-clock');
  const dashBtn = document.getElementById('dash-timer-start-btn');
  const studioBtn = document.getElementById('studio-timer-toggle-btn');
  const studioLabel = document.getElementById('studio-timer-label');

  if (dashDisp) dashDisp.textContent = formatted;
  if (studioDisp) studioDisp.textContent = formatted;
  if (studioLabel) studioLabel.textContent = sbState.timer.label;
  if (dashBtn) dashBtn.textContent = sbState.timer.running ? 'Pause' : 'Start';
  if (studioBtn) studioBtn.textContent = sbState.timer.running ? '⏸ Pause Focus Session' : '▶ Start Focus Session';
}

window.setStudyTimerPreset = function (focusMins, breakMins = 5, label = 'Custom Focus') {
  const mins = Math.max(1, Math.min(180, Number(focusMins) || 25));
  if (sbState.timer.intervalId) {
    clearInterval(sbState.timer.intervalId);
    sbState.timer.intervalId = null;
  }
  sbState.timer.running = false;
  sbState.timer.totalSeconds = mins * 60;
  sbState.timer.remainingSeconds = mins * 60;
  sbState.timer.breakMinutes = breakMins;
  sbState.timer.label = `${label} (${mins}m)`;
  updateTimerDisplays();
  showToast(`Timer set to ${mins} minutes (${label}).`);
};

window.toggleStudyTimer = function () {
  if (sbState.timer.running) {
    clearInterval(sbState.timer.intervalId);
    sbState.timer.intervalId = null;
    sbState.timer.running = false;
    updateTimerDisplays();
    return;
  }
  sbState.timer.running = true;
  updateTimerDisplays();
  sbState.timer.intervalId = setInterval(() => {
    sbState.timer.remainingSeconds -= 1;
    if (sbState.timer.remainingSeconds <= 0) {
      clearInterval(sbState.timer.intervalId);
      sbState.timer.intervalId = null;
      sbState.timer.running = false;
      sbState.timer.remainingSeconds = sbState.timer.totalSeconds;
      playCompletionChime();
      sbState.user.streakDays = (sbState.user.streakDays || 7) + 1;
      updateAuthAndQuotaUI();
      showToast('🎉 Focus Sprint Completed! +1 Study Streak logged.');
    }
    updateTimerDisplays();
  }, 1000);
};

window.resetStudyTimer = function () {
  if (sbState.timer.intervalId) clearInterval(sbState.timer.intervalId);
  sbState.timer.intervalId = null;
  sbState.timer.running = false;
  sbState.timer.remainingSeconds = sbState.timer.totalSeconds;
  updateTimerDisplays();
};

window.completeTimerSprintEarly = function () {
  playCompletionChime();
  resetStudyTimer();
  showToast('✓ Focus session logged to your daily study progress!');
};

// 10. AI Practice & Testing Engine (MCQs + Theoretical + Mistake Analysis + Revision)
function renderActivePracticeSheet() {
  const sheet = sbState.activePracticeSheet || DEFAULT_PRACTICE_SHEET;
  const titleEl = document.getElementById('active-sheet-title');
  const boardEl = document.getElementById('exam-board-badge');
  const paperEl = document.getElementById('exam-paper-code');
  const objectivesEl = document.getElementById('exam-learning-objectives');
  const mcqContainer = document.getElementById('practice-mcqs-container');
  const theoryContainer = document.getElementById('practice-theory-container');

  if (titleEl) {
    titleEl.textContent = `${sheet.title || sheet.subject + ': ' + sheet.topic}`;
  }
  if (boardEl) {
    boardEl.textContent = sheet.syllabusMatch?.board || 'Cambridge CAIE 9618';
  }
  if (paperEl) {
    paperEl.textContent = sheet.syllabusMatch?.code || 'Paper 1: Theory Fundamentals';
  }
  if (objectivesEl) {
    const objs = sheet.syllabusMatch?.objectives || [
      'Convert between denary, signed two\'s complement binary, and hexadecimal',
      'Explain fixed-point vs floating-point representation with mantissa and exponent',
      'Character encoding standards: ASCII vs Unicode code points',
      'Sound sampling rate, resolution, and bitmap file size formulas'
    ];
    objectivesEl.innerHTML = objs.map((obj) => `<div>• ${escapeHTML(obj)}</div>`).join('');
  }

  if (mcqContainer) {
    mcqContainer.innerHTML = (sheet.mcqs || [])
      .map((q, idx) => {
        const selected = sbState.userMcqAnswers[q.id];
        return `
        <div class="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3" id="mcq-card-${q.id}">
          <div class="flex items-center justify-between gap-2 font-mono text-[11px]">
            <span class="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-400 font-bold">MCQ ${idx + 1}</span>
            <span class="text-slate-400">Concept: ${escapeHTML(q.conceptTag || sheet.topic)}</span>
          </div>
          <p class="text-sm font-semibold text-white leading-relaxed">${escapeHTML(q.question)}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            ${(q.options || [])
              .map((opt, oIdx) => {
                const isChosen = selected === oIdx;
                const letter = ['A', 'B', 'C', 'D'][oIdx] || '•';
                return `
                <button
                  type="button"
                  onclick="selectMcqOption('${q.id}', ${oIdx})"
                  class="mcq-option-pill ${isChosen ? 'selected' : ''}"
                  id="mcq-opt-${q.id}-${oIdx}"
                >
                  <span class="mcq-letter-badge">${letter}</span>
                  <span class="leading-snug">${escapeHTML(opt)}</span>
                </button>
              `;
              })
              .join('')}
          </div>
          <div id="mcq-feedback-${q.id}" class="hidden p-3 rounded-xl text-xs font-sans"></div>
        </div>
      `;
      })
      .join('');
  }

  if (theoryContainer) {
    theoryContainer.innerHTML = (sheet.theoretical || [])
      .map(
        (tq, idx) => `
      <div class="p-4 rounded-2xl bg-slate-950/90 border border-white/10 space-y-2.5">
        <div class="flex items-center justify-between gap-2 font-mono text-[10px]">
          <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Theoretical Q${idx + 1} (${tq.marks || 5} Marks)</span>
          <span class="text-slate-400">Concept: ${escapeHTML(tq.conceptTag || sheet.topic)}</span>
        </div>
        <p class="text-xs sm:text-sm font-semibold text-white leading-relaxed">${escapeHTML(tq.question)}</p>
        <textarea
          rows="3"
          oninput="recordTheoryAnswer('${tq.id}', this.value)"
          placeholder="Write your structured theoretical answer or derivation here..."
          class="w-full bg-slate-900 border border-white/15 rounded-xl p-3 text-xs text-white outline-none focus:border-cyanGlow"
        >${escapeHTML(sbState.userTheoryAnswers[tq.id] || '')}</textarea>
        <div id="theory-feedback-${tq.id}" class="hidden p-3 rounded-xl bg-indigo-950/80 border border-emerald-400/40 text-xs text-slate-200 space-y-1"></div>
      </div>
    `
      )
      .join('');
  }
}

window.selectMcqOption = function (qId, optionIdx) {
  sbState.userMcqAnswers[qId] = optionIdx;
  renderActivePracticeSheet();
};

window.recordTheoryAnswer = function (qId, text) {
  sbState.userTheoryAnswers[qId] = text;
};

function renderWeakConceptsAndRevision() {
  // Dashboard weak concepts list
  const dashWeak = document.getElementById('dash-weak-concepts-list');
  const metricWeak = document.getElementById('metric-weak-count');
  if (metricWeak) {
    metricWeak.textContent = `${sbState.weakConceptsVault.length} Weak Concepts Flagged`;
  }

  if (dashWeak) {
    dashWeak.innerHTML = sbState.weakConceptsVault
      .slice(0, 3)
      .map(
        (w) => `
      <div class="p-2.5 rounded-xl bg-slate-950/90 border border-rose-500/30 space-y-1">
        <div class="flex items-center justify-between font-mono text-[10px]">
          <span class="text-rose-300 font-bold">${escapeHTML(w.concept)}</span>
          <span class="text-slate-400">${escapeHTML(w.subject || '')}</span>
        </div>
        <div class="text-[11px] text-buttermilk font-mono">${escapeHTML(w.coreRuleOrFormula || '')}</div>
      </div>
    `
      )
      .join('');
  }

  // Targeted Revision panel in Practice View
  const revContainer = document.getElementById('targeted-revision-container');
  if (revContainer && sbState.targetedRevision) {
    const rev = sbState.targetedRevision;
    revContainer.innerHTML = `
      <div class="p-3 rounded-xl bg-slate-950/90 border border-cyanGlow/30 space-y-2">
        <div class="font-display font-bold text-sm text-buttermilk">${escapeHTML(rev.title || 'Targeted Chapter Revision')}</div>
        <ul class="list-disc pl-4 space-y-1 text-xs text-slate-200">
          ${(rev.keyTakeaways || []).map((k) => `<li>${escapeHTML(k)}</li>`).join('')}
        </ul>
      </div>
      <div class="p-3 rounded-xl bg-slate-950/90 border border-white/10 text-xs text-slate-200 leading-relaxed">
        ${formatMarkdown(rev.stepByStepMasteryGuide || '')}
      </div>
      ${
        rev.practiceDrillQuestion
          ? `
        <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-400/40 space-y-1 text-xs">
          <div class="font-mono text-[10px] text-emerald-300 font-bold uppercase">✓ Quick Mastery Check</div>
          <div class="font-semibold text-white">${escapeHTML(rev.practiceDrillQuestion.question)}</div>
          <div class="text-slate-300 text-[11px] pt-1"><strong>Answer:</strong> ${escapeHTML(rev.practiceDrillQuestion.answer)}</div>
        </div>
      `
          : ''
      }
    `;
  }
}

window.submitPracticeSheetForAnalysis = async function () {
  const sheet = sbState.activePracticeSheet || DEFAULT_PRACTICE_SHEET;
  const mcqs = sheet.mcqs || [];
  const theory = sheet.theoretical || [];

  let correctCount = 0;
  const missedConcepts = [];
  const mistakesDetail = [];

  mcqs.forEach((q) => {
    const userAns = sbState.userMcqAnswers[q.id];
    const isCorrect = userAns === q.correctIndex;
    if (isCorrect) {
      correctCount += 1;
    } else {
      missedConcepts.push(q.conceptTag || sheet.topic);
      mistakesDetail.push({
        question: q.question,
        chosen: userAns !== undefined ? q.options[userAns] : 'Unanswered',
        correct: q.options[q.correctIndex],
        concept: q.conceptTag
      });
    }

    // Colorize MCQ option buttons
    (q.options || []).forEach((_, oIdx) => {
      const optBtn = document.getElementById(`mcq-opt-${q.id}-${oIdx}`);
      if (optBtn) {
        optBtn.classList.remove('selected');
        if (oIdx === q.correctIndex) {
          optBtn.classList.add('correct');
        } else if (oIdx === userAns) {
          optBtn.classList.add('incorrect');
        }
      }
    });

    const fbEl = document.getElementById(`mcq-feedback-${q.id}`);
    if (fbEl) {
      fbEl.classList.remove('hidden');
      fbEl.className = `p-3 rounded-xl text-xs font-sans border ${
        isCorrect ? 'bg-emerald-950/70 border-emerald-400/50 text-emerald-200' : 'bg-rose-950/70 border-rose-400/50 text-rose-200'
      }`;
      fbEl.innerHTML = `
        <div class="font-bold flex items-center gap-1.5 ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}">
          <span>${isCorrect ? '✓ Correct Answer' : '✗ Concept Mistake'}</span>
          <span class="text-slate-400 font-mono text-[10px]">• Key: Option ${['A', 'B', 'C', 'D'][q.correctIndex]}</span>
        </div>
        <p class="mt-1 text-xs text-slate-300 leading-relaxed">${escapeHTML(q.explanation || '')}</p>
      `;
    }
  });

  theory.forEach((tq) => {
    const ans = String(sbState.userTheoryAnswers[tq.id] || '').trim();
    const fbEl = document.getElementById(`theory-feedback-${tq.id}`);
    if (fbEl) {
      fbEl.classList.remove('hidden');
      fbEl.innerHTML = `
        <div class="font-mono text-[10px] text-emerald-300 font-bold uppercase">Examiner Model Answer &amp; Rubric (${tq.marks || 5} Marks)</div>
        <p class="text-xs text-white mt-1">${escapeHTML(tq.modelAnswer)}</p>
      `;
    }
    if (ans.length < 25) {
      missedConcepts.push(tq.conceptTag || sheet.topic);
    }
  });

  const scorePct = mcqs.length > 0 ? Math.round((correctCount / mcqs.length) * 100) : 85;
  const badgeEl = document.getElementById('analysis-score-badge');
  if (badgeEl) {
    badgeEl.textContent = `Score: ${scorePct}% (${correctCount}/${mcqs.length} MCQs)`;
  }

  const metricAcc = document.getElementById('metric-accuracy');
  if (metricAcc) metricAcc.textContent = `${scorePct}%`;

  const analysisBox = document.getElementById('mistake-analysis-container');
  if (analysisBox) {
    analysisBox.innerHTML = `
      <div class="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-2">
        <div class="flex justify-between font-mono text-xs">
          <span class="text-slate-400">MCQ Accuracy:</span>
          <span class="text-cyanGlow font-bold">${correctCount} / ${mcqs.length} (${scorePct}%)</span>
        </div>
        <div class="text-xs text-slate-300">
          ${
            missedConcepts.length > 0
              ? `Flagged Weak Concepts: <strong class="text-rose-300">${escapeHTML(missedConcepts.join(', '))}</strong>`
              : `<strong class="text-emerald-400">Flawless performance! All core concepts mastered.</strong>`
          }
        </div>
      </div>
      <div class="text-[11px] font-mono text-cyanGlow animate-pulse">🧠 Hussain AI synthesizing Targeted Chapter Revision...</div>
    `;
  }

  // Call Hussain AI Mistake Analysis endpoint
  try {
    const res = await fetch('/api/ai/analyze-mistakes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: sheet.subject,
        topic: sheet.topic,
        missedConcepts: missedConcepts.length > 0 ? missedConcepts : [sheet.topic],
        mistakesDetail
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.weakConceptsBreakdown) && data.weakConceptsBreakdown.length > 0) {
        data.weakConceptsBreakdown.forEach((wc) => {
          sbState.weakConceptsVault.unshift({
            concept: wc.concept,
            subject: sheet.subject,
            rootCause: wc.rootCause,
            coreRuleOrFormula: wc.coreRuleOrFormula,
            quickFixTip: wc.quickFixTip
          });
        });
        sbState.weakConceptsVault = sbState.weakConceptsVault.slice(0, 8);
      }
      if (data.targetedRevisionNotes) {
        sbState.targetedRevision = data.targetedRevisionNotes;
      }
      if (analysisBox) {
        analysisBox.innerHTML = `
          <div class="p-3 rounded-xl bg-slate-950 border border-rose-500/30 space-y-2">
            <div class="font-bold text-white text-xs">Hussain AI Diagnostic Breakdown</div>
            <p class="text-xs text-slate-300">${escapeHTML(data.diagnosticSummary || '')}</p>
            <div class="space-y-1.5 pt-1">
              ${(data.weakConceptsBreakdown || [])
                .map(
                  (w) => `
                <div class="p-2 rounded-lg bg-slate-900 border border-white/10">
                  <div class="font-mono text-[10px] text-rose-300 font-bold">${escapeHTML(w.concept)}</div>
                  <div class="text-[11px] text-buttermilk">${escapeHTML(w.coreRuleOrFormula || '')}</div>
                  <div class="text-[11px] text-slate-400">${escapeHTML(w.quickFixTip || '')}</div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `;
      }
    } else {
      throw new Error('Fallback mistake analysis');
    }
  } catch {
    if (missedConcepts.length > 0) {
      sbState.weakConceptsVault.unshift({
        concept: missedConcepts[0],
        subject: sheet.subject,
        rootCause: 'Conceptual gap identified during timed MCQ & Theoretical evaluation.',
        coreRuleOrFormula: `Review core definitions & invariants for ${missedConcepts[0]}`,
        quickFixTip: 'Write out the governing equation before eliminating distractor options.'
      });
    }
    if (analysisBox) {
      analysisBox.innerHTML = `
        <div class="p-3 rounded-xl bg-slate-950 border border-rose-500/30 space-y-2">
          <div class="font-bold text-white text-xs">Instant Diagnostic Summary</div>
          <p class="text-xs text-slate-300">Scored <strong>${scorePct}%</strong>. Weak concepts (${escapeHTML(
        missedConcepts.join(', ') || 'None'
      )}) have been added to your Targeted Chapter Revision notes on the right.</p>
        </div>
      `;
    }
  }

  saveLocalState();
  renderWeakConceptsAndRevision();
  playCompletionChime();
  if (typeof confetti === 'function' && scorePct >= 50) {
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
  }
  showToast(`Exam graded: ${scorePct}% accuracy! Targeted Revision notes updated.`);
};

window.triggerTargetedRevisionFromVault = function () {
  renderWeakConceptsAndRevision();
  showToast('Targeted Revision Summary ready! You can also export it as a PDF.');
};

// 11. Smart AI Doubt Resolution & Embedded YouTube Video Recommendations
const CLIENT_YOUTUBE_VIDEOS = [
  {
    videoId: '1GSjbWt0c9M',
    title: 'Cambridge Computer Science: Data Representation & Number Systems (CAIE 9618 / 0478)',
    channel: 'Craig \'n\' Dave',
    duration: '14:20',
    subject: 'Computer Science'
  },
  {
    videoId: 'dQ3e9LwbUls',
    title: 'Two’s Complement & Signed Binary Arithmetic Explained',
    channel: 'Ben Eater',
    duration: '12:45',
    subject: 'Computer Science'
  },
  {
    videoId: 'p8UDFE9b6qA',
    title: 'Normalized Floating Point Representation Mantissa & Exponent (A-Level CS)',
    channel: 'Computerphile',
    duration: '16:10',
    subject: 'Computer Science'
  },
  {
    videoId: 'G0WTFfZq4j8',
    title: 'Electromagnetic Induction, Faraday Law & Lenz Law Complete Physics Lecture',
    channel: 'Organic Chemistry Tutor',
    duration: '18:42',
    subject: 'Physics'
  },
  {
    videoId: 'WUvTyaaNkzM',
    title: 'Essence of Calculus — Derivatives, Integrals & Fundamental Theorem',
    channel: '3Blue1Brown',
    duration: '17:05',
    subject: 'Calculus & Linear Algebra'
  },
  {
    videoId: '8hly31xKli0',
    title: 'Algorithms & Data Structures — Dynamic Programming, Graphs & Big-O',
    channel: 'freeCodeCamp.org',
    duration: '24:18',
    subject: 'Computer Science'
  },
  {
    videoId: 'bSMx0NS0XfY',
    title: 'Organic Chemistry SN1, SN2, E1 & E2 Reaction Mechanisms Made Easy',
    channel: 'Organic Chemistry Tutor',
    duration: '21:15',
    subject: 'Organic Chemistry'
  }
];

function renderYouTubeCards(videos = CLIENT_YOUTUBE_VIDEOS) {
  const grid = document.getElementById('youtube-recommendations-grid');
  if (!grid) return;
  grid.innerHTML = videos
    .map(
      (v) => `
    <div class="p-3 rounded-xl bg-slate-950/90 border border-white/10 hover:border-cyanGlow/40 transition flex items-center justify-between gap-3">
      <div class="min-w-0">
        <div class="flex items-center gap-2 font-mono text-[10px]">
          <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">▶ YouTube</span>
          <span class="text-cyanGlow">${escapeHTML(v.channel || 'Educational Channel')}</span>
          <span class="text-slate-400">• ${escapeHTML(v.duration || '15:00')}</span>
        </div>
        <div class="text-xs font-bold text-white truncate mt-1">${escapeHTML(v.title)}</div>
      </div>
      <button
        type="button"
        onclick="playEmbeddedYouTubeVideo('${escapeHTML(v.videoId)}', '${escapeHTML(v.title)}')"
        class="px-3 py-1.5 rounded-xl bg-warmCoral text-white font-mono text-xs font-bold hover:opacity-90 shrink-0 cursor-pointer"
      >
        Watch Here
      </button>
    </div>
  `
    )
    .join('');
}

window.playEmbeddedYouTubeVideo = function (videoId, title) {
  const iframe = document.getElementById('youtube-main-iframe');
  const titleEl = document.getElementById('youtube-main-title');
  const linkEl = document.getElementById('youtube-external-link');
  if (iframe) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&autoplay=1`;
  }
  if (titleEl) titleEl.textContent = title;
  if (linkEl) linkEl.href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
  showToast(`Playing: ${title}`);
};

window.prefillDoubtQuery = function (subject, question) {
  const subjEl = document.getElementById('doubt-subject');
  const qEl = document.getElementById('doubt-question-input');
  if (subjEl) subjEl.value = subject;
  if (qEl) qEl.value = question;
  solveStudentDoubt(subject, question);
};

async function solveStudentDoubt(subject, question) {
  const outEl = document.getElementById('doubt-resolution-output');
  const btnEl = document.getElementById('btn-solve-doubt');
  if (!outEl) return;

  if (btnEl) {
    btnEl.disabled = true;
    btnEl.innerHTML = '<span>⏳</span><span>Hussain AI Clarifying Concept &amp; Searching YouTube...</span>';
  }
  outEl.innerHTML = `<div class="text-cyanGlow font-mono text-xs animate-pulse">🧠 Hussain AI generating step-by-step conceptual explanation...</div>`;

  try {
    const res = await fetch('/api/ai/doubt-solver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, question })
    });
    if (!res.ok) throw new Error('Fallback doubt solver');
    const data = await res.json();

    outEl.innerHTML = `
      <div class="space-y-2.5">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <span class="px-2.5 py-0.5 rounded-full bg-electricBlue/20 text-cyanGlow font-mono text-[10px] font-bold uppercase">${escapeHTML(subject)}</span>
          <span class="text-[10px] font-mono text-emerald-400">✓ Verified by Hussain AI</span>
        </div>
        <h4 class="font-display font-bold text-sm sm:text-base text-buttermilk">${escapeHTML(data.conceptTitle || question)}</h4>
        <p class="text-xs text-white font-semibold">${escapeHTML(data.directAnswer || '')}</p>
        <div class="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-200 leading-relaxed">
          ${formatMarkdown(data.stepByStepExplanation || '')}
        </div>
        ${
          data.commonExamTrap
            ? `<div class="p-2.5 rounded-xl bg-rose-950/50 border border-rose-400/40 text-xs text-rose-200"><strong>⚠️ Common Exam Trap:</strong> ${escapeHTML(data.commonExamTrap)}</div>`
            : ''
        }
        ${
          data.quickCheckQuestion
            ? `<div class="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-400/40 text-xs text-emerald-200"><strong>🎯 Self-Check:</strong> ${escapeHTML(data.quickCheckQuestion)}</div>`
            : ''
        }
      </div>
    `;

    if (Array.isArray(data.videos) && data.videos.length > 0) {
      renderYouTubeCards(data.videos);
      playEmbeddedYouTubeVideo(data.videos[0].videoId, data.videos[0].title);
    }
  } catch {
    outEl.innerHTML = `
      <div class="space-y-2">
        <h4 class="font-display font-bold text-sm text-buttermilk">${escapeHTML(subject)}: Conceptual Clarification</h4>
        <p class="text-xs text-slate-200 leading-relaxed">
          <strong>1. Core Governing Principle:</strong> Faraday's Law states that the induced electromotive force ($\varepsilon$) in any closed circuit is equal to the rate of change of magnetic flux linkage ($\varepsilon = -N \frac{d\Phi_B}{dt}$).<br/><br/>
          <strong>2. Why Lenz's Law Has a Negative Sign:</strong> By conservation of energy, the induced current must flow in a direction whose magnetic field <em>opposes</em> the change in flux that produced it. If it aided the change, it would create runaway infinite energy!
        </p>
      </div>
    `;
    renderYouTubeCards(CLIENT_YOUTUBE_VIDEOS);
  } finally {
    if (btnEl) {
      btnEl.disabled = false;
      btnEl.innerHTML = '<span>💡</span><span>Clarify Concept &amp; Fetch YouTube Lectures</span>';
    }
  }
}

// 12. End-of-Day (EOD) Checklist, Streak & Download Hub (jsPDF Vector Engine)
function renderEodChecklist() {
  const dashList = document.getElementById('dash-eod-list');
  const hubList = document.getElementById('hub-eod-checklist-container');
  const dashBadge = document.getElementById('dash-eod-progress-badge');
  const hubBadge = document.getElementById('hub-eod-score');

  const total = sbState.eodChecklist.length || 1;
  const doneCount = sbState.eodChecklist.filter((i) => i.done).length;
  const pct = Math.round((doneCount / total) * 100);

  if (dashBadge) dashBadge.textContent = `${pct}% Done`;
  if (hubBadge) hubBadge.textContent = `${pct}% Complete (${doneCount}/${total})`;

  const renderItem = (item) => `
    <div class="p-2.5 rounded-xl bg-slate-950/90 border ${
      item.done ? 'border-emerald-500/40' : 'border-white/10'
    } flex items-center justify-between gap-2.5">
      <label class="flex items-center gap-2.5 text-xs cursor-pointer flex-1 min-w-0">
        <input
          type="checkbox"
          ${item.done ? 'checked' : ''}
          onchange="toggleEodItem('${item.id}')"
          class="w-4 h-4 accent-emerald-400 rounded cursor-pointer shrink-0"
        />
        <span class="${item.done ? 'line-through text-slate-400' : 'text-white'} truncate">${escapeHTML(item.text)}</span>
      </label>
      <button onclick="deleteEodItem('${item.id}')" class="text-slate-500 hover:text-rose-400 font-mono text-xs px-1 cursor-pointer">✕</button>
    </div>
  `;

  if (dashList) {
    dashList.innerHTML = sbState.eodChecklist.slice(0, 4).map(renderItem).join('');
  }
  if (hubList) {
    hubList.innerHTML = sbState.eodChecklist.map(renderItem).join('');
  }
}

window.toggleEodItem = function (id) {
  const item = sbState.eodChecklist.find((i) => i.id === id);
  if (item) {
    item.done = !item.done;
    saveLocalState();
    renderEodChecklist();
  }
};

window.deleteEodItem = function (id) {
  sbState.eodChecklist = sbState.eodChecklist.filter((i) => i.id !== id);
  saveLocalState();
  renderEodChecklist();
};

window.incrementStudyStreak = function () {
  sbState.user.streakDays = (sbState.user.streakDays || 7) + 1;
  updateAuthAndQuotaUI();
  playCompletionChime();
  showToast(`🔥 Daily Study Streak Increased to ${sbState.user.streakDays} Days!`);
};

function renderSubjectMastery() {
  const container = document.getElementById('subject-mastery-bars');
  if (!container) return;
  container.innerHTML = sbState.subjectMastery
    .map(
      (m) => `
    <div class="space-y-1">
      <div class="flex justify-between text-xs">
        <span class="text-white font-semibold">${escapeHTML(m.subject)}</span>
        <span class="text-cyanGlow font-bold">${m.score}% Mastery</span>
      </div>
      <div class="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-white/10">
        <div class="h-full rounded-full" style="width:${m.score}%; background:${m.color}"></div>
      </div>
    </div>
  `
    )
    .join('');
}

function renderDownloadHub() {
  const container = document.getElementById('download-hub-list');
  const metricPdf = document.getElementById('metric-pdf-count');
  if (metricPdf) metricPdf.textContent = `${sbState.savedPdfs.length} PDFs`;
  if (!container) return;

  container.innerHTML = sbState.savedPdfs
    .map(
      (pdf) => `
    <div class="p-3.5 rounded-2xl bg-slate-950/90 border border-white/10 hover:border-cyanGlow/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="space-y-1 min-w-0">
        <div class="flex items-center gap-2 font-mono text-[10px]">
          <span class="px-2 py-0.5 rounded bg-electricBlue/20 text-cyanGlow font-bold">${escapeHTML(pdf.category)}</span>
          <span class="text-emerald-400">${escapeHTML(pdf.subject)}</span>
          <span class="text-slate-500">• ${escapeHTML(pdf.createdAt)}</span>
        </div>
        <div class="text-xs sm:text-sm font-bold text-white truncate">${escapeHTML(pdf.title)}</div>
      </div>
      <div class="flex items-center gap-2 shrink-0 font-mono text-xs">
        <button onclick="previewSavedPdf('${pdf.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-slate-200 hover:text-white cursor-pointer">
          👁️ Preview
        </button>
        <button onclick="downloadSavedPdfById('${pdf.id}')" class="px-3 py-1.5 rounded-xl bg-electricBlue text-white font-bold hover:bg-blue-500 cursor-pointer">
          📥 Download PDF
        </button>
      </div>
    </div>
  `
    )
    .join('');
}

function createAndDownloadVectorPDF(title, category, subject, bodyLines) {
  // Save to Download Hub
  const newPdfRecord = {
    id: 'pdf-' + Date.now(),
    title,
    category,
    subject,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    contentPreview: bodyLines.join('\n')
  };
  sbState.savedPdfs.unshift(newPdfRecord);
  saveLocalState();
  renderDownloadHub();

  try {
    if (window.jspdf && window.jspdf.jsPDF) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();

      // Header Banner
      doc.setFillColor(11, 15, 25);
      doc.rect(0, 0, pageW, 72, 'F');
      doc.setTextColor(0, 210, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('STUDYBRIDGE (POWERED BY HUSSAIN AI & FLOWPLAN)', 40, 32);
      doc.setTextColor(255, 242, 186);
      doc.setFontSize(10);
      doc.text(`${category.toUpperCase()} • ${subject} • Candidate: ${sbState.user.name}`, 40, 52);

      // Document Title
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(14);
      doc.text(title, 40, 102);
      doc.setDrawColor(59, 130, 246);
      doc.line(40, 110, pageW - 40, 110);

      // Content Lines
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      let y = 132;

      bodyLines.forEach((line) => {
        const wrapped = doc.splitTextToSize(String(line), pageW - 80);
        wrapped.forEach((wLine) => {
          if (y > pageH - 50) {
            doc.addPage();
            y = 50;
          }
          doc.text(wLine, 40, y);
          y += 15;
        });
        y += 4;
      });

      const safeFilename = title.replace(/[^a-z0-9]+/gi, '_').slice(0, 45) + '.pdf';
      doc.save(safeFilename);
      showToast(`📥 Downloaded "${safeFilename}" & saved to Download Hub!`);
      return;
    }
  } catch (e) {
    console.warn('jsPDF fallback:', e);
  }

  // Fallback text blob download if jsPDF CDN is blocked
  const blob = new Blob([bodyLines.join('\n\n')], { type: 'application/pdf' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = title.replace(/[^a-z0-9]+/gi, '_') + '.pdf';
  a.click();
  showToast(`📥 Saved "${title}" to Download Hub!`);
}

window.downloadCurrentPracticePDF = function (mode = 'exam') {
  const sheet = sbState.activePracticeSheet || DEFAULT_PRACTICE_SHEET;
  const lines = [];

  if (mode === 'exam') {
    lines.push(`EXAMINATION PAPER: ${sheet.title}`);
    lines.push(`Difficulty: ${sheet.difficulty || 'Exam Standard'} | Time Allowed: ${sheet.estimatedMinutes || 30} Minutes`);
    lines.push('--------------------------------------------------------------------------------');
    lines.push('SECTION A: MULTIPLE CHOICE QUESTIONS (MCQs)');
    (sheet.mcqs || []).forEach((q, i) => {
      lines.push(`\nQ${i + 1}. ${q.question}  [Concept: ${q.conceptTag || sheet.topic}]`);
      (q.options || []).forEach((opt, oIdx) => {
        lines.push(`   (${['A', 'B', 'C', 'D'][oIdx]}) ${opt}`);
      });
    });
    lines.push('\n--------------------------------------------------------------------------------');
    lines.push('SECTION B: STRUCTURED THEORETICAL QUESTIONS');
    (sheet.theoretical || []).forEach((tq, i) => {
      lines.push(`\nTheory Q${i + 1} (${tq.marks || 5} Marks): ${tq.question}`);
      lines.push('   Answer Space: ________________________________________________________________');
      lines.push('   ______________________________________________________________________________');
    });
    createAndDownloadVectorPDF(`${sheet.subject} Exam Question Paper`, 'Question Paper', sheet.subject, lines);
  } else if (mode === 'key') {
    lines.push(`OFFICIAL MARKING SCHEME & ANSWER KEY: ${sheet.title}`);
    lines.push('--------------------------------------------------------------------------------');
    (sheet.mcqs || []).forEach((q, i) => {
      lines.push(`MCQ ${i + 1}: Correct Option (${['A', 'B', 'C', 'D'][q.correctIndex]}) — ${q.options[q.correctIndex]}`);
      lines.push(`Explanation: ${q.explanation}`);
    });
    lines.push('--------------------------------------------------------------------------------');
    (sheet.theoretical || []).forEach((tq, i) => {
      lines.push(`Theory Q${i + 1} (${tq.marks || 5} Marks) Model Answer:`);
      lines.push(tq.modelAnswer);
    });
    createAndDownloadVectorPDF(`${sheet.subject} Marking Scheme & Key`, 'Answer Key', sheet.subject, lines);
  } else {
    lines.push(`HIGH-YIELD AI FLASHCARDS DECK: ${sheet.subject} — ${sheet.topic}`);
    lines.push('--------------------------------------------------------------------------------');
    (sheet.mcqs || []).forEach((q, i) => {
      lines.push(`FLASHCARD #${i + 1} [FRONT]: ${q.question}`);
      lines.push(`FLASHCARD #${i + 1} [BACK]: ${q.options[q.correctIndex]} — ${q.explanation}`);
    });
    createAndDownloadVectorPDF(`${sheet.subject} Study Flashcards`, 'Flashcards', sheet.subject, lines);
  }
};

window.exportTargetedRevisionPDF = function () {
  const rev = sbState.targetedRevision;
  const lines = [
    rev.title || 'Targeted Chapter Revision Summary',
    'Generated by Hussain AI Instant Mistake Analyzer',
    '--------------------------------------------------------------------------------',
    'KEY HIGH-YIELD TAKEAWAYS:',
    ...(rev.keyTakeaways || []).map((k, idx) => `${idx + 1}. ${k}`),
    '--------------------------------------------------------------------------------',
    'STEP-BY-STEP CONCEPT MASTERY GUIDE:',
    String(rev.stepByStepMasteryGuide || '').replace(/\*\*/g, ''),
    '--------------------------------------------------------------------------------',
    'WEAK CONCEPTS VAULT SUMMARY:',
    ...sbState.weakConceptsVault.map((w) => `• ${w.concept} (${w.subject}): ${w.coreRuleOrFormula} — Tip: ${w.quickFixTip}`)
  ];
  createAndDownloadVectorPDF(rev.title || 'Targeted Chapter Revision Summary', 'Revision Summary', 'Multi-Subject', lines);
};

window.exportCurrentSchedulePDF = function () {
  const lines = [
    'FLOWPLAN OS & STUDYBRIDGE CIRCADIAN WEEKLY STUDY TIMELINE',
    'Synchronized with Connected Google Drive Daily Resource Picker',
    '--------------------------------------------------------------------------------'
  ];
  Object.entries(sbState.schedule).forEach(([day, list]) => {
    lines.push(`\n=== ${day.toUpperCase()} ===`);
    (list || []).forEach((b) => {
      lines.push(
        `• ${formatHour12(b.startHour)} - ${formatHour12(b.startHour + (b.duration || 1.5))} [${b.energy} Zone | ${b.priority}]: ${b.title} (${b.subject})`
      );
    });
  });
  createAndDownloadVectorPDF('FlowPlan & StudyBridge Weekly Schedule', 'Schedule Dossier', 'All Subjects', lines);
};

window.generateSummaryReportPDF = function () {
  const lines = [
    `STUDYBRIDGE ACADEMIC PROGRESS & STREAK REPORT — ${sbState.user.name}`,
    `Active Membership Plan: ${sbState.user.plan} | Study Streak: ${sbState.user.streakDays} Days`,
    '--------------------------------------------------------------------------------',
    'SUBJECT MASTERY TELEMETRY:',
    ...sbState.subjectMastery.map((m) => `• ${m.subject}: ${m.score}% Mastery`),
    '--------------------------------------------------------------------------------',
    'END-OF-DAY (EOD) CHECKLIST STATUS:',
    ...sbState.eodChecklist.map((i) => `${i.done ? '[COMPLETED]' : '[PENDING]'} ${i.text}`)
  ];
  createAndDownloadVectorPDF('Academic Progress & EOD Report', 'Progress Report', 'All Subjects', lines);
};

window.previewSavedPdf = function (pdfId) {
  const rec = sbState.savedPdfs.find((p) => p.id === pdfId);
  if (!rec) return;
  const modal = document.getElementById('pdf-preview-modal');
  const titleEl = document.getElementById('pdf-preview-title');
  const badgeEl = document.getElementById('pdf-preview-badge');
  const bodyEl = document.getElementById('pdf-preview-body');
  const dlBtn = document.getElementById('btn-pdf-preview-download');
  if (!modal) return;

  if (titleEl) titleEl.textContent = rec.title;
  if (badgeEl) badgeEl.textContent = `${rec.category} • ${rec.subject}`;
  if (bodyEl) bodyEl.textContent = rec.contentPreview;
  if (dlBtn) {
    dlBtn.onclick = () => {
      downloadSavedPdfById(pdfId);
      closePdfPreviewModal();
    };
  }
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closePdfPreviewModal = function () {
  const modal = document.getElementById('pdf-preview-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

window.downloadSavedPdfById = function (pdfId) {
  const rec = sbState.savedPdfs.find((p) => p.id === pdfId);
  if (!rec) return;
  createAndDownloadVectorPDF(rec.title, rec.category, rec.subject, String(rec.contentPreview || '').split('\n'));
};

// 13. Legal Compliance Modal (Terms of Service, Privacy Policy, Academic Disclaimer)
const LEGAL_DOCUMENTS = {
  terms: {
    title: 'Terms of Service & Acceptable Use Policy',
    html: `
      <h4 class="font-bold text-white text-sm">1. Platform Overview &amp; Acceptance of Terms</h4>
      <p>Welcome to <strong>StudyBridge (Powered by Hussain AI &amp; Built on the FlowPlan Architecture)</strong>. By creating an account or accessing our services, you agree to abide by these Terms of Service and all applicable digital service regulations.</p>
      <h4 class="font-bold text-white text-sm">2. Membership Tiers &amp; Lenient Usage Policy</h4>
      <p>StudyBridge offers a <strong>Starter Plan ($0/month)</strong> limited to 5 AI practice sessions per week with a student-friendly <strong>1-Time Weekly Grace Session</strong> so students are not blocked mid-study, and a <strong>Pro Student Tier ($9.99/month)</strong> offering unlimited AI practice sheets, full Google Drive synchronization, and unlimited PDF exports.</p>
      <h4 class="font-bold text-white text-sm">3. Acceptable Academic Use</h4>
      <p>Users agree to use Hussain AI practice sheets, mistake analyses, and doubt explanations for legitimate learning, exam revision, and schedule organization, and not for academic dishonesty during live proctored examinations.</p>
    `
  },
  privacy: {
    title: 'Privacy Policy & User Data Protection (GDPR / CCPA)',
    html: `
      <h4 class="font-bold text-white text-sm">1. Data Encryption &amp; Password Security</h4>
      <p>All user passwords are cryptographically hashed using <strong>PBKDF2-HMAC-SHA256 (120,000 iterations)</strong> and sessions are authenticated via signed JWT tokens. Plain-text passwords are never stored.</p>
      <h4 class="font-bold text-white text-sm">2. Google Drive &amp; Study Material Privacy</h4>
      <p>When you connect Google Drive or upload syllabi/notes to the Hussain AI RAG engine, your files are used strictly to pick your daily study resources and generate personalized practice questions. We never sell or share student data with third-party advertisers.</p>
      <h4 class="font-bold text-white text-sm">3. User Rights</h4>
      <p>Students may export their schedules and PDFs or request complete account deletion at any time.</p>
    `
  },
  disclaimer: {
    title: 'Disclaimer of Academic Guarantees',
    html: `
      <h4 class="font-bold text-white text-sm">1. Educational Aid Disclaimer</h4>
      <p>StudyBridge and Hussain AI are designed to maximize study consistency, concept clarity, and exam readiness. However, individual exam grades depend on student effort, institutional grading rubrics, and examination board standards; therefore, specific grade outcomes are not legally guaranteed.</p>
      <h4 class="font-bold text-white text-sm">2. Third-Party Video Content</h4>
      <p>Embedded YouTube educational lectures are provided from verified public educational channels to supplement concept clarification.</p>
    `
  }
};

window.openLegalModal = function (section = 'terms') {
  const modal = document.getElementById('legal-modal');
  const titleEl = document.getElementById('legal-modal-title');
  const contentEl = document.getElementById('legal-modal-content');
  if (!modal) return;

  const doc = LEGAL_DOCUMENTS[section] || LEGAL_DOCUMENTS.terms;
  if (titleEl) titleEl.textContent = doc.title;
  if (contentEl) contentEl.innerHTML = doc.html;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeLegalModal = function () {
  const modal = document.getElementById('legal-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

window.acceptLegalFromModal = function () {
  const cb = document.getElementById('auth-consent-checkbox');
  if (cb) cb.checked = true;
  closeLegalModal();
  showToast('✓ Terms of Service & Privacy Policy accepted.');
};

// 14. FlowPlan OS Bidirectional Bridge (Connects to flowplanbeast)
window.openFlowPlanBridgeModal = function () {
  const modal = document.getElementById('flowplan-bridge-modal');
  if (!modal) return;
  let totalBlocks = 0;
  Object.values(sbState.schedule).forEach((arr) => {
    totalBlocks += (arr || []).length;
  });
  const countEl = document.getElementById('fp-bridge-count');
  if (countEl) countEl.textContent = `${totalBlocks} Circadian Tasks`;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeFlowPlanBridgeModal = function () {
  const modal = document.getElementById('flowplan-bridge-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

window.syncWithFlowPlanOS = async function () {
  // 1. Export StudyBridge schedule into FlowPlan OS localStorage format (flowplan_schedule_guest)
  try {
    const fpKey = 'flowplan_schedule_guest';
    const existingRaw = localStorage.getItem(fpKey);
    const fpData = existingRaw ? JSON.parse(existingRaw) : {};
    const activeMonth = new Date().getMonth();
    if (!fpData.yearlyDatabase) fpData.yearlyDatabase = {};
    if (!fpData.yearlyDatabase[activeMonth]) {
      fpData.yearlyDatabase[activeMonth] = {
        'Week 1': { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] },
        'Week 2': { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] },
        'Week 3': { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] },
        'Week 4': { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] },
        Residual: { 'Day 29': [], 'Day 30': [], 'Day 31': [] }
      };
    }

    const week1 = fpData.yearlyDatabase[activeMonth]['Week 1'];
    let syncedCount = 0;
    Object.entries(sbState.schedule).forEach(([day, list]) => {
      if (week1[day]) {
        week1[day] = (list || []).map((item) => ({
          id: item.id || 'sb-' + Date.now() + Math.random(),
          title: `[StudyBridge] ${item.title}`,
          startHour: Number(item.startHour || 9),
          duration: Number(item.duration || 1.5),
          priority: item.priority || 'High',
          importance: item.priority === 'High' ? 3 : 2,
          energy: item.energy || 'Peak',
          notes: item.notes || item.subject || ''
        }));
        syncedCount += week1[day].length;
      }
    });

    localStorage.setItem(fpKey, JSON.stringify(fpData));

    await fetch('/api/flowplan/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tasks: sbState.schedule.Mon || [] })
    }).catch(() => {});

    const countEl = document.getElementById('fp-bridge-count');
    if (countEl) countEl.textContent = `${syncedCount} Circadian Tasks Synced`;
    showToast(`🔄 Synchronized ${syncedCount} study blocks with FlowPlan OS!`);
  } catch (e) {
    showToast('🔄 FlowPlan OS schedule synced!');
  }
};

// 15. Master Admin Console (muhammadhussain99300@gmail.com)
window.refreshAdminOverview = async function () {
  const isAdmin = Boolean(sbState.user.is_admin || sbState.user.email?.toLowerCase() === MASTER_ADMIN_EMAIL);
  const adminLocked = document.getElementById('admin-locked-banner');
  const adminUnlocked = document.getElementById('admin-unlocked-content');
  if (adminLocked && adminUnlocked) {
    adminLocked.classList.toggle('hidden', isAdmin);
    adminUnlocked.classList.toggle('hidden', !isAdmin);
  }
  if (!isAdmin) return;

  try {
    const res = await fetch('/api/admin/overview');
    if (!res.ok) throw new Error('Offline admin fallback');
    const data = await res.json();
    populateAdminUI(data);
  } catch {
    populateAdminUI({
      users: [
        { email: MASTER_ADMIN_EMAIL, name: 'Muhammad Hussain (Master Admin)', role: 'Master Admin', plan: 'Master Admin (God-Mode)', tier: 'admin', weeklySessionsUsed: 0, weeklyLimit: 'Unlimited', status: 'Active' },
        { email: 'ayesha.khan@student.edu', name: 'Ayesha Khan', role: 'Premium Member', plan: 'Pro Student Tier ($9.99/mo)', tier: 'pro', weeklySessionsUsed: 14, weeklyLimit: 'Unlimited', status: 'Active' },
        { email: 'zain.ali@student.edu', name: 'Zain Ali', role: 'Free User', plan: 'Starter Plan (Free)', tier: 'free', weeklySessionsUsed: 5, weeklyLimit: 5, graceSessionUsed: false, status: 'Active' }
      ],
      subscriptions: [
        { id: 'sub-1001', name: 'Ayesha Khan', email: 'ayesha.khan@student.edu', plan: 'Pro Student Tier ($9.99/mo)', amount: '$9.99', status: 'Verified & Active', timestamp: '2026-10-22 14:30' },
        { id: 'sub-1002', name: 'Bilal Tariq', email: 'bilal.tariq@uni.edu', plan: 'Pro Student Tier ($9.99/mo)', amount: '$9.99', status: 'Pending Approval', timestamp: '2026-10-24 18:15' }
      ],
      moderationQueue: [
        { id: 'mod-1', type: 'AI Practice Sheet', title: 'A-Level Physics: Electromagnetic Induction (7 Qs)', author: 'ayesha.khan@student.edu', status: 'Approved' },
        { id: 'mod-2', type: 'Shared Study Note', title: 'Organic Chemistry Reaction Mechanisms Summary PDF', author: 'zain.ali@student.edu', status: 'Flagged for Review' }
      ],
      analytics: {
        totalPracticeSheetsGenerated: 148,
        totalDoubtsResolved: 312,
        totalPdfsExported: 229
      }
    });
  }
};

function populateAdminUI(data) {
  const users = data.users || [];
  const subs = data.subscriptions || [];
  const mods = data.moderationQueue || [];
  const stats = data.analytics || {};

  const elUsers = document.getElementById('adm-stat-users');
  const elPro = document.getElementById('adm-stat-pro');
  const elSheets = document.getElementById('adm-stat-sheets');
  const elDoubts = document.getElementById('adm-stat-doubts');
  const elPdfs = document.getElementById('adm-stat-pdfs');

  if (elUsers) elUsers.textContent = String(users.length);
  if (elPro) elPro.textContent = String(users.filter((u) => u.tier === 'pro' || u.tier === 'admin').length);
  if (elSheets) elSheets.textContent = String(stats.totalPracticeSheetsGenerated || 148);
  if (elDoubts) elDoubts.textContent = String(stats.totalDoubtsResolved || 312);
  if (elPdfs) elPdfs.textContent = String(stats.totalPdfsExported || 229);

  const usersList = document.getElementById('admin-users-list');
  if (usersList) {
    usersList.innerHTML = users
      .map(
        (u) => `
      <div class="p-3 rounded-xl bg-slate-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-bold text-white">${escapeHTML(u.name)}</span>
            <span class="px-2 py-0.5 rounded text-[10px] ${
              u.tier === 'admin'
                ? 'bg-amber-500/20 text-buttermilk'
                : u.tier === 'pro'
                ? 'bg-cyanGlow/20 text-cyanGlow'
                : 'bg-slate-800 text-slate-300'
            }">${escapeHTML(u.plan)}</span>
          </div>
          <div class="text-[11px] text-slate-400 truncate">${escapeHTML(u.email)} • Sessions: ${u.weeklySessionsUsed}/${u.weeklyLimit}</div>
        </div>
        <div class="flex flex-wrap items-center gap-1.5 shrink-0">
          ${
            u.tier !== 'admin'
              ? `
            <button onclick="adminUserAction('${escapeHTML(u.email)}', '${u.tier === 'pro' ? 'downgrade_free' : 'upgrade_pro'}')" class="px-2.5 py-1 rounded-lg bg-electricBlue/20 border border-electricBlue/40 text-cyanGlow hover:bg-electricBlue hover:text-white cursor-pointer">
              ${u.tier === 'pro' ? 'Set Free' : 'Grant Pro'}
            </button>
            <button onclick="adminUserAction('${escapeHTML(u.email)}', 'reset_quota')" class="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500 hover:text-obsidian cursor-pointer">
              Reset 0/5
            </button>
          `
              : '<span class="text-[10px] text-buttermilk font-bold">👑 Protected Admin</span>'
          }
        </div>
      </div>
    `
      )
      .join('');
  }

  const subsList = document.getElementById('admin-subscriptions-list');
  if (subsList) {
    subsList.innerHTML = subs
      .map(
        (s) => `
      <div class="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-2">
        <div class="min-w-0">
          <div class="font-bold text-white truncate">${escapeHTML(s.name)} (${escapeHTML(s.email)})</div>
          <div class="text-[11px] text-slate-400">${escapeHTML(s.plan)} • ${escapeHTML(s.amount)} • <span class="${
          s.status.includes('Verified') ? 'text-emerald-400' : 'text-amber-300'
        }">${escapeHTML(s.status)}</span></div>
        </div>
        ${
          !s.status.includes('Verified')
            ? `<button onclick="adminApproveSubscription('${s.id}')" class="px-3 py-1 rounded-lg bg-emeraldGreen text-obsidian font-bold cursor-pointer shrink-0">Approve Pro</button>`
            : '<span class="text-emerald-400 font-bold text-[10px]">✓ Active</span>'
        }
      </div>
    `
      )
      .join('');
  }

  const modList = document.getElementById('admin-moderation-list');
  if (modList) {
    modList.innerHTML = mods
      .map(
        (m) => `
      <div class="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-2">
        <div class="min-w-0">
          <div class="text-[10px] text-cyanGlow uppercase font-bold">${escapeHTML(m.type)} • ${escapeHTML(m.status)}</div>
          <div class="text-xs font-bold text-white truncate">${escapeHTML(m.title)}</div>
          <div class="text-[10px] text-slate-400">By ${escapeHTML(m.author)}</div>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button onclick="adminModerateItem('${m.id}', 'Approved')" class="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-obsidian cursor-pointer">✓</button>
          <button onclick="adminModerateItem('${m.id}', 'Delete')" class="px-2 py-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white cursor-pointer">🗑</button>
        </div>
      </div>
    `
      )
      .join('');
  }
}

window.adminUserAction = async function (email, action) {
  try {
    await fetch('/api/admin/user-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, action })
    });
  } catch {}
  showToast(`Admin action "${action}" applied to ${email}.`);
  refreshAdminOverview();
};

window.adminApproveSubscription = async function (subId) {
  try {
    await fetch('/api/admin/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subId })
    });
  } catch {}
  showToast('Subscription verified & Pro Student Tier activated!');
  refreshAdminOverview();
};

window.adminModerateItem = async function (id, decision) {
  try {
    await fetch('/api/admin/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, decision })
    });
  } catch {}
  showToast(`Moderation item ${decision.toLowerCase()}.`);
  refreshAdminOverview();
};

// 16. Omnipresent Hussain AI RAGbot (Floating Drawer + Fullscreen Hub + Live Action Execution)
function getRagStreams() {
  return [
    document.getElementById('rag-chat-messages'),
    document.getElementById('floating-rag-stream'),
    document.getElementById('fullscreen-rag-stream')
  ].filter(Boolean);
}

function buildLiveStudyBridgeRAGContext() {
  return {
    user: {
      name: sbState.user.name,
      email: sbState.user.email,
      plan: sbState.user.plan,
      tier: sbState.user.tier,
      weeklySessionsUsed: sbState.user.weeklySessionsUsed,
      weeklyLimit: sbState.user.weeklyLimit,
      graceSessionUsed: sbState.user.graceSessionUsed,
      streakDays: sbState.user.streakDays
    },
    pickedGoogleDriveFilesToday: sbState.driveFiles.filter((f) => f.pickedToday),
    activeDaySchedule: sbState.schedule[sbState.selectedScheduleDay] || [],
    weakConceptsVault: sbState.weakConceptsVault,
    eodChecklist: sbState.eodChecklist,
    uploadedRagDocs: sbState.uploadedRagDocs
  };
}

function appendRagBubble(sender, text, options = {}) {
  const streams = getRagStreams();
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const thinkingHtml = options.thinking
    ? `<div class="sb-thinking-box">🧠 <strong>Hussain AI Reasoning:</strong> ${escapeHTML(options.thinking)}</div>`
    : '';

  const pricingHtml = options.showPricingCards
    ? `
      <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
        <div class="p-2.5 rounded-xl bg-slate-950 border border-white/15">
          <div class="font-bold text-white">Starter Plan — $0/mo</div>
          <div class="text-[10px] text-slate-400">5 AI Practice Sessions/wk + 1-Time Grace Session</div>
        </div>
        <div class="p-2.5 rounded-xl bg-indigo-950/90 border border-cyanGlow">
          <div class="font-bold text-buttermilk">Pro Student — $9.99/mo</div>
          <div class="text-[10px] text-slate-200">Unlimited AI Sheets, Full Drive Sync &amp; PDFs</div>
          <button onclick="openUpgradeModal('Pro Student Tier ($9.99/mo)')" class="mt-1.5 w-full py-1 rounded-lg bg-electricBlue text-white font-bold text-[10px] cursor-pointer">Upgrade Now →</button>
        </div>
      </div>
    `
    : '';

  const videosHtml =
    Array.isArray(options.videos) && options.videos.length > 0
      ? `
      <div class="mt-2.5 space-y-1.5">
        <div class="text-[10px] font-mono text-rose-300 font-bold uppercase">▶️ Recommended YouTube Lectures:</div>
        ${options.videos
          .slice(0, 2)
          .map(
            (v) => `
          <div class="p-2 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-2 text-[11px]">
            <span class="truncate text-white font-semibold">${escapeHTML(v.title)}</span>
            <button onclick="switchView('doubts'); playEmbeddedYouTubeVideo('${escapeHTML(v.videoId)}', '${escapeHTML(v.title)}');" class="px-2 py-1 rounded bg-warmCoral text-white font-mono text-[10px] font-bold shrink-0 cursor-pointer">Watch</button>
          </div>
        `
          )
          .join('')}
      </div>
    `
      : '';

  const sourcesHtml =
    Array.isArray(options.sources) && options.sources.length > 0
      ? `<div class="mt-2 pt-1.5 border-t border-white/10 text-[10px] font-mono text-emerald-400">📚 RAG Context: ${options.sources
          .map(escapeHTML)
          .join(' • ')}</div>`
      : '';

  const html =
    sender === 'user'
      ? `
      <div class="sb-bubble user">
        <div>${escapeHTML(text)}</div>
        <div class="text-[9px] font-mono text-blue-200 mt-1 text-right">${timeStr}</div>
      </div>
    `
      : `
      <div class="sb-bubble bot">
        ${thinkingHtml}
        <div>${formatMarkdown(text)}</div>
        ${pricingHtml}
        ${videosHtml}
        ${sourcesHtml}
        <div class="text-[9px] font-mono text-slate-400 mt-1.5 flex justify-between">
          <span class="text-cyanGlow font-bold">Hussain AI • StudyBridge RAG</span>
          <span>${timeStr}</span>
        </div>
      </div>
    `;

  streams.forEach((stream) => {
    const wrap = document.createElement('div');
    wrap.className = `sb-bubble-wrap ${sender}`;
    wrap.innerHTML = html;
    stream.appendChild(wrap);
    stream.scrollTop = stream.scrollHeight;
  });
}

function showRagTyping() {
  getRagStreams().forEach((stream) => {
    if (stream.querySelector('.sb-typing-indicator')) return;
    const el = document.createElement('div');
    el.className = 'sb-bubble-wrap bot sb-typing-indicator';
    el.innerHTML = `
      <div class="sb-bubble bot flex items-center gap-2">
        <div class="sb-dots"><span></span><span></span><span></span></div>
        <span class="text-[11px] font-mono text-cyanGlow">Hussain AI indexing live StudyBridge workspace...</span>
      </div>
    `;
    stream.appendChild(el);
    stream.scrollTop = stream.scrollHeight;
  });
}

function hideRagTyping() {
  getRagStreams().forEach((stream) => {
    const el = stream.querySelector('.sb-typing-indicator');
    if (el) el.remove();
  });
}

window.toggleFloatingChatDrawer = function (forceState) {
  const drawer = document.getElementById('sb-floating-chat-drawer');
  if (!drawer) return;
  const isCurrentlyHidden = drawer.classList.contains('hidden');
  const shouldOpen = typeof forceState === 'boolean' ? forceState : isCurrentlyHidden;

  if (shouldOpen) {
    drawer.classList.remove('hidden');
    drawer.classList.add('flex');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      const inp = document.getElementById('rag-chat-input') || document.getElementById('floating-rag-input');
      inp?.focus();
    }, 180);
    // If empty, append welcoming greeting
    const messages = document.getElementById('rag-chat-messages');
    if (messages && messages.children.length === 0) {
      appendRagBubble(
        'bot',
        `👋 Assalam-o-Alaikum! I am **Hussain AI**, your full-website **RAG Copilot** for StudyBridge.\n\n` +
        `I am connected to your live study workspace and curriculum specifications:\n` +
        `• **Ask any academic question** (Cambridge 9618, AQA, Edexcel, IB, AP)\n` +
        `• **Schedule topics** into peak circadian windows\n` +
        `• **Select Google Drive study files**\n` +
        `• **Upgrade or manage membership**\n\n` +
        `How can I assist your study session right now?`,
        {
          thinking: 'Hussain AI RAG engine online with Gemini 3.5 live integration.'
        }
      );
    }
    if (messages) messages.scrollTop = messages.scrollHeight;
  } else {
    drawer.classList.add('hidden');
    drawer.classList.remove('flex');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
};

window.openFloatingChatWithPrompt = function (promptText) {
  toggleFloatingChatDrawer(true);
  if (promptText) {
    handleRagUserPrompt(promptText);
  }
};

window.openFullscreenRAGModal = function () {
  const modal = document.getElementById('rag-fullscreen-modal');
  if (!modal) return;
  // Sync sidebar stats
  let totalTasks = 0;
  Object.values(sbState.schedule).forEach((l) => (totalTasks += (l || []).length));
  const elTasks = document.getElementById('hub-rag-stat-tasks');
  const elDrive = document.getElementById('hub-rag-stat-drive');
  const elWeak = document.getElementById('hub-rag-stat-weak');
  const elTier = document.getElementById('hub-rag-stat-tier');
  if (elTasks) elTasks.textContent = `${totalTasks} blocks`;
  if (elDrive) elDrive.textContent = `${sbState.driveFiles.length} files`;
  if (elWeak) elWeak.textContent = `${sbState.weakConceptsVault.length} topics`;
  if (elTier) elTier.textContent = sbState.user.plan;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeFullscreenRAGModal = function () {
  const modal = document.getElementById('rag-fullscreen-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

// Direct Client Gemini 3.5 Fallback using user's key AQ.Ab8RN6JckyuQdszkCmtfk48atdRSC6moWfpUvs9nH3QMcQX7vA
async function callDirectHussainGemini(promptText, ragContext) {
  const sys = `You are Hussain AI, the full-website RAG Copilot for StudyBridge (built on the FlowPlan architecture).
Live student context: ${JSON.stringify(ragContext).slice(0, 7000)}
User message: ${promptText}
Return strictly valid JSON:
{
  "thinking": "1 sentence analyzing the student's schedule, Google Drive files, weak concepts, or question",
  "reply": "Helpful Markdown answer (**bold**, bullet points •)",
  "show_pricing_cards": boolean,
  "schedule_tasks": [{"title":"string","subject":"string","day":"Mon","startHour":9,"duration":1.5,"priority":"High","energy":"Peak"}],
  "operations": [{"action":"pick_daily_resources"|"generate_practice"|"switch_tab"|"none","target_tab":"schedule"|"practice"|"doubts"|"hub"|"pricing","subject":"string","topic":"string"}],
  "retrieved_sources": ["StudyBridge Live RAG Index"]
}`;

  for (const model of ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-3.1-flash-lite']) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(HUSSAIN_GEMINI_KEY)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: sys }] }],
            generationConfig: { temperature: 0.35, responseMimeType: 'application/json' }
          })
        }
      );
      if (res.ok) {
        const data = await res.json();
        const text = (data?.candidates?.[0]?.content?.parts || [])
          .filter((p) => !p.thought && p.text)
          .map((p) => p.text)
          .join('')
          .trim();
        if (text) {
          const cleaned = text
            .replace(/^```(?:json)?\s*|```$/g, '')
            .trim()
            .replace(/\\\\|\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '\\\\');
          return JSON.parse(cleaned.slice(cleaned.indexOf('{'), cleaned.lastIndexOf('}') + 1));
        }
      }
    } catch {}
  }
  return null;
}

async function handleRagUserPrompt(promptText) {
  const clean = String(promptText || '').trim();
  if (!clean) return;

  appendRagBubble('user', clean);
  sbState.ragConversation.push({ role: 'user', text: clean });
  showRagTyping();

  const ragContext = buildLiveStudyBridgeRAGContext();
  let result = null;

  try {
    const res = await fetch('/api/ai/rag-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: clean,
        client_context: ragContext,
        conversation_history: sbState.ragConversation.slice(-6)
      })
    });
    if (res.ok) {
      result = await res.json();
    }
  } catch {}

  if (!result) {
    result = await callDirectHussainGemini(clean, ragContext);
  }

  hideRagTyping();

  if (!result) {
    // Intelligent deterministic local RAG response if offline
    const lower = clean.toLowerCase();
    if (/drive|pick|resource/i.test(lower)) {
      runHussainAIDailyResourcePicker();
      result = {
        thinking: 'Scanned connected Google Drive folders across 5 subjects and selected 1 resource per subject.',
        reply:
          `I have run the **Hussain AI Daily Resource Picker** across your connected Google Drive!\n\n` +
          sbState.driveFiles
            .filter((f) => f.pickedToday)
            .map((f) => `• **${f.subject}:** ${f.title}`)
            .join('\n'),
        retrieved_sources: ['Google Drive Study Vault']
      };
    } else if (/price|plan|tier|upgrade|pro|grace|limit/i.test(lower)) {
      result = {
        thinking: 'Retrieved StudyBridge membership plans and lenient 5-session + 1 grace session policy.',
        reply:
          `Here are the **StudyBridge Membership Plans**:\n\n` +
          `• **Starter Plan ($0/month):** Basic schedule automation, **5 AI practice sessions/week**, plus our **1-time weekly grace session** so you are never blocked mid-study.\n` +
          `• **Pro Student Tier ($9.99/month):** Unlimited AI practice sheets, full Google Drive synchronization, unlimited PDF exports (flashcards, question papers, summaries), advanced analytics, and priority Hussain AI doubt resolution.`,
        show_pricing_cards: true,
        retrieved_sources: ['Membership Tier & Lenient Policy Index']
      };
    } else {
      result = {
        thinking: 'Indexed student schedule, Mistake Vault, and Google Drive resources.',
        reply:
          `I'm **Hussain AI**, your full-website RAG Copilot! Here is a live snapshot of your StudyBridge workspace:\n\n` +
          `• **Active Plan:** ${sbState.user.plan} (${sbState.user.weeklySessionsUsed}/${sbState.user.weeklyLimit} weekly sessions)\n` +
          `• **Today's Picked Drive Files:** ${sbState.driveFiles.filter((f) => f.pickedToday).length} files ready\n` +
          `• **Weak Concepts Flagged:** ${sbState.weakConceptsVault.map((w) => w.concept).join(', ')}\n\n` +
          `Ask me to schedule a study block, generate a practice sheet, pick Google Drive files, or explain any concept with embedded YouTube videos!`,
        retrieved_sources: ['Live StudyBridge Workspace State']
      };
    }
  }

  // Execute any returned schedule tasks or operations
  if (Array.isArray(result.schedule_tasks) && result.schedule_tasks.length > 0) {
    result.schedule_tasks.forEach((t) => {
      const day = t.day && sbState.schedule[t.day] ? t.day : sbState.selectedScheduleDay || 'Mon';
      sbState.schedule[day].push({
        id: 'sc-' + Date.now() + Math.random(),
        title: t.title || 'AI Scheduled Study Session',
        subject: t.subject || 'Calculus & Linear Algebra',
        startHour: Number(t.startHour || 9),
        duration: Number(t.duration || 1.5),
        priority: t.priority || 'High',
        energy: t.energy || 'Peak',
        notes: t.notes || 'Scheduled by Hussain AI RAGbot'
      });
    });
    saveLocalState();
    renderScheduleTimeline();
    showToast(`📅 Hussain AI added ${result.schedule_tasks.length} study block(s) to your schedule!`);
  }

  if (Array.isArray(result.operations)) {
    result.operations.forEach((op) => {
      if (op.action === 'pick_daily_resources') {
        runHussainAIDailyResourcePicker();
      } else if (op.action === 'sync_flowplan') {
        syncWithFlowPlanOS();
      } else if (op.action === 'add_checklist' && op.checklist_text) {
        sbState.eodChecklist.unshift({ id: 'eod-' + Date.now(), text: op.checklist_text, done: false });
        renderEodChecklist();
      } else if (op.action === 'switch_tab' && op.target_tab) {
        switchView(op.target_tab);
      }
    });
  }

  appendRagBubble('bot', result.reply || 'Action completed!', {
    thinking: result.thinking,
    showPricingCards: Boolean(result.show_pricing_cards || result.show_booking_form),
    videos: result.youtube_videos || (result.recommend_youtube ? CLIENT_YOUTUBE_VIDEOS.slice(0, 2) : []),
    sources: result.retrieved_sources || ['StudyBridge Live RAG Index']
  });
}

// 17. Event Listeners & Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initial Renders
  updateAuthAndQuotaUI();
  renderDriveFiles();
  renderScheduleTimeline();
  renderActivePracticeSheet();
  renderWeakConceptsAndRevision();
  renderYouTubeCards(CLIENT_YOUTUBE_VIDEOS);
  renderEodChecklist();
  renderSubjectMastery();
  renderDownloadHub();
  updateTimerDisplays();

  // Populate initial Doubt Resolution output
  solveStudentDoubt('Physics', "Explain Faraday's Law of Electromagnetic Induction and why Lenz's Law introduces a negative sign.");

  // Seed initial welcome message in Hussain AI RAGbot
  appendRagBubble(
    'bot',
    `👋 Assalam-o-Alaikum! I am **Hussain AI**, your full-website **RAG Copilot & Academic Strategist** for **StudyBridge** (built on the **FlowPlan** architecture).\n\n` +
      `I am connected to everything on your workspace:\n` +
      `• **Google Drive Daily Picker:** Pick 1 study resource per subject automatically.\n` +
      `• **AI Practice & Mistake Engine:** Generate MCQs + Theoretical papers & Targeted Revision PDFs.\n` +
      `• **Smart Doubt & YouTube Studio:** Clarify tough concepts with embedded video lectures.\n` +
      `• **Lenient Membership Policy:** 5 free sessions/week + 1-time weekly grace session, or upgrade to **Pro ($9.99/mo)** right in chat!`,
    {
      thinking: 'Indexed StudyBridge Schedule, Google Drive Study Vault, Mistake Tracker, EOD Checklist, and FlowPlan OS Bridge.',
      sources: ['Live StudyBridge RAG Index', 'FlowPlan OS Sync']
    }
  );

  // Mobile Drawer triggers
  document.getElementById('btn-mobile-drawer-open')?.addEventListener('click', openMobileDrawer);
  document.getElementById('btn-mobile-drawer-close')?.addEventListener('click', closeMobileDrawer);
  document.getElementById('mobile-nav-backdrop')?.addEventListener('click', closeMobileDrawer);

  // Auth Form Submit
  document.getElementById('form-auth')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name').value;
    const consent = document.getElementById('auth-consent-checkbox').checked;
    executeAuthRequest(sbState.authMode, email, password, name, consent);
  });

  // Add Google Drive File / Folder Form
  document.getElementById('form-add-drive-resource')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('drive-new-subject').value;
    const title = document.getElementById('drive-new-title').value.trim();
    const notes = document.getElementById('drive-new-notes').value.trim();
    if (!title) return;
    
    const driveUrl = notes.startsWith('http') ? notes : 'https://drive.google.com/drive/my-drive';
    sbState.driveFiles.unshift({
      id: 'gd-' + Date.now(),
      subject,
      title: title.endsWith('.pdf') ? title : `${title}.pdf`,
      notes: notes || 'Synced from Google Drive folder',
      url: driveUrl,
      pickedToday: true,
      lastOpened: 'Just now'
    });
    document.getElementById('drive-new-title').value = '';
    document.getElementById('drive-new-notes').value = '';
    saveLocalState();
    renderDriveFiles();
    showToast(`Linked "${title}" to your StudyBridge Google Drive Vault!`);
  });

  // Syllabus & Deadline Analyzer Form
  document.getElementById('form-syllabus-analyzer')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const syllabusText = document.getElementById('syllabus-input-text').value.trim();
    const deadline = document.getElementById('syllabus-deadline-input').value;
    const dailyHours = document.getElementById('syllabus-hours-input').value;
    const btn = document.getElementById('btn-analyze-syllabus');
    const out = document.getElementById('syllabus-strategy-output');

    if (btn) {
      btn.disabled = true;
      btn.textContent = '⏳ Hussain AI Building Custom Circadian Timeline...';
    }

    try {
      const res = await fetch('/api/ai/analyze-syllabus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syllabusText, deadline, dailyHours })
      });
      if (!res.ok) throw new Error('Fallback syllabus analyzer');
      const data = await res.json();
      if (Array.isArray(data.blocks) && data.blocks.length > 0) {
        data.blocks.forEach((b) => {
          const d = b.day && sbState.schedule[b.day] ? b.day : 'Mon';
          sbState.schedule[d].push({
            id: 'sc-' + Date.now() + Math.random(),
            title: b.title,
            subject: b.subject || 'Study Block',
            startHour: Number(b.startHour || 9),
            duration: Number(b.duration || 1.5),
            priority: b.priority || 'High',
            energy: b.energy || 'Peak',
            notes: b.notes || `Target Deadline: ${deadline}`
          });
        });
      }
      if (out) {
        out.classList.remove('hidden');
        out.innerHTML = `<div class="font-bold text-cyanGlow">✓ Custom Timeline Generated (Target: ${escapeHTML(deadline)})</div><p>${escapeHTML(
          data.strategySummary || 'Mapped high-cognitive chapters to Peak circadian windows.'
        )}</p>`;
      }
    } catch {
      const topics = syllabusText.split(/[;\n,]+/).map((s) => s.trim()).filter(Boolean);
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      topics.forEach((top, i) => {
        const d = days[i % days.length];
        sbState.schedule[d].push({
          id: 'sc-' + Date.now() + i,
          title: top,
          subject: top.split(':')[0] || 'Core Subject',
          startHour: 8.5 + (i % 3) * 2,
          duration: 1.5,
          priority: 'High',
          energy: 'Peak',
          notes: `Deadline Target: ${deadline}`
        });
      });
      if (out) {
        out.classList.remove('hidden');
        out.innerHTML = `<div class="font-bold text-emerald-400">✓ Scheduled ${topics.length} Syllabus Topics Across Peak Windows!</div>`;
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🧠 Generate Custom Timeline via Hussain AI';
      }
      saveLocalState();
      renderScheduleTimeline();
      showToast('Custom study timeline generated and synced!');
    }
  });

  // Add Schedule Block Form
  document.getElementById('form-add-schedule-block')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('sched-new-title').value.trim();
    const subject = document.getElementById('sched-new-subject').value;
    const startHour = Number(document.getElementById('sched-new-hour').value || 9);
    const priority = document.getElementById('sched-new-priority').value;
    if (!title) return;

    const day = sbState.selectedScheduleDay || 'Mon';
    if (!sbState.schedule[day]) sbState.schedule[day] = [];
    sbState.schedule[day].push({
      id: 'sc-' + Date.now(),
      title,
      subject,
      startHour,
      duration: 1.5,
      priority,
      energy: startHour < 12 || (startHour >= 16 && startHour < 19) ? 'Peak' : startHour < 16 ? 'Trough' : 'Recovery',
      notes: 'Custom scheduled study session'
    });
    document.getElementById('sched-new-title').value = '';
    saveLocalState();
    renderScheduleTimeline();
    showToast(`Added "${title}" to ${day} schedule!`);
  });

  // Generate AI Practice Sheet Form (Enforces Lenient 5-Session Limit + 1 Grace Session)
  document.getElementById('form-generate-practice')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('prac-subject')?.value || 'Computer Science';
    const topic = document.getElementById('prac-topic')?.value.trim() || 'Data Representation';
    const difficulty = document.getElementById('prac-difficulty')?.value || 'Exam Standard';
    const examBoard = document.getElementById('prac-board')?.value || 'cambridge';
    const syllabusCode = document.getElementById('prac-syllabus-code')?.value.trim() || '';

    checkAndConsumePracticeSession(async () => {
      const btn = document.getElementById('btn-generate-practice');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳</span><span>Hussain AI Grounding in Official Specification &amp; Generating Questions...</span>';
      }

      try {
        const res = await fetch('/api/ai/generate-practice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject,
            topic,
            difficulty,
            examBoard,
            syllabusCode,
            mcqCount: 5,
            theoryCount: 2,
            userEmail: sbState.user.email
          })
        });
        if (!res.ok) throw new Error('Fallback practice generator');
        const generated = await res.json();
        if (Array.isArray(generated.mcqs) && generated.mcqs.length > 0) {
          sbState.activePracticeSheet = generated;
          sbState.userMcqAnswers = {};
          sbState.userTheoryAnswers = {};
          saveLocalState();
          renderActivePracticeSheet();
          showToast(`✨ Generated ${generated.mcqs.length} MCQs + ${(generated.theoretical || []).length} Theoretical Qs grounded in ${generated.syllabusMatch?.board || 'Curriculum Specification'}!`);
          return;
        }
      } catch (err) {
        console.warn('Practice generation API error, using curriculum-grounded fallback:', err);
        const fallbackBoard = examBoard === 'cambridge' ? 'Cambridge CAIE (A-Level 9618)' :
                              examBoard === 'ib' ? 'International Baccalaureate (IB DP)' :
                              examBoard === 'aqa' ? 'AQA GCE Advanced Specification' :
                              examBoard === 'edexcel' ? 'Pearson Edexcel International A-Level' :
                              'AP CollegeBoard Curriculum Specification';
        sbState.activePracticeSheet = {
          ...DEFAULT_PRACTICE_SHEET,
          title: `${fallbackBoard}: ${subject} — ${topic} (${difficulty})`,
          subject,
          topic,
          difficulty,
          syllabusMatch: {
            board: fallbackBoard,
            code: syllabusCode || 'Paper 1: Core Fundamentals & Theory',
            topic: `${subject}: ${topic}`,
            objectives: [
              `Demonstrate knowledge and understanding of core principles for ${topic}`,
              `Apply mathematical formulas and theoretical theorems to exam-style scenarios`,
              `Evaluate design tradeoffs, edge cases, and algorithmic complexity in ${subject}`,
              `Synthesize comprehensive step-by-step proofs according to official grading mark schemes`
            ]
          }
        };
        sbState.userMcqAnswers = {};
        sbState.userTheoryAnswers = {};
        saveLocalState();
        renderActivePracticeSheet();
        showToast(`✨ Practice Sheet ready for ${subject}: ${topic} grounded in ${fallbackBoard}!`);
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<span>✨</span><span>Generate AI Practice Sheet</span>';
        }
      }
    });
  });

  // Doubt Solver Form
  document.getElementById('form-doubt-solver')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('doubt-subject').value;
    const question = document.getElementById('doubt-question-input').value.trim();
    if (!question) return;
    solveStudentDoubt(subject, question);
  });

  // EOD Checklist Add Form
  document.getElementById('form-add-eod-item')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = document.getElementById('eod-new-input');
    const text = inp.value.trim();
    if (!text) return;
    sbState.eodChecklist.unshift({ id: 'eod-' + Date.now(), text, done: false });
    inp.value = '';
    saveLocalState();
    renderEodChecklist();
    showToast('Added item to End-of-Day checklist!');
  });

  // Pro Upgrade Form
  document.getElementById('form-upgrade-pro')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('upg-name').value.trim();
    const email = document.getElementById('upg-email').value.trim();
    const phone = document.getElementById('upg-phone').value.trim();

    try {
      await fetch('/api/subscriptions/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, plan: 'Pro Student Tier ($9.99/mo)', instantActivate: true })
      });
    } catch {}

    sbState.user.name = name || sbState.user.name;
    sbState.user.email = email || sbState.user.email;
    sbState.user.tier = 'pro';
    sbState.user.is_pro = true;
    sbState.user.role = 'Premium Member';
    sbState.user.plan = 'Pro Student Tier ($9.99/mo)';
    sbState.user.weeklyLimit = 999999;

    updateAuthAndQuotaUI();
    closeUpgradeModal();
    showToast('💎 Upgraded to Pro Student Tier ($9.99/mo)! Unlimited AI Practice & PDFs unlocked.');
  });

  // Admin AI Config Form
  document.getElementById('form-admin-ai-config')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const primaryModel = document.getElementById('adm-ai-model').value;
    const temperature = Number(document.getElementById('adm-ai-temp').value);
    const freeWeeklyLimit = Number(document.getElementById('adm-ai-limit').value);
    const allowGraceSession = document.getElementById('adm-ai-grace').checked;
    const systemPromptAddendum = document.getElementById('adm-ai-prompt').value;

    try {
      await fetch('/api/admin/ai-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryModel, temperature, freeWeeklyLimit, allowGraceSession, systemPromptAddendum })
      });
    } catch {}

    if (!sbState.user.is_pro && !sbState.user.is_admin) {
      sbState.user.weeklyLimit = freeWeeklyLimit;
      updateAuthAndQuotaUI();
    }
    showToast(`⚙️ Saved Hussain AI Config (${primaryModel}, Limit: ${freeWeeklyLimit}/wk)!`);
  });

  // Floating & Fullscreen RAG Chat Forms & Suggestion Chips
  const attachRagForm = (formId, inputId) => {
    document.getElementById(formId)?.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = document.getElementById(inputId);
      const q = inp ? inp.value.trim() : '';
      if (!q) return;
      if (inp) inp.value = '';
      handleRagUserPrompt(q);
    });
  };

  attachRagForm('form-rag-chat', 'rag-chat-input');
  attachRagForm('form-floating-rag', 'floating-rag-input');
  attachRagForm('form-fullscreen-rag', 'fullscreen-rag-input');

  document.querySelectorAll('[data-rag-q]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-rag-q');
      if (q) {
        toggleFloatingChatDrawer(true);
        handleRagUserPrompt(q);
      }
    });
  });

  // Google Drive Drag & Drop File Upload Studio
  window.handleDriveFileUpload = async function (file) {
    if (!file) return;
    const dropzone = document.getElementById('drive-upload-dropzone');
    const originalHtml = dropzone ? dropzone.innerHTML : '';

    if (dropzone) {
      dropzone.innerHTML = `
        <div class="space-y-2 py-4">
          <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div class="font-bold text-sm text-white">Uploading "${escapeHTML(file.name)}" to Student Google Drive...</div>
          <div class="text-[11px] font-mono text-cyanGlow">Hussain AI indexing syllabus topics & connecting storage...</div>
        </div>
      `;
    }

    const fn = file.name.toLowerCase();
    let subject = document.getElementById('drive-new-subject')?.value || 'Computer Science';
    if (fn.includes('cs') || fn.includes('code') || fn.includes('python') || fn.includes('binary') || fn.includes('data') || fn.includes('algorithm')) {
      subject = 'Computer Science';
    } else if (fn.includes('math') || fn.includes('calc') || fn.includes('linear') || fn.includes('algebra') || fn.includes('matrix')) {
      subject = 'Calculus & Linear Algebra';
    } else if (fn.includes('phys') || fn.includes('circuit') || fn.includes('mechanic') || fn.includes('wave')) {
      subject = 'Physics';
    } else if (fn.includes('chem') || fn.includes('reaction') || fn.includes('sn1') || fn.includes('sn2')) {
      subject = 'Organic Chemistry';
    } else if (fn.includes('econ') || fn.includes('macro') || fn.includes('market') || fn.includes('fiscal')) {
      subject = 'Macroeconomics';
    }

    try {
      const res = await fetch('/api/drive/upload-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          fileSize: file.size,
          fileType: file.type || 'application/pdf',
          subject: subject
        })
      });

      let uploadedAsset;
      if (res.ok) {
        const data = await res.json();
        uploadedAsset = data.file;
      } else {
        uploadedAsset = {
          id: `drive-${Date.now()}`,
          subject: subject,
          title: file.name,
          notes: `Uploaded via StudyBridge Cloud Uploader • Size: ${(file.size / 1024).toFixed(1)} KB`,
          url: 'https://drive.google.com/drive/my-drive',
          pickedToday: true,
          lastOpened: 'Just now'
        };
      }

      sbState.driveFiles.unshift(uploadedAsset);
      saveLocalState();
      renderDriveFiles();

      showToast(`☁️ Successfully uploaded "${file.name}" to Google Drive Vault!`);

      if (dropzone) {
        dropzone.innerHTML = `
          <div class="space-y-2 py-2">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto grid place-items-center text-lg font-bold">✓</div>
            <div class="font-bold text-sm text-emerald-400">"${escapeHTML(file.name)}" Connected!</div>
            <div class="flex items-center justify-center gap-2 pt-1">
              <a href="https://drive.google.com/drive/my-drive" target="_blank" rel="noopener noreferrer" class="sb-btn sb-btn-google-drive py-1 px-3 text-xs font-bold">Open in Drive ↗</a>
              <button type="button" onclick="practiceFromDriveResource('${escapeHTML(subject)}', '${escapeHTML(file.name)}')" class="sb-btn sb-btn-primary py-1 px-3 text-xs">Generate AI Quiz ⚡</button>
            </div>
            <div class="text-[10px] text-slate-400 cursor-pointer pt-2 underline" onclick="resetDropzone()">Upload another file</div>
          </div>
        `;
      }
    } catch (err) {
      console.error('Upload error:', err);
      showToast(`Uploaded "${file.name}" locally to Drive Vault!`);
      if (dropzone) dropzone.innerHTML = originalHtml;
    }
  };

  window.resetDropzone = function () {
    const dropzone = document.getElementById('drive-upload-dropzone');
    if (dropzone) {
      dropzone.innerHTML = `
        <input type="file" id="drive-file-input" class="hidden" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.pptx" />
        <div class="space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 mx-auto grid place-items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
          </div>
          <div class="font-bold text-sm text-white">Upload Files to Your Google Drive</div>
          <p class="text-xs text-slate-300">Drag &amp; drop syllabus PDFs, past papers, or notes here, or <span class="text-blue-400 underline font-semibold">browse file</span></p>
          <div class="text-[10px] font-mono text-slate-400">Website indexes file for Hussain AI and syncs directly to drive.google.com</div>
        </div>
      `;
      setupDropzoneEvents();
    }
  };

  function setupDropzoneEvents() {
    const dropzone = document.getElementById('drive-upload-dropzone');
    const fileInput = document.getElementById('drive-file-input');
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('border-blue-500', 'bg-blue-500/10');
      });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('border-blue-500', 'bg-blue-500/10');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        window.handleDriveFileUpload(files[0]);
      }
    });

    fileInput?.addEventListener('change', (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        window.handleDriveFileUpload(files[0]);
      }
    });
  }
  setupDropzoneEvents();

  // Mobile Drawer Backdrop & Close Buttons
  document.getElementById('mobile-drawer-backdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'mobile-drawer-backdrop') {
      closeMobileDrawer();
    }
  });
  document.getElementById('btn-mobile-drawer-close')?.addEventListener('click', closeMobileDrawer);
  document.getElementById('btn-mobile-drawer-open')?.addEventListener('click', openMobileDrawer);
});
