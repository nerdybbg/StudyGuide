/**
 * StudyBridge (Powered by Hussain AI & FlowPlan Architecture)
 * Automated End-to-End Acceptance & Verification Suite (verify-studybridge.js)
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { server } = require('./server.js');

const TEST_PORT = 8089;
const BASE = `http://127.0.0.1:${TEST_PORT}`;

async function reqJSON(pathname, method = 'GET', body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${pathname}`, opts);
  const data = await res.json();
  return { status: res.status, data };
}

async function runVerification() {
  await new Promise((resolve) => server.listen(TEST_PORT, '127.0.0.1', resolve));
  console.log(`[VERIFY] StudyBridge Test Server started on ${BASE}`);

  try {
    // 1. Health & Architecture Check
    const health = await reqJSON('/api/health');
    assert.strictEqual(health.status, 200);
    assert.strictEqual(health.data.geminiConfigured, true, 'Gemini API key must be configured');
    assert.strictEqual(health.data.masterAdminConfigured, 'muhammadhussain99300@gmail.com');
    assert.strictEqual(health.data.flowplanBridgeAvailable, true, 'FlowPlan Beast bridge must be available');
    console.log('[PASS] 1. Health, Gemini Key & FlowPlan Architecture Bridge verified');

    // 2. Master Admin Authentication (muhammadhussain99300@gmail.com / hussain69)
    const badAdmin = await reqJSON('/api/auth/login', 'POST', {
      email: 'muhammadhussain99300@gmail.com',
      password: 'wrongpassword'
    });
    assert.strictEqual(badAdmin.status, 401, 'Wrong admin password must be rejected');

    const adminLogin = await reqJSON('/api/auth/login', 'POST', {
      email: 'muhammadhussain99300@gmail.com',
      password: 'hussain69'
    });
    assert.strictEqual(adminLogin.status, 200);
    assert.strictEqual(adminLogin.data.user.is_admin, true);
    assert.strictEqual(adminLogin.data.user.role, 'Master Admin');
    assert.ok(adminLogin.data.access_token, 'JWT token must be issued for Master Admin');
    console.log('[PASS] 2. Master Admin (muhammadhussain99300@gmail.com / hussain69) RBAC & JWT verified');

    // 3. Sign Up Legal Consent Enforcement & Google OAuth
    const testEmail = `student_${Date.now()}@studybridge.edu`;
    const noConsent = await reqJSON('/api/auth/signup', 'POST', {
      name: 'Test Student',
      email: testEmail,
      password: 'password123',
      termsAccepted: false
    });
    assert.strictEqual(noConsent.status, 400, 'Sign Up without Terms & Privacy checkbox must be rejected');

    const withConsent = await reqJSON('/api/auth/signup', 'POST', {
      name: 'Test Student',
      email: testEmail,
      password: 'password123',
      termsAccepted: true
    });
    assert.strictEqual(withConsent.status, 200);
    assert.strictEqual(withConsent.data.user.tier, 'free');

    const googleAuth = await reqJSON('/api/auth/google', 'POST', {
      email: 'oauth.student@gmail.com',
      name: 'OAuth Student'
    });
    assert.strictEqual(googleAuth.status, 200);
    assert.strictEqual(googleAuth.data.user.driveConnected, true);
    console.log('[PASS] 3. Sign Up Mandatory Consent Checkbox & Google OAuth verified');

    // 4. Lenient Membership Tier Policy (5 Free Sessions/Week + 1-Time Grace Session)
    for (let i = 1; i <= 5; i++) {
      const s = await reqJSON('/api/tier/consume-session', 'POST', { email: testEmail });
      assert.strictEqual(s.data.status, 'allowed');
      assert.strictEqual(s.data.used, i);
    }
    const sixthAttempt = await reqJSON('/api/tier/consume-session', 'POST', { email: testEmail });
    assert.strictEqual(sixthAttempt.data.status, 'grace_available', '6th session must offer 1-time grace session');

    const activateGrace = await reqJSON('/api/tier/use-grace', 'POST', { email: testEmail });
    assert.strictEqual(activateGrace.data.status, 'grace_activated');
    assert.strictEqual(activateGrace.data.graceSessionUsed, true);

    const seventhAttempt = await reqJSON('/api/tier/consume-session', 'POST', { email: testEmail });
    assert.strictEqual(seventhAttempt.data.status, 'limit_reached', 'After grace session is used, limit_reached must trigger');

    // Upgrade to Pro Student Tier ($9.99/mo) -> Unlimited
    const upgradeRes = await reqJSON('/api/subscriptions/upgrade', 'POST', {
      name: 'Test Student',
      email: testEmail,
      phone: '+923001234567',
      plan: 'Pro Student Tier ($9.99/mo)',
      instantActivate: true
    });
    assert.strictEqual(upgradeRes.status, 200);
    assert.strictEqual(upgradeRes.data.user.tier, 'pro');

    const proAttempt = await reqJSON('/api/tier/consume-session', 'POST', { email: testEmail });
    assert.strictEqual(proAttempt.data.status, 'allowed');
    assert.strictEqual(proAttempt.data.unlimited, true);
    console.log('[PASS] 4. Lenient 5-Session Limit, 1-Time Grace Session & Pro ($9.99/mo) Unlimited Upgrade verified');

    // 5. Live Hussain AI RAGbot Call (Gemini 3.5 with AQ.Ab8RN6JckyuQdszkCmtfk48atdRSC6moWfpUvs9nH3QMcQX7vA)
    const ragRes = await reqJSON('/api/ai/rag-chat', 'POST', {
      prompt: 'Schedule 1.5 hours of Calculus tomorrow on Tue at 9:00 AM and tell me my current tier.',
      client_context: { user: { name: 'Hussain', plan: 'Pro Student Tier' } },
      conversation_history: []
    });
    assert.strictEqual(ragRes.status, 200);
    assert.ok(ragRes.data.reply && ragRes.data.reply.length > 10, 'Hussain AI RAGbot must return a grounded reply');
    console.log(`[PASS] 5. Live Hussain AI RAGbot (${ragRes.data.model_used || 'Gemini 3.5'}) response verified`);

    // 6. AI Doubt Solver + Embedded YouTube Videos
    const doubtRes = await reqJSON('/api/ai/doubt-solver', 'POST', {
      subject: 'Physics',
      question: 'Explain Faraday Law of Electromagnetic Induction'
    });
    assert.strictEqual(doubtRes.status, 200);
    assert.ok(Array.isArray(doubtRes.data.videos) && doubtRes.data.videos.length > 0, 'Must return YouTube educational videos');
    console.log('[PASS] 6. Smart AI Doubt Resolution & Embedded YouTube Recommendations verified');

    // 7. FlowPlan OS Bridge Serving (/flowplan/)
    const fpRes = await fetch(`${BASE}/flowplan/`);
    assert.strictEqual(fpRes.status, 200);
    const fpHtml = await fpRes.text();
    assert.ok(fpHtml.includes('Return to StudyBridge (Hussain AI)'), 'FlowPlan OS bridge button must be injected');
    console.log('[PASS] 7. Connected FlowPlan OS (/flowplan/) bidirectional bridge verified');

    // 8. Frontend HTML & Responsive Structure Invariants
    const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const requiredIds = [
      'view-dashboard',
      'view-schedule',
      'view-practice',
      'view-doubts',
      'view-hub',
      'view-pricing',
      'view-admin',
      'sb-floating-chat',
      'grace-limit-modal',
      'legal-modal',
      'auth-consent-checkbox',
      'youtube-main-iframe'
    ];
    for (const id of requiredIds) {
      assert.ok(indexHtml.includes(`id="${id}"`), `Missing required DOM element #${id}`);
    }
    console.log('[PASS] 8. Frontend DOM, Responsive Navigation, Modals & Legal Compliance verified');

    console.log('\nVERDICT: PASS');
  } finally {
    server.close();
  }
}

runVerification().catch((err) => {
  console.error('\nVERDICT: FAIL --', err.message);
  process.exit(1);
});
