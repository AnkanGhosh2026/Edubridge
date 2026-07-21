import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import "./AuthModal.css";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    setAuthModalMode,
    login,
    signup,
  } = useUserAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
    setFullName("");
    setEmail("");
    setPassword("");
  }, [authModalMode, isAuthModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeAuthModal();
    };
    if (isAuthModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (authModalMode === "login") {
        await login(email, password);
      } else {
        if (!fullName.trim()) {
          throw new Error("Full name is required.");
        }
        await signup(fullName, email, password);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal__overlay" onClick={closeAuthModal}>
      <div
        className="auth-modal__content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="auth-modal__close"
          onClick={closeAuthModal}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="auth-modal__header">
          <div className="auth-modal__logo-mark">EB</div>
          <h3>{authModalMode === "login" ? "Welcome Back" : "Create your account"}</h3>
          <p>
            {authModalMode === "login"
              ? "Sign in to access personalized counseling & shortlisting"
              : "Join EduBridge Overseas for expert US university guidance"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-modal__tabs">
          <button
            className={`auth-tab ${authModalMode === "login" ? "is-active" : ""}`}
            onClick={() => setAuthModalMode("login")}
            type="button"
          >
            User Login
          </button>
          <button
            className={`auth-tab ${authModalMode === "signup" ? "is-active" : ""}`}
            onClick={() => setAuthModalMode("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>

        {error && <div className="auth-modal__error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-modal__form">
          {authModalMode === "signup" && (
            <div className="form-group">
              <label htmlFor="auth-fullname">Full Name</label>
              <input
                id="auth-fullname"
                type="text"
                placeholder="e.g. Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              placeholder="e.g. student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : authModalMode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <div className="auth-modal__footer">
          {authModalMode === "login" ? (
            <p>
              Don't have an account yet?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => setAuthModalMode("signup")}
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => setAuthModalMode("login")}
              >
                Log in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
