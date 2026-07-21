import { useState } from "react";
import { submitContact } from "../api";
import "./ContactForm.css";

const courses = [
  "MS in Computer Science",
  "MBA",
  "Undergraduate (Bachelor's)",
  "Data Science / Analytics",
  "Engineering (MS)",
  "Public Health / Healthcare",
  "Not sure yet",
];

const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  interested_course: "",
  message: "",
};

export default function ContactForm({ variant = "card" }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await submitContact(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  if (status === "success") {
    return (
      <div className={`contact-form contact-form--${variant} contact-form__success`}>
        <div className="tag-stamp contact-form__stamp">Received</div>
        <h3>Thanks, we've got your details!</h3>
        <p>
          One of our counsellors will call or email you within one business
          day to schedule your free consultation. Keep an eye on your inbox.
        </p>
        <button className="btn btn-outline" onClick={() => setStatus("idle")}>
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className={`contact-form contact-form--${variant}`} onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <label>
          Full name
          <input
            required
            type="text"
            name="full_name"
            placeholder="Ananya Sharma"
            value={form.full_name}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="contact-form__row contact-form__row--split">
        <label>
          Email address
          <input
            required
            type="email"
            name="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone / WhatsApp number
          <input
            required
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="contact-form__row">
        <label>
          What are you interested in?
          <select
            name="interested_course"
            value={form.interested_course}
            onChange={handleChange}
          >
            <option value="">Select a program</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="contact-form__row">
        <label>
          Tell us a bit more (optional)
          <textarea
            name="message"
            rows={4}
            placeholder="Target intake, budget, preferred states, current GPA/percentage..."
            value={form.message}
            onChange={handleChange}
          />
        </label>
      </div>

      {status === "error" && <p className="contact-form__error">{error}</p>}

      <button className="btn btn-primary btn-block" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Book my free consultation"}
      </button>
      <p className="contact-form__note">
        No spam, ever. We'll only use these details to reach out about your
        study-abroad plans.
      </p>
    </form>
  );
}
