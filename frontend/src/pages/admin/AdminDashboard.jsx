import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import BackButton from "../../components/BackButton";
import SubmissionsTab from "./SubmissionsTab";
import ServicesTab from "./ServicesTab";
import UniversitiesTab from "./UniversitiesTab";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { token, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("submissions");

  if (!token) return <Navigate to="/admin" replace />;

  return (
    <div className="admin-dash">
      <header className="admin-dash__header">
        <div className="container admin-dash__header-inner">
          <div>
            <BackButton fallbackPath="/" />
            <span className="tag-stamp admin-dash__stamp">Admin dashboard</span>
            <h1>Manage Content</h1>
          </div>
          <button className="btn btn-outline" onClick={logout}>Log out</button>
        </div>
      </header>
      
      <div className="container admin-tabs-wrap">
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === "submissions" ? "is-active" : ""}`}
            onClick={() => setActiveTab("submissions")}
          >
            Enquiries
          </button>
          <button 
            className={`admin-tab ${activeTab === "services" ? "is-active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
          <button 
            className={`admin-tab ${activeTab === "universities" ? "is-active" : ""}`}
            onClick={() => setActiveTab("universities")}
          >
            Universities
          </button>
        </div>
      </div>

      <div className="container admin-dash__body">
        {activeTab === "submissions" && <SubmissionsTab />}
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "universities" && <UniversitiesTab />}
      </div>
    </div>
  );
}
