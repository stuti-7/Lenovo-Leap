import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
console.log("DASHBOARD RENDERED");
export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
  title: '',
  subject: '',
  description: '',
  url: '',
  type: 'video',
  level: 'beginner',
  language: 'English'
});

const [msg, setMsg] = useState('');
  useEffect(() => {
    API.get('/resources/stats/overview').then(r => setStats(r.data));
    API.get('/resources?').then(r => setRecent(r.data.slice(0, 6)));
  }, []);

const handleAddResource = async (e) => {
  e.preventDefault();
  setMsg('');

  try {
    await API.post('/resources', form);

    setMsg('Resource added!');
    setForm({
      title: '',
      subject: '',
      description: '',
      url: '',
      type: 'video',
      level: 'beginner',
      language: 'English'
    });

  } catch (err) {
    console.error(err);
    setMsg('Failed to add resource');
  }
}; 
  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div className="page-container">

  <div style={{ marginBottom: '30px' }}>
    <h1>Welcome, {user?.name?.split(' ')}</h1>
    <p>Here's your learning overview</p>
    <div style={{ marginTop: '20px' }}>

  {user?.role === 'Educator' && (
    <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
      <h2>Add Resource</h2>

      {msg && <p>{msg}</p>}

      <form onSubmit={handleAddResource}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          placeholder="Subject"
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          placeholder="URL"
          value={form.url}
          onChange={e => setForm({ ...form, url: e.target.value })}
          required
        />

        <button
  className="btn-primary"
  type="submit"
  onClick={handleAddResource}
>
          Add Resource
        </button>
      </form>
    </div>
  )}

</div>
</div>
        </div>
      </div>

      <div className="page-container dashboard-body">
        {/* Stats */}
        {stats && (
          <div className="dash-stats">
            <div className="dash-stat-card">
              <div>
                <div className="dash-stat-num">{stats.total}</div>
                <div className="dash-stat-label">Total Resources</div>
              </div>
            </div>
            <div className="dash-stat-card">
              <div>
                <div className="dash-stat-num">{stats.bySubject?.length || 0}</div>
                <div className="dash-stat-label">Subjects Available</div>
              </div>
            </div>
            <div className="dash-stat-card">
              <div>
                <div className="dash-stat-num">{stats.byType?.find(t => t._id === 'video')?.count || 0}</div>
                <div className="dash-stat-label">Video Lessons</div>
              </div>
            </div>
            <div className="dash-stat-card">
              <div>
                <div className="dash-stat-num">{stats.byType?.find(t => t._id === 'pdf')?.count || 0}</div>
                <div className="dash-stat-label">PDF Resources</div>
              </div>
            </div>
          </div>
        )}

        {/* Subject breakdown */}
        {stats?.bySubject?.length > 0 && (
          <div className="dash-section">
            <h2>Resources by Subject</h2>
            <div className="subject-grid">
              {stats.bySubject.slice(0, 8).map(s => (
                <Link to={`/resources?subject=${s._id}`} key={s._id} className="subject-chip">
                  <span className="subject-name">{s._id}</span>
                  <span className="subject-count">{s.count}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recently added */}
        <div className="dash-section">
          <div className="dash-section-header">
            <h2>Recently Added</h2>
            <Link to="/resources" className="view-all">View All →</Link>
          </div>
          <div className="recent-grid">
            {recent.map(r => (
              <div key={r._id} className="recent-card card">
                <div className="recent-info">
                  <h4>{r.title}</h4>
                  <span className="recent-subject">{r.subject}</span>
                </div>
                <span className={`badge badge-${r.type}`}>{r.type}</span>
              </div>
            ))}
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="admin-cta">
            <div>
              <h3>Admin Panel</h3>
              <p>Add, edit, or remove study resources</p>
            </div>
            <Link to="/admin"><button className="btn-primary">Go to Admin →</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}