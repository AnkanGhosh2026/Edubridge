import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark">EB</span>
            <span>EduBridge Overseas</span>
          </div>
          <p className="footer__tagline">
            Helping Indian students find their way to the right US campus —
            from shortlisting universities to landing at the airport.
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">FB</a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">IG</a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">IN</a>
            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer">YT</a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/study-in-usa">Study in USA</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Get in touch</h4>
          <ul>
            <li>
              <a href="tel:+911140001234">+91 11 4000 1234</a>
            </li>
            <li>
              <a href="mailto:admissions@edubridgeoverseas.com">
                admissions@edubridgeoverseas.com
              </a>
            </li>
            <li className="footer__address">
              4th Floor, Signature Towers,<br />
              Sector 15, Gurugram, Haryana 122001, India
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Office hours</h4>
          <ul>
            <li>Mon – Sat: 10:00 AM – 7:00 PM</li>
            <li>Sunday: By appointment</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} EduBridge Overseas Consultants Pvt. Ltd.</span>
          <NavLink to="/admin" className="footer__admin-link">Admin login</NavLink>
        </div>
      </div>
    </footer>
  );
}
