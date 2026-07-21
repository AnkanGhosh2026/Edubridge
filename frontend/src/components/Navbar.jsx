import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import AuthModal from "./AuthModal";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/study-in-usa", label: "Study in USA" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout, openAuthModal } = useUserAuth();
  const dropdownRef = useRef(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <NavLink to="/" className="nav__logo" onClick={() => setOpen(false)}>
            <span className="nav__logo-mark">EB</span>
            <span className="nav__logo-text">
              EduBridge<span className="nav__logo-sub">Overseas</span>
            </span>
          </NavLink>

          <nav className={`nav__links ${open ? "is-open" : ""}`}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `nav__link ${isActive ? "is-active" : ""}`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Top Right Controls */}
            <div className="nav__auth-group">
              <NavLink
                to="/admin"
                className="nav__admin-link"
                onClick={() => setOpen(false)}
                title="Admin Management Portal"
              >
                🛡️ Admin Portal
              </NavLink>

              {user ? (
                <div className="nav__user-menu" ref={dropdownRef}>
                  <button
                    className="nav__user-badge"
                    onClick={() => setDropdownOpen((v) => !v)}
                    aria-expanded={dropdownOpen}
                  >
                    <span className="nav__user-avatar">
                      {user.full_name.charAt(0).toUpperCase()}
                    </span>
                    <span className="nav__user-name">{user.full_name}</span>
                    <span className="nav__user-caret">▾</span>
                  </button>

                  {dropdownOpen && (
                    <div className="nav__dropdown">
                      <div className="nav__dropdown-header">
                        <strong>{user.full_name}</strong>
                        <span>{user.email}</span>
                      </div>
                      <div className="nav__dropdown-divider" />
                      <NavLink
                        to="/admin"
                        className="nav__dropdown-item"
                        onClick={() => {
                          setDropdownOpen(false);
                          setOpen(false);
                        }}
                      >
                        🛡️ Admin Dashboard
                      </NavLink>
                      <button
                        className="nav__dropdown-item nav__dropdown-item--logout"
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                          setOpen(false);
                        }}
                      >
                        🚪 Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="btn btn-outline nav__login-btn"
                  onClick={() => {
                    openAuthModal("login");
                    setOpen(false);
                  }}
                >
                  Login / Sign Up
                </button>
              )}

              <NavLink
                to="/contact"
                className="btn btn-primary nav__cta"
                onClick={() => setOpen(false)}
              >
                Free Consultation
              </NavLink>
            </div>
          </nav>

          <button
            className={`nav__toggle ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Global Auth Modal */}
      <AuthModal />
    </>
  );
}
