const API_URL = import.meta.env.VITE_API_URL || "https://edubridge-63uu.onrender.com";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const message = data?.detail || "Something went wrong. Please try again.";
    throw new Error(typeof message === "string" ? message : "Request failed");
  }

  return data;
}

export const submitContact = (payload) =>
  request("/api/contact", { method: "POST", body: payload });

export const adminLogin = (username, password) =>
  request("/api/admin/login", { method: "POST", body: { username, password } });

export const getSubmissions = (token) =>
  request("/api/admin/submissions", { token });

export const getStats = (token) => request("/api/admin/stats", { token });

export const updateSubmission = (id, isReviewed, token) =>
  request(`/api/admin/submissions/${id}`, {
    method: "PATCH",
    body: { is_reviewed: isReviewed },
    token,
  });

export const deleteSubmission = (id, token) =>
  request(`/api/admin/submissions/${id}`, { method: "DELETE", token });
