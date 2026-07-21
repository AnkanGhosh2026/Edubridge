import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import PageHero from "../components/PageHero";
import UniversityModal from "../components/UniversityModal";
import { UNIVERSITIES, CATEGORIES, DEFAULT_FALLBACK_IMAGE } from "../data/universitiesData";
import "./StudyUSA.css";

const reasons = [
  { title: "4,000+ accredited institutions", text: "From Ivy League research universities to affordable community colleges." },
  { title: "Flexible majors", text: "Explore before you commit — most US degrees let you declare a major in year two." },
  { title: "Work while you study", text: "On-campus jobs, CPT internships, and up to 3 years of OPT after graduation." },
  { title: "Global recognition", text: "A US degree opens doors across India, the Gulf, Europe, and beyond." },
];

const costs = [
  { item: "Tuition (public university)", range: "$12,000 – $25,000 / year" },
  { item: "Tuition (private university)", range: "$28,000 – $55,000 / year" },
  { item: "Living costs", range: "$10,000 – $18,000 / year" },
  { item: "Health insurance", range: "$1,500 – $3,000 / year" },
];

const fields = [
  "Computer Science & Data",
  "Business & MBA",
  "Engineering",
  "Public Health",
  "Biotechnology",
  "Finance & Analytics",
];

const faqs = [
  {
    q: "Do I need to write GRE/GMAT for every university?",
    a: "No. Since 2021, a growing number of graduate programs have gone test-optional. We check current requirements for each shortlisted school before you spend time preparing.",
  },
  {
    q: "How much does it cost to apply?",
    a: "Application fees typically run $50–$120 per university, plus test and score-report fees. We help you budget for 6–10 applications realistically.",
  },
  {
    q: "Can I work part-time as an international student?",
    a: "Yes — F-1 students can work up to 20 hours a week on-campus during the semester, and full-time during official breaks.",
  },
  {
    q: "What's the earliest I should start the process?",
    a: "Ideally 12–14 months before your intended intake, so there's time for tests, shortlisting, essays, and visa scheduling without last-minute stress.",
  },
];

export default function StudyUSA() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUni, setSelectedUni] = useState(null);

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter((uni) => {
      const matchesCategory =
        activeCategory === "All" || uni.category === activeCategory;
      const matchesSearch =
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <PageHero
        eyebrow="Study in the USA"
        title="What studying in America actually looks like — top universities, costs, and timelines"
        subtitle="A plain-English guide to US higher education, featuring premier universities, course offerings, admissions timelines, and campus life."
      />

      {/* Why USA Section */}
      <section className="section usa-reasons">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--sky-deep)" }}>Why the USA</span>
            <h2>What makes it worth the distance</h2>
          </div>
          <div className="usa-reasons__grid">
            {reasons.map((r) => (
              <div className="usa-reason" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Universities & Colleges Section */}
      <section className="section usa-universities">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow" style={{ color: "var(--brand-primary, #0284c7)" }}>
              Institutions & Colleges
            </span>
            <h2>Top US Universities & Colleges</h2>
            <p className="section-subtitle">
              Explore premier American universities. Click on any university card to view detailed course options, annual tuition fees, admission timelines, visa rules, and campus life.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="uni-controls">
            <div className="uni-search-bar">
              <span className="uni-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search university name, city, state, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="uni-search-input"
              />
              {searchQuery && (
                <button className="uni-search-clear" onClick={() => setSearchQuery("")}>
                  ✕
                </button>
              )}
            </div>

            <div className="uni-category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`uni-pill ${activeCategory === cat ? "is-active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Universities Grid */}
          {filteredUniversities.length === 0 ? (
            <div className="uni-empty-state">
              <p>No universities found matching "{searchQuery}". Try clearing filters.</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="uni-grid">
              {filteredUniversities.map((uni) => (
                <div
                  className="uni-card"
                  key={uni.id}
                  onClick={() => setSelectedUni(uni)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedUni(uni)}
                >
                  <div className="uni-card__img-wrapper">
                    <img
                      src={uni.image}
                      alt={uni.name}
                      className="uni-card__img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_FALLBACK_IMAGE;
                      }}
                    />
                    <span className="uni-card__badge">{uni.badge}</span>
                    <span className="uni-card__rank">{uni.ranking}</span>
                  </div>

                  <div className="uni-card__content">
                    <span className="uni-card__type">{uni.type}</span>
                    <h3 className="uni-card__title">{uni.name}</h3>
                    <p className="uni-card__location">📍 {uni.location}</p>

                    <div className="uni-card__quick-info">
                      <div>
                        <span className="uni-card__info-label">Acceptance</span>
                        <strong>{uni.acceptanceRate}</strong>
                      </div>
                      <div>
                        <span className="uni-card__info-label">Programs</span>
                        <strong>{uni.courses.length} Popular Degrees</strong>
                      </div>
                      <div>
                        <span className="uni-card__info-label">Tuition from</span>
                        <strong>{uni.fees.tuition.split(" – ")[0]}</strong>
                      </div>
                    </div>

                    <p className="uni-card__snippet">
                      {uni.overview.substring(0, 110)}...
                    </p>

                    <div className="uni-card__action">
                      <span className="uni-card__btn-text">
                        View Full Details & Courses →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cost Section */}
      <section className="section usa-cost">
        <div className="container usa-cost__grid">
          <div>
            <span className="eyebrow" style={{ color: "var(--marigold-deep, #d97706)" }}>Budgeting</span>
            <h2>A realistic cost breakdown</h2>
            <p className="usa-cost__note">
              Figures are indicative per academic year and vary by state, city,
              and institution. We build a personalised cost sheet during your
              consultation.
            </p>
            <table className="usa-cost__table">
              <tbody>
                {costs.map((c) => (
                  <tr key={c.item}>
                    <td>{c.item}</td>
                    <td>{c.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="usa-fields">
            <h3>Popular fields for Indian students</h3>
            <div className="usa-fields__chips">
              {fields.map((f) => (
                <span key={f} className="usa-fields__chip">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section usa-faq">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--emerald-deep, #059669)" }}>Common questions</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, idx) => (
              <div className={`faq-item ${openFaq === idx ? "is-open" : ""}`} key={f.q}>
                <button
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  aria-expanded={openFaq === idx}
                >
                  {f.q}
                  <span className="faq-item__icon">{openFaq === idx ? "–" : "+"}</span>
                </button>
                {openFaq === idx && <p className="faq-item__answer">{f.a}</p>}
              </div>
            ))}
          </div>
          <div className="usa-faq__cta">
            <NavLink to="/contact" className="btn btn-primary">Get personalised guidance</NavLink>
          </div>
        </div>
      </section>

      {/* Detailed University Info Modal */}
      {selectedUni && (
        <UniversityModal
          university={selectedUni}
          onClose={() => setSelectedUni(null)}
        />
      )}
    </>
  );
}
