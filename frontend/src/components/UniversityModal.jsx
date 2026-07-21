import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_FALLBACK_IMAGE } from "../data/universitiesData";
import "./UniversityModal.css";

export default function UniversityModal({ university, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!university) return null;

  const handleApplyClick = () => {
    onClose();
    navigate("/contact", { state: { universityName: university.name } });
  };

  return (
    <div className="uni-modal__overlay" onClick={onClose}>
      <div
        className="uni-modal__content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="uni-modal-title"
      >
        <button
          className="uni-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Hero Header */}
        <div className="uni-modal__hero">
          <img
            src={university.image}
            alt={university.name}
            className="uni-modal__hero-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_FALLBACK_IMAGE;
            }}
          />
          <div className="uni-modal__hero-overlay">
            <div className="uni-modal__badges">
              <span className="uni-badge uni-badge--primary">{university.badge}</span>
              <span className="uni-badge uni-badge--secondary">{university.type}</span>
            </div>
            <h2 id="uni-modal-title" className="uni-modal__title">{university.name}</h2>
            <p className="uni-modal__location">
              📍 {university.location} &nbsp;|&nbsp; Est. {university.established}
            </p>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="uni-modal__stats">
          <div className="uni-stat">
            <span className="uni-stat__label">US News Rank</span>
            <span className="uni-stat__val">{university.ranking}</span>
          </div>
          <div className="uni-stat">
            <span className="uni-stat__label">Global Rank</span>
            <span className="uni-stat__val">{university.globalRank}</span>
          </div>
          <div className="uni-stat">
            <span className="uni-stat__label">Acceptance Rate</span>
            <span className="uni-stat__val">{university.acceptanceRate}</span>
          </div>
          <div className="uni-stat">
            <span className="uni-stat__label">Est. Annual Tuition</span>
            <span className="uni-stat__val">{university.fees.tuition.split(" – ")[0]}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="uni-modal__tabs">
          <button
            className={`uni-tab ${activeTab === "overview" ? "is-active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`uni-tab ${activeTab === "courses" ? "is-active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses ({university.courses.length})
          </button>
          <button
            className={`uni-tab ${activeTab === "fees" ? "is-active" : ""}`}
            onClick={() => setActiveTab("fees")}
          >
            Fees & Cost
          </button>
          <button
            className={`uni-tab ${activeTab === "timeline" ? "is-active" : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            Timeline
          </button>
          <button
            className={`uni-tab ${activeTab === "rules" ? "is-active" : ""}`}
            onClick={() => setActiveTab("rules")}
          >
            Rules & Entry
          </button>
          <button
            className={`uni-tab ${activeTab === "regulations" ? "is-active" : ""}`}
            onClick={() => setActiveTab("regulations")}
          >
            Regulations
          </button>
          <button
            className={`uni-tab ${activeTab === "campus" ? "is-active" : ""}`}
            onClick={() => setActiveTab("campus")}
          >
            Campus Life
          </button>
        </nav>

        {/* Tab Body Content */}
        <div className="uni-modal__body">
          {activeTab === "overview" && (
            <div className="uni-tab-panel">
              <h3>About {university.name}</h3>
              <p className="uni-paragraph">{university.overview}</p>
              <div className="uni-highlights-box">
                <h4>Key Highlights</h4>
                <ul>
                  <li><strong>Category:</strong> {university.category}</li>
                  <li><strong>Institution Type:</strong> {university.type}</li>
                  <li><strong>Location:</strong> {university.location}</li>
                  <li><strong>Acceptance Rate:</strong> {university.acceptanceRate}</li>
                  <li><strong>Primary Visa:</strong> F-1 Student Visa</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="uni-tab-panel">
              <h3>Popular Degrees & Programs</h3>
              <p className="uni-tab-sub font-sm">
                Below are top programs pursued by international students at {university.name}.
              </p>
              <div className="uni-courses-list">
                {university.courses.map((course, idx) => (
                  <div key={idx} className="uni-course-card">
                    <div className="uni-course-card__header">
                      <h4>{course.degree}</h4>
                      <span className="uni-tag">{course.intake} Intake</span>
                    </div>
                    <div className="uni-course-card__details">
                      <div><span>Duration:</span> {course.duration}</div>
                      <div><span>Tuition:</span> {course.fee}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "fees" && (
            <div className="uni-tab-panel">
              <h3>Financial Cost Breakdown</h3>
              <p className="uni-tab-sub">
                Estimated budget for one academic year at {university.name}.
              </p>
              <div className="uni-fees-table">
                <div className="uni-fee-row">
                  <span>Tuition Range</span>
                  <strong>{university.fees.tuition}</strong>
                </div>
                <div className="uni-fee-row">
                  <span>Living & Housing Expenses</span>
                  <strong>{university.fees.livingCost}</strong>
                </div>
                <div className="uni-fee-row">
                  <span>Health Insurance</span>
                  <strong>{university.fees.healthInsurance}</strong>
                </div>
                <div className="uni-fee-row">
                  <span>Books & Supplies</span>
                  <strong>{university.fees.booksAndSupplies}</strong>
                </div>
                <div className="uni-fee-row uni-fee-row--total">
                  <span>Estimated Total 1st Year Cost</span>
                  <strong>{university.fees.totalEstimate}</strong>
                </div>
              </div>

              <div className="uni-scholarship-box">
                <h4>🎓 Scholarships & Funding Assistance</h4>
                <p>{university.fees.scholarships}</p>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="uni-tab-panel">
              <h3>Admission Timeline & Key Deadlines</h3>
              <p className="uni-tab-sub">
                Planned milestone roadmap for Indian & international applicants.
              </p>
              <div className="uni-timeline">
                {university.timeline.map((step, idx) => (
                  <div key={idx} className="uni-timeline__step">
                    <div className="uni-timeline__num">{idx + 1}</div>
                    <div className="uni-timeline__content">
                      <h4>{step.phase}</h4>
                      <span className="uni-timeline__date">📅 {step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div className="uni-tab-panel">
              <h3>Admission Rules & Criteria</h3>
              <div className="uni-rules-grid">
                <div className="uni-rule-card">
                  <h4>📊 Minimum GPA Expectation</h4>
                  <p>{university.rules.gpa}</p>
                </div>
                <div className="uni-rule-card">
                  <h4>🗣️ English Language Proficiency</h4>
                  <p>{university.rules.englishTest}</p>
                </div>
                <div className="uni-rule-card">
                  <h4>📝 Standardized Test Policy (GRE / GMAT)</h4>
                  <p>{university.rules.standardizedTests}</p>
                </div>
                <div className="uni-rule-card">
                  <h4>💼 Work Authorization & Rights</h4>
                  <p>{university.rules.workRights}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "regulations" && (
            <div className="uni-tab-panel">
              <h3>Visa & Institutional Regulations</h3>
              <div className="uni-reg-list">
                <div className="uni-reg-item">
                  <h4>🛂 Visa Classification</h4>
                  <p>{university.regulations.visaType}</p>
                </div>
                <div className="uni-reg-item">
                  <h4>💵 Financial Proof Requirement for I-20</h4>
                  <p>{university.regulations.financialProof}</p>
                </div>
                <div className="uni-reg-item">
                  <h4>🏥 Mandatory Medical & Health Insurance</h4>
                  <p>{university.regulations.healthReq}</p>
                </div>
                <div className="uni-reg-item">
                  <h4>📜 Academic Maintenance of Status</h4>
                  <p>{university.regulations.statusMaintenance}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "campus" && (
            <div className="uni-tab-panel">
              <h3>Campus Life & Environment</h3>
              <div className="uni-campus-grid">
                <div className="uni-campus-card">
                  <h4>🏠 Accommodation & Housing</h4>
                  <p>{university.campusLife.housing}</p>
                </div>
                <div className="uni-campus-card">
                  <h4>🎨 Student Clubs & Organizations</h4>
                  <p>{university.campusLife.clubs}</p>
                </div>
                <div className="uni-campus-card">
                  <h4>🏙️ Location & City Vibe</h4>
                  <p>{university.campusLife.locationVibe}</p>
                </div>
                <div className="uni-campus-card">
                  <h4>☀️ Climate & Weather</h4>
                  <p>{university.campusLife.climate}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="uni-modal__footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleApplyClick}>
            Apply / Inquire for {university.name}
          </button>
        </div>
      </div>
    </div>
  );
}
