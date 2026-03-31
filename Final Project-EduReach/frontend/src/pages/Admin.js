import React, { useState, useEffect } from 'react';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const emptyForm = {
  title: '', description: '', subject: '', type: 'video',
  url: '', level: 'beginner', language: 'English'
};

export default function Admin() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('add');

  useEffect(() => {
    API.get('/subjects').then(r => setSubjects(r.data));
    fetchResources();
  }, []);

  const fetchResources = () => {
    API.get('/resources').then(r => setResources(r.data));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  setLoading(true);

  try {
    await API.post('/resources', form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setSuccess('Resource added successfully!');
    setForm(emptyForm);
    fetchResources();
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || 'Failed to add resource');
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    try {
      await API.delete(`/resources/${id}`);
      setResources(resources.filter(r => r._id !== id));
    } catch {
      alert('Failed to delete');
    }
  };

  if (user?.role !== 'admin' && user?.role !== 'Educator') {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: 48 }}>🔒</div>
        <h2 style={{ marginTop: 16 }}>Admin Access Required</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>You need admin privileges to view this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <div className="page-container">
          <h1>Admin Panel</h1>
          <p>Manage study resources for students</p>
        </div>
      </div>

      <div className="page-container admin-body">
        <div className="admin-tabs">
          <button className={`tab-btn ${tab === 'add' ? 'active' : ''}`} onClick={() => setTab('add')}>
            ➕ Add Resource
          </button>
          <button className={`tab-btn ${tab === 'manage' ? 'active' : ''}`} onClick={() => setTab('manage')}>
            Manage Resources ({resources.length})
          </button>
        </div>

        {tab === 'add' && (
          <div className="admin-form-card card">
            <h2>Add New Resource</h2>
            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input type="text" placeholder="Resource title" value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required>
                    <option value="">Select subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea placeholder="Brief description of the resource" value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3} required style={{ resize: 'vertical' }} />
              </div>

              <div className="form-group">
                <label>Resource URL *</label>
                <input type="url" placeholder="https://..." value={form.url}
                  onChange={e => setForm({ ...form, url: e.target.value })} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                    <option value="article">Article</option>
                    <option value="quiz">Quiz</option>
                    <option value="notes">Notes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Level</label>
                  <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              <button className="btn-primary" type="submit" disabled={loading} style={{ padding: '14px 40px' }}>
                {loading ? 'Adding...' : 'Add Resource'}
              </button>
            </form>
          </div>
        )}

        {tab === 'manage' && (
          <div className="manage-section">
            {resources.length === 0 ? (
              <div className="empty-state" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: 48 }}>📭</div>
                <h3 style={{ marginTop: 16 }}>No resources yet</h3>
                <p>Add your first resource from the Add tab</p>
              </div>
            ) : (
              <div className="manage-table">
                <div className="table-header">
                  <span>Title</span>
                  <span>Subject</span>
                  <span>Type</span>
                  <span>Level</span>
                  <span>Actions</span>
                </div>
                {resources.map(r => (
                  <div key={r._id} className="table-row">
                    <span className="row-title">{r.title}</span>
                    <span className="row-subject">{r.subject}</span>
                    <span><span className={`badge badge-${r.type}`}>{r.type}</span></span>
                    <span><span className={`badge badge-${r.level}`}>{r.level}</span></span>
                    <span>
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: 12, marginRight: 8 }}>View</button>
                      </a>
                      <button className="btn-danger" onClick={() => handleDelete(r._id)}>Delete</button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
