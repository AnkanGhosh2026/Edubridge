import PageHero from "../components/PageHero";
import ContactForm from "../components/ContactForm";
import "./Contact.css";

const info = [
  {
    label: "Phone / WhatsApp",
    value: "+91 11 4000 1234",
    href: "tel:+911140001234",
    icon: "📞",
  },
  {
    label: "Email",
    value: "admissions@edubridgeoverseas.com",
    href: "mailto:admissions@edubridgeoverseas.com",
    icon: "✉️",
  },
  {
    label: "Office address",
    value: "4th Floor, Signature Towers, Sector 15, Gurugram, Haryana 122001",
    href: "https://maps.google.com/?q=Signature+Towers+Sector+15+Gurugram",
    icon: "📍",
  },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's map out your US application timeline"
        subtitle="Fill the form and a counsellor will reach out within one business day — or call/WhatsApp us directly during office hours."
      />

      <section className="section contact-section">
        <div className="container contact-section__grid">
          <div className="contact-info">
            {info.map((i) => (
              <a className="contact-info__item" href={i.href} key={i.label} target="_blank" rel="noreferrer">
                <span className="contact-info__icon">{i.icon}</span>
                <div>
                  <span className="contact-info__label">{i.label}</span>
                  <span className="contact-info__value">{i.value}</span>
                </div>
              </a>
            ))}

            <div className="contact-info__hours">
              <span className="contact-info__label">Office hours</span>
              <p>Mon – Sat: 10:00 AM – 7:00 PM<br />Sunday: By appointment</p>
            </div>

            <div className="contact-info__socials">
              <span className="contact-info__label">Follow us</span>
              <div className="contact-info__social-links">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                ))}
              </div>
            </div>

            <div className="contact-info__map" role="img" aria-label="Map location placeholder for the Gurugram office">
              <span>📍 Signature Towers, Sector 15, Gurugram</span>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
