import { NavLink } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./Home.css";

const whyUs = [
  {
    code: "01",
    title: "Certified counsellors",
    text: "ICEF and AIRC-trained counsellors who've personally studied or worked in the US.",
  },
  {
    code: "02",
    title: "850+ university tie-ups",
    text: "Direct admission partnerships across public, private, and community colleges.",
  },
  {
    code: "03",
    title: "End-to-end support",
    text: "Shortlisting to SEVIS, visa mock interviews to airport pickup — we stay with you.",
  },
  {
    code: "04",
    title: "Real scholarship wins",
    text: "₹38 Cr+ in scholarships secured for our students across the last 5 intakes.",
  },
];

import { useState, useEffect } from "react";
import { getServices } from "../api";
import { FALLBACK_SERVICES } from "../data/fallbackData";

const FALLBACK_HOME_SERVICES = FALLBACK_SERVICES.reduce((acc, g) => [...acc, ...(g.items || [])], []).slice(0, 6);

const stats = [
  { value: "12,400+", label: "students placed since 2015" },
  { value: "850+", label: "partner US institutions" },
  { value: "94%", label: "visa success rate" },
  { value: "₹38 Cr+", label: "scholarships secured" },
];

export default function Home() {
  const [services, setServices] = useState(FALLBACK_HOME_SERVICES);
  
  useEffect(() => {
    getServices().then(data => {
      if (data && data.length > 0) {
        const allItems = data.reduce((acc, group) => [...acc, ...(group.items || [])], []);
        setServices(allItems.slice(0, 6));
      }
    }).catch(() => {});
  }, []);
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <BackButton variant="light" />
            <span className="eyebrow hero__eyebrow">
              <span className="hero__eyebrow-dot" /> Admissions open for Fall 2027 intake
            </span>
            <h1 className="hero__title">
              Your passport to a<br />
              <span className="hero__title-accent">US college campus</span>
            </h1>
            <p className="hero__sub">
              EduBridge Overseas has guided over 12,400 Indian students from
              their first shortlist to their first day on a US campus — with
              honest advice, not sales targets.
            </p>
            <div className="hero__actions">
              <NavLink to="/contact" className="btn btn-primary">Book a free consultation</NavLink>
              <NavLink to="/study-in-usa" className="btn btn-outline">Explore Study in USA</NavLink>
            </div>
            <div className="hero__chips">
              {stats.map((s) => (
                <div className="hero__chip" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__art" aria-hidden="true">
            <svg viewBox="0 0 420 420" className="hero__svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2EC4E8" />
                  <stop offset="100%" stopColor="#16213E" />
                </linearGradient>
              </defs>
              <circle cx="210" cy="210" r="190" fill="url(#skyGrad)" opacity="0.08" />
              <path
                id="flightPath"
                d="M75,330 C130,260 150,150 235,110 C280,90 320,95 350,70"
                fill="none"
                stroke="#16213E"
                strokeWidth="2.5"
                strokeDasharray="7 9"
                opacity="0.55"
              />
              {/* IND stamp */}
              <g transform="translate(75,330)">
                <circle r="34" fill="#FFF8EE" stroke="#FF9F1C" strokeWidth="3" />
                <text textAnchor="middle" dy="-2" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="15" fill="#E0800A">IND</text>
                <text textAnchor="middle" dy="14" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#E0800A">ORIGIN</text>
              </g>
              {/* USA stamp */}
              <g transform="translate(350,70)">
                <circle r="34" fill="#FFF8EE" stroke="#0EAD69" strokeWidth="3" />
                <text textAnchor="middle" dy="-2" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="15" fill="#087A4A">USA</text>
                <text textAnchor="middle" dy="14" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#087A4A">CAMPUS</text>
              </g>
              {/* plane traveling the path once */}
              <g className="hero__plane">
                <text x="0" y="0" fontSize="22">✈️</text>
                <animateMotion dur="3.5s" repeatCount="1" fill="freeze" rotate="auto"
                  path="M75,330 C130,260 150,150 235,110 C280,90 320,95 350,70" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee__track">
          {["SAT", "IELTS", "TOEFL", "GRE", "GMAT", "DUOLINGO", "F-1 VISA", "SEVIS", "I-20", "CSS PROFILE"].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
          {["SAT", "IELTS", "TOEFL", "GRE", "GMAT", "DUOLINGO", "F-1 VISA", "SEVIS", "I-20", "CSS PROFILE"].map((t, i) => (
            <span key={`dup-${i}`}>{t}</span>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <section className="section why">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--marigold-deep)" }}>Why choose us</span>
            <h2>Counselling that feels like a<br />trusted senior, not a salesperson</h2>
          </div>
          <div className="ticket-grid">
            {whyUs.map((item) => (
              <div className="ticket" key={item.code}>
                <div className="ticket__top">
                  <span className="ticket__code">{item.code}</span>
                  <span className="ticket__perf" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section services-preview">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--sky-deep)" }}>What we do</span>
            <h2>Everything between "I want to study<br />abroad" and touchdown in the US</h2>
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <div className="service-card" key={s.title}>
                <span className="service-card__icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="services-preview__cta">
            <NavLink to="/services" className="btn btn-outline">See all services</NavLink>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <span className="tag-stamp cta-band__stamp">Free · 30 minutes</span>
            <h2>Talk to a counsellor before<br />you finalise your shortlist</h2>
            <p>No obligation, no pressure — just a clear-eyed look at where you stand and what's possible.</p>
          </div>
          <NavLink to="/contact" className="btn btn-primary">Schedule my call</NavLink>
        </div>
      </section>
    </>
  );
}
