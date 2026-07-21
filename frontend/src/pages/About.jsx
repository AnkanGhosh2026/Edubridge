import PageHero from "../components/PageHero";
import "./About.css";

const timeline = [
  { year: "2015", text: "Founded in Gurugram by three IIT alumni who studied on US scholarships." },
  { year: "2018", text: "Opened counselling centres in Delhi, Pune, and Ahmedabad." },
  { year: "2021", text: "Crossed 500 direct partnerships with US universities and colleges." },
  { year: "2025", text: "12,400+ students placed; ₹38 Cr+ in scholarships secured to date." },
];

const team = [
  { name: "Rhea Kapoor", role: "Co-founder & Head Counsellor", note: "MS, Columbia University" },
  { name: "Arjun Mehta", role: "Co-founder & Visa Strategist", note: "Former F-1 visa officer trainer" },
  { name: "Sana Iqbal", role: "Head of Test Prep", note: "IELTS & GRE, 8+ years teaching" },
  { name: "Devika Rao", role: "Scholarships Lead", note: "MBA, Indiana University" },
];

const values = [
  { title: "Honesty over hard sell", text: "We tell students when a dream school isn't a fit — and what is." },
  { title: "One counsellor, one student", text: "You keep the same counsellor from first call to your visa interview." },
  { title: "Data-backed advice", text: "Every recommendation is checked against real admit and scholarship data." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About EduBridge Overseas"
        title="We've sat where you're sitting — nervous, excited, and full of questions"
        subtitle="EduBridge Overseas was founded by former international students who wanted Indian applicants to get advice as good as the one they wish they'd had."
      />

      <section className="section about-intro">
        <div className="container about-intro__grid">
          <div className="about-intro__text">
            <span className="eyebrow" style={{ color: "var(--marigold-deep)" }}>Our story</span>
            <h2>Started at a kitchen table in Gurugram, in 2015</h2>
            <p>
              Three friends came back from graduate school in the US and kept
              getting the same call from juniors, cousins, and neighbours:
              "How do I even start?" What began as free advice over chai
              turned into EduBridge Overseas — a counselling practice built
              on the things we wished someone had told us: which programs
              actually hire, which scholarships are real, and how to survive
              a January in Michigan.
            </p>
            <p>
              Today our counsellors have collectively guided over 12,400
              students into US colleges and universities, from community
              colleges to Ivy League graduate programs.
            </p>
          </div>
          <div className="about-intro__values">
            {values.map((v) => (
              <div className="value-card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--sky-deep)" }}>Our journey</span>
            <h2>A decade of getting students on the plane</h2>
          </div>
          <div className="timeline">
            {timeline.map((t) => (
              <div className="timeline__item" key={t.year}>
                <span className="timeline__year">{t.year}</span>
                <div className="timeline__bar" />
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section team-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--emerald-deep)" }}>Meet the counsellors</span>
            <h2>The people behind your application</h2>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div className="team-card" key={member.name}>
                <div className="team-card__avatar" aria-hidden="true">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3>{member.name}</h3>
                <span className="team-card__role">{member.role}</span>
                <p>{member.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
