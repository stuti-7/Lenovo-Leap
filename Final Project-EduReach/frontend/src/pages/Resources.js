import React, { useState, useEffect } from 'react';
import API from '../api';
import './Resources.css';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ subject: '', type: '', level: '', search: '' });

  useEffect(() => {
    API.get('/subjects').then(r => setSubjects(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });
    API.get(`/resources?${params}`)
      .then(r => setResources(r.data))
      .finally(() => setLoading(false));
  }, [filters]);


  return (
    <div className="resources-page">
      <div className="resources-hero">
        <div className="page-container">
          <h1>Browse Resources</h1>
          <p>Free study materials for every subject and level</p>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by title..."
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="page-container resources-body">
        {/* Filters */}
        <div className="filters-panel">
          <h3>Filters</h3>

          <div className="filter-group">
            <label>Subject</label>
            <select value={filters.subject} onChange={e => setFilters({ ...filters, subject: e.target.value })}>
              <option value="">All Subjects</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Type</label>
            <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
              <option value="">All Types</option>
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
              <option value="article">Article</option>
              <option value="quiz">Quiz</option>
              <option value="notes">Notes</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Level</label>
            <select value={filters.level} onChange={e => setFilters({ ...filters, level: e.target.value })}>
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <button className="btn-secondary" style={{ width: '100%', marginTop: '8px' }}
            onClick={() => setFilters({ subject: '', type: '', level: '', search: '' })}>
            Clear Filters
          </button>
        </div>

        {/* Grid */}
        <div className="resources-main">
          <div className="results-header">
            <span>{resources.length} resource{resources.length !== 1 ? 's' : ''} found</span>
          </div>

          {loading ? (
            <div className="loading-state">Loading resources...</div>
          ) : resources.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: 48 }}>📭</div>
              <h3>No resources found</h3>
              <p>Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="resources-grid">
              {resources.map(r => (
                <div key={r._id} className="resource-card card">
                  <div className="resource-card-top">
                    <span className="resource-type-icon">{'📌'}</span>
                    <div className="resource-badges">
                      <span className={`badge badge-${r.type}`}>{r.type}</span>
                      <span className={`badge badge-${r.level}`}>{r.level}</span>
                    </div>
                  </div>
                  <h3 className="resource-title">{r.title}</h3>
                  <p className="resource-desc">{r.description}</p>
                  <div className="resource-meta">
                    <span className="resource-subject">{r.subject}</span>
                    {r.language !== 'English' && <span className="resource-lang">{r.language}</span>}
                  </div>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                      Access Resource →
                    </button>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
