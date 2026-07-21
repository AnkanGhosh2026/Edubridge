import { useEffect, useState, useCallback } from "react";
import { getUniversities, createUniversity, updateUniversity, deleteUniversity } from "../../api";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function UniversitiesTab() {
  const { token } = useAdminAuth();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentUni, setCurrentUni] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUniversities();
      setUniversities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (slug) => {
    if (!window.confirm("Delete this university?")) return;
    try {
      await deleteUniversity(slug, token);
      setUniversities(universities.filter(u => u.id !== slug));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...currentUni };
      // Parse JSON fields
      const jsonFields = ["courses", "fees", "timeline", "rules", "regulations", "campus_life"];
      for (const field of jsonFields) {
        if (typeof payload[field] === 'string' && payload[field].trim() !== '') {
          try {
             payload[field] = JSON.parse(payload[field]);
          } catch (e) {
             alert(`Invalid JSON in ${field}`);
             return;
          }
        }
      }
      
      if (isNew) {
        await createUniversity(payload, token);
      } else {
        await updateUniversity(currentUni.id, payload, token);
      }
      setIsEditing(false);
      setCurrentUni(null);
      load();
    } catch (err) {
      alert("Error saving: " + err.message);
    }
  };

  const openForm = (uni = null) => {
    if (uni) {
      const formattedUni = { ...uni };
      const jsonFields = ["courses", "fees", "timeline", "rules", "regulations", "campus_life"];
      for (const field of jsonFields) {
        formattedUni[field] = formattedUni[field] ? JSON.stringify(formattedUni[field], null, 2) : "";
      }
      setCurrentUni(formattedUni);
      setIsNew(false);
    } else {
      setCurrentUni({
        id: "", name: "", category: "", location: "", state: "", type: "", 
        established: "", ranking: "", global_rank: "", acceptance_rate: "", 
        image: "", badge: "", overview: "",
        courses: "[]", fees: "{}", timeline: "[]", rules: "{}", regulations: "{}", campus_life: "{}"
      });
      setIsNew(true);
    }
    setIsEditing(true);
  };

  if (isEditing && currentUni) {
    return (
      <div className="admin-form-wrap">
        <h2>{isNew ? "Add University" : "Edit University"}</h2>
        <form onSubmit={handleSave} className="admin-form">
          <div className="form-group">
            <label>ID (Slug) - Used for URL</label>
            <input 
              required
              disabled={!isNew}
              value={currentUni.id} 
              onChange={e => setCurrentUni({...currentUni, id: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input 
              required
              value={currentUni.name} 
              onChange={e => setCurrentUni({...currentUni, name: e.target.value})} 
            />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div className="form-group">
              <label>Location</label>
              <input value={currentUni.location || ""} onChange={e => setCurrentUni({...currentUni, location: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input value={currentUni.type || ""} onChange={e => setCurrentUni({...currentUni, type: e.target.value})} />
            </div>
          </div>
          
          <div className="form-group">
            <label>Overview</label>
            <textarea 
              rows="4"
              value={currentUni.overview || ""} 
              onChange={e => setCurrentUni({...currentUni, overview: e.target.value})} 
            />
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
             <div className="form-group">
               <label>Courses (JSON)</label>
               <textarea rows="6" value={currentUni.courses} onChange={e => setCurrentUni({...currentUni, courses: e.target.value})} />
             </div>
             <div className="form-group">
               <label>Fees (JSON)</label>
               <textarea rows="6" value={currentUni.fees} onChange={e => setCurrentUni({...currentUni, fees: e.target.value})} />
             </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save University</button>
            <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-dash__toolbar">
        <button className="btn btn-primary" onClick={() => openForm()}>Add New University</button>
      </div>

      {error && <p className="admin-dash__error">{error}</p>}
      {loading ? <p>Loading universities...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {universities.map(u => (
                <tr key={u.id}>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.location}</td>
                  <td>{u.type}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => openForm(u)} style={{marginRight: 8}}>Edit</button>
                    <button className="admin-table__delete" onClick={() => handleDelete(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
