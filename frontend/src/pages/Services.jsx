import { NavLink } from "react-router-dom";
import PageHero from "../components/PageHero";
import "./Services.css";

import { useState, useEffect } from "react";
import { getServices } from "../api";
import { FALLBACK_SERVICES } from "../data/fallbackData";

const process = [
  { step: "1", title: "Free consultation", text: "A 30-minute call to understand your goals, budget, and timeline." },
  { step: "2", title: "Profile & shortlist", text: "We evaluate your profile and build a shortlist you actually like." },
  { step: "3", title: "Applications & tests", text: "SOPs, essays, LORs, and test prep run in parallel to your deadlines." },
  { step: "4", title: "Admits & funding", text: "We help you compare offers, negotiate aid, and pick the right one." },
  { step: "5", title: "Visa & departure", text: "Visa coaching, SEVIS, and a pre-departure briefing before you fly." },
];

export default function Services() {
  const [serviceGroups, setServiceGroups] = useState(FALLBACK_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then(data => {
      if (data && data.length > 0) setServiceGroups(data);
    }).catch(() => {}).finally(() => {
      setLoading(false);
    });
  }, []);

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
          {loading ? <p>Loading services...</p> : serviceGroups.map((group, groupIdx) => (
            <div className="service-group" key={group.title || group.id}>
              <div className={`service-banner ${groupIdx % 2 === 1 ? "service-banner--reverse" : ""}`}>
                <div className="service-banner__content">
                  <div className="service-group__label" style={{ color: group.color }}>
                    <span className="tag-stamp" style={{ borderColor: group.color }}>{group.title}</span>
                  </div>
                  <h2>{group.title}</h2>
                  <p className="service-banner__desc">{group.description}</p>
                </div>
                <div className="service-banner__media">
                  <img src={group.image} alt={group.title} className="service-banner__img" loading="lazy" />
                </div>
              </div>

              <div className="service-group__grid">
                {(group.items || []).map((item) => (
                  <div className="service-item" key={item.title}>
                    <div className="service-item__icon-wrap">
                      <span className="service-item__icon">{item.icon}</span>
                    </div>
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
