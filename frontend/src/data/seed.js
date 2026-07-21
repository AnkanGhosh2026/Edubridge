import { UNIVERSITIES } from "./universitiesData.js";

const API_URL = "https://edubridge-63uu.onrender.com";

const serviceGroups = [
  {
    title: "Profile building & shortlisting",
    color: "var(--marigold-deep)",
    image: "/images/services/profile.png",
    description: "Aligning your academic background, test scores, and career goals with realistic target universities in the USA.",
    items: [
      { icon: "📊", title: "Profile evaluation", text: "Academic, extracurricular, and financial profile review to set realistic targets." },
      { icon: "🏫", title: "University shortlisting", text: "Reach, match, and safety schools chosen against real admit data, not brochures." },
      { icon: "✍️", title: "SOP & essay mentoring", text: "Line-by-line editing on statements of purpose, essays, and LORs." },
      { icon: "💻", title: "Application filing", text: "Common App, Coalition App, and portal-specific submissions, deadline-tracked." },
    ],
  },
  {
    title: "Test preparation",
    color: "var(--sky-deep)",
    image: "/images/services/testprep.png",
    description: "Targeted coaching tracks to achieve competitive scores for top US universities.",
    items: [
      { icon: "🎧", title: "IELTS / TOEFL / Duolingo", text: "Batch and 1:1 coaching with weekly mock tests and score tracking." },
      { icon: "📐", title: "GRE / GMAT", text: "Structured 8-week and 12-week prep tracks with quant and verbal specialists." },
      { icon: "🎙️", title: "Interview preparation", text: "Mock admission and scholarship interviews with recorded feedback." },
    ],
  },
  {
    title: "Financing your degree",
    color: "var(--emerald-deep)",
    image: "/images/services/financing.png",
    description: "Maximizing merit grants, assistantships, and collateral-free loan options for Indian students.",
    items: [
      { icon: "🏆", title: "Scholarship search", text: "Merit, need-based, and department-specific scholarship matching." },
      { icon: "🏦", title: "Education loan support", text: "Tie-ups with leading Indian and international education-loan lenders." },
      { icon: "🧮", title: "Cost planning", text: "Full cost-of-attendance breakdown so there are no surprises later." },
    ],
  },
  {
    title: "Visa & pre-departure",
    color: "var(--navy)",
    image: "/images/services/visa.png",
    description: "Flawless F-1 visa preparation, DS-160 documentation, and post-landing volunteer support.",
    items: [
      { icon: "🛂", title: "F-1 visa coaching", text: "Document checklists, DS-160 help, and mock interviews with ex-visa officers." },
      { icon: "📄", title: "SEVIS & I-20 guidance", text: "Step-by-step help with SEVIS fee payment and I-20 verification." },
      { icon: "🧳", title: "Pre-departure briefing", text: "Housing, banking, health insurance, and what to actually pack." },
      { icon: "🛬", title: "Airport pickup network", text: "On-ground volunteer network in 40+ US campus towns for your first day." },
    ],
  },
];

async function seedData() {
  // Login as admin first
  const loginRes = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "password123" }), // Default from env
  });

  if (!loginRes.ok) {
    console.error("Failed to login. Please ensure backend is running and credentials are correct.");
    console.error(await loginRes.text());
    return;
  }

  const { access_token } = await loginRes.json();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };

  console.log("Seeding services...");
  for (let i = 0; i < serviceGroups.length; i++) {
    const service = serviceGroups[i];
    const payload = { ...service, display_order: i };
    const res = await fetch(`${API_URL}/api/admin/services`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      console.log(`✅ Created service: ${service.title}`);
    } else {
      console.error(`❌ Failed to create service: ${service.title}`, await res.text());
    }
  }

  console.log("\\nSeeding universities...");
  for (const uni of UNIVERSITIES) {
    const res = await fetch(`${API_URL}/api/admin/universities`, {
      method: "POST",
      headers,
      body: JSON.stringify(uni),
    });
    if (res.ok) {
      console.log(`✅ Created university: ${uni.name}`);
    } else {
      console.error(`❌ Failed to create university: ${uni.name}`, await res.text());
    }
  }

  console.log("\\nSeeding complete!");
}

seedData();
