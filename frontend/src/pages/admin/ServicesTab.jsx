import { useEffect, useState, useCallback } from "react";
import { getServices, createService, updateService, deleteService } from "../../api";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function ServicesTab() {
  const { token } = useAdminAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id, token);
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // In a real app we'd parse the items string to JSON if using a textarea
      let parsedItems = currentService.items;
      if (typeof parsedItems === 'string') {
        parsedItems = JSON.parse(parsedItems);
      }
      
      const payload = { ...currentService, items: parsedItems };
      
      if (currentService.id) {
        await updateService(currentService.id, payload, token);
      } else {
        await createService(payload, token);
      }
      setIsEditing(false);
      setCurrentService(null);
      load();
    } catch (err) {
      alert("Error saving: " + err.message);
    }
  };

  const openForm = (service = null) => {
    if (service) {
      setCurrentService({
        ...service,
        items: JSON.stringify(service.items || [], null, 2)
      });
    } else {
      setCurrentService({
        title: "", description: "", icon: "", image: "", color: "", display_order: 0, items: "[]"
      });
    }
    setIsEditing(true);
  };

  if (isEditing && currentService) {
    return (
      <div className="admin-form-wrap">
        <h2>{currentService.id ? "Edit Service" : "Add Service"}</h2>
        <form onSubmit={handleSave} className="admin-form">
          <div className="form-group">
            <label>Title</label>
            <input 
              required
              value={currentService.title} 
              onChange={e => setCurrentService({...currentService, title: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={currentService.description} 
              onChange={e => setCurrentService({...currentService, description: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input 
              value={currentService.image} 
              onChange={e => setCurrentService({...currentService, image: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <input 
              type="color"
              value={currentService.color || "#000000"} 
              onChange={e => setCurrentService({...currentService, color: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Display Order</label>
            <input 
              type="number" 
              value={currentService.display_order} 
              onChange={e => setCurrentService({...currentService, display_order: Number(e.target.value)})} 
            />
          </div>
          <div className="form-group">
            <label>Items (JSON format)</label>
            <textarea 
              rows="10"
              value={currentService.items} 
              onChange={e => setCurrentService({...currentService, items: e.target.value})} 
            />
            <small>Format: {`[{"title": "...", "text": "...", "icon": "..."}]`}</small>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save Service</button>
            <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-dash__toolbar">
        <button className="btn btn-primary" onClick={() => openForm()}>Add New Service</button>
      </div>

      {error && <p className="admin-dash__error">{error}</p>}
      {loading ? <p>Loading services...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.title}</strong></td>
                  <td>{s.description}</td>
                  <td>{s.display_order}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => openForm(s)} style={{marginRight: 8}}>Edit</button>
                    <button className="admin-table__delete" onClick={() => handleDelete(s.id)}>Delete</button>
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
