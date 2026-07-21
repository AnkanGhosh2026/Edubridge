import { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { getSubmissions, getStats, updateSubmission, deleteSubmission } from "../../api";
import { useAdminAuth } from "../../context/AdminAuthContext";
import BackButton from "../../components/BackButton";
import "./AdminDashboard.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "reviewed", label: "Reviewed" },
];

export default function AdminDashboard() {
  const { token, logout } = useAdminAuth();
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [subs, statData] = await Promise.all([
        getSubmissions(token),
        getStats(token),
      ]);
      setSubmissions(subs);
      setStats(statData);
    } catch (err) {
      setError(err.message);
      if (err.message.toLowerCase().includes("expired") || err.message.toLowerCase().includes("invalid")) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  if (!token) return <Navigate to="/admin" replace />;

  const toggleReviewed = async (id, current) => {
    try {
      await updateSubmission(id, !current, token);
      setSubmissions((subs) =>
        subs.map((s) => (s.id === id ? { ...s, is_reviewed: !current } : s))
      );
      setStats((s) =>
        s
          ? {
              ...s,
              reviewed: current ? s.reviewed - 1 : s.reviewed + 1,
              pending: current ? s.pending + 1 : s.pending - 1,
            }
          : s
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry? This can't be undone.")) return;
    try {
      await deleteSubmission(id, token);
      setSubmissions((subs) => subs.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filtered = submissions.filter((s) => {
    if (filter === "pending") return !s.is_reviewed;
    if (filter === "reviewed") return s.is_reviewed;
    return true;
  });

  return (
    <div className="admin-dash">
      <header className="admin-dash__header">
        <div className="container admin-dash__header-inner">
          <div>
            <BackButton fallbackPath="/" />
            <span className="tag-stamp admin-dash__stamp">Admin dashboard</span>
            <h1>Enquiry submissions</h1>
          </div>
          <button className="btn btn-outline" onClick={logout}>Log out</button>
        </div>
      </header>

      <div className="container admin-dash__body">
        {stats && (
          <div className="admin-stats">
            <div className="admin-stat">
              <strong>{stats.total_submissions}</strong>
              <span>Total enquiries</span>
            </div>
            <div className="admin-stat">
              <strong>{stats.new_this_week}</strong>
              <span>New this week</span>
            </div>
            <div className="admin-stat admin-stat--pending">
              <strong>{stats.pending}</strong>
              <span>Pending follow-up</span>
            </div>
            <div className="admin-stat admin-stat--reviewed">
              <strong>{stats.reviewed}</strong>
              <span>Reviewed</span>
            </div>
          </div>
        )}

        <div className="admin-dash__toolbar">
          <div className="admin-filters">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`admin-filter ${filter === f.key ? "is-active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button className="btn btn-outline admin-dash__refresh" onClick={load}>
            Refresh
          </button>
        </div>

        {error && <p className="admin-dash__error">{error}</p>}

        {loading ? (
          <p className="admin-dash__loading">Loading submissions...</p>
        ) : filtered.length === 0 ? (
          <div className="admin-dash__empty">
            <p>No enquiries here yet. New submissions from the Contact page will show up automatically.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Interested in</th>
                  <th>Message</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td className="admin-table__name">{s.full_name}</td>
                    <td>
                      <a href={`mailto:${s.email}`}>{s.email}</a>
                      <br />
                      <a href={`tel:${s.phone}`}>{s.phone}</a>
                    </td>
                    <td>{s.interested_course || "—"}</td>
                    <td className="admin-table__message">{s.message || "—"}</td>
                    <td>{new Date(s.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td>
                      <button
                        className={`admin-status ${s.is_reviewed ? "is-reviewed" : "is-pending"}`}
                        onClick={() => toggleReviewed(s.id, s.is_reviewed)}
                      >
                        {s.is_reviewed ? "Reviewed" : "Pending"}
                      </button>
                    </td>
                    <td>
                      <button className="admin-table__delete" onClick={() => handleDelete(s.id)} aria-label="Delete">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
