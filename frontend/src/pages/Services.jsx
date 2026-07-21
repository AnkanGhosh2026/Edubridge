import { NavLink } from "react-router-dom";
import PageHero from "../components/PageHero";
import "./Services.css";

const serviceGroups = [
  {
    label: "Profile building & shortlisting",
    color: "var(--marigold-deep)",
    items: [
      { title: "Profile evaluation", text: "Academic, extracurricular, and financial profile review to set realistic targets." },
      { title: "University shortlisting", text: "Reach, match, and safety schools chosen against real admit data, not brochures." },
      { title: "SOP & essay mentoring", text: "Line-by-line editing on statements of purpose, essays, and LORs." },
      { title: "Application filing", text: "Common App, Coalition App, and portal-specific submissions, deadline-tracked." },
    ],
  },
  {
    label: "Test preparation",
    color: "var(--sky-deep)",
    items: [
      { title: "IELTS / TOEFL / Duolingo", text: "Batch and 1:1 coaching with weekly mock tests and score tracking." },
      { title: "GRE / GMAT", text: "Structured 8-week and 12-week prep tracks with quant and verbal specialists." },
      { title: "Interview preparation", text: "Mock admission and scholarship interviews with recorded feedback." },
    ],
  },
  {
    label: "Financing your degree",
    color: "var(--emerald-deep)",
    items: [
      { title: "Scholarship search", text: "Merit, need-based, and department-specific scholarship matching." },
      { title: "Education loan support", text: "Tie-ups with leading Indian and international education-loan lenders." },
      { title: "Cost planning", text: "Full cost-of-attendance breakdown so there are no surprises later." },
    ],
  },
  {
    label: "Visa & pre-departure",
    color: "var(--navy)",
    items: [
      { title: "F-1 visa coaching", text: "Document checklists, DS-160 help, and mock interviews with ex-visa officers." },
      { title: "SEVIS & I-20 guidance", text: "Step-by-step help with SEVIS fee payment and I-20 verification." },
      { title: "Pre-departure briefing", text: "Housing, banking, health insurance, and what to actually pack." },
      { title: "Airport pickup network", text: "On-ground volunteer network in 40+ US campus towns for your first day." },
    ],
  },
];

const process = [
  { step: "1", title: "Free consultation", text: "A 30-minute call to understand your goals, budget, and timeline." },
  { step: "2", title: "Profile & shortlist", text: "We evaluate your profile and build a shortlist you actually like." },
  { step: "3", title: "Applications & tests", text: "SOPs, essays, LORs, and test prep run in parallel to your deadlines." },
  { step: "4", title: "Admits & funding", text: "We help you compare offers, negotiate aid, and pick the right one." },
  { step: "5", title: "Visa & departure", text: "Visa coaching, SEVIS, and a pre-departure briefing before you fly." },
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Every step from shortlist to student visa, under one roof"
        subtitle="We don't just fill out forms. Each service below is run by a specialist who has done this dozens of times a year, not once for their own kid."
        stamp="No hidden fees"
      />

      <section className="section services-list">
        <div className="container">
          {serviceGroups.map((group) => (
            <div className="service-group" key={group.label}>
              <div className="service-group__label" style={{ color: group.color }}>
                <span className="tag-stamp" style={{ borderColor: group.color }}>{group.label}</span>
              </div>
              <div className="service-group__grid">
                {group.items.map((item) => (
                  <div className="service-item" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--marigold-deep)" }}>Student counselling process</span>
            <h2>How a typical journey with us looks</h2>
          </div>
          <div className="process-rail">
            {process.map((p, idx) => (
              <div className="process-step" key={p.step}>
                <div className="process-step__marker">{p.step}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                {idx < process.length - 1 && <span className="process-step__connector" />}
              </div>
            ))}
          </div>
          <div className="process-section__cta">
            <NavLink to="/contact" className="btn btn-primary">Start with a free consultation</NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
