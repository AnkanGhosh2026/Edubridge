import { useNavigate } from "react-router-dom";
import "./BackButton.css";

export default function BackButton({ label = "Back", fallbackPath = "/", className = "", variant = "dark" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  const variantClass = variant === "light" ? "back-btn--light" : "";

  return (
    <button
      type="button"
      className={`back-btn ${variantClass} ${className}`.trim()}
      onClick={handleBack}
      aria-label="Go back to previous page"
    >
      <svg
        className="back-btn__icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      <span className="back-btn__label">{label}</span>
    </button>
  );
}
