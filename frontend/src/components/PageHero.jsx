import BackButton from "./BackButton";
import "./PageHero.css";

export default function PageHero({ eyebrow, title, subtitle, stamp }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <BackButton />
        <span className="eyebrow page-hero__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {stamp && <span className="tag-stamp page-hero__stamp">{stamp}</span>}
      </div>
    </section>
  );
}
