const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const auth = require('../middleware/auth');

// Get all resources (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { subject, type, level, search } = req.query;
    let query = {};

    if (subject) query.subject = subject;
    if (type) query.type = type;
    if (level) query.level = level;
    if (search) query.title = { $regex: search, $options: 'i' };

    const resources = await Resource.find(query).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single resource
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add resource (admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'Educator') return res.status(403).json({ message: 'Access required' });

    const resource = new Resource({ ...req.body, addedBy: req.user.id });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update resource (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'Educator') return res.status(403).json({ message: 'Access required' });

    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete resource (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'Educator') return res.status(403).json({ message: 'Access required' });

    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Stats for dashboard
router.get('/stats/overview', async (req, res) => {
  try {
    const total = await Resource.countDocuments();
    const bySubject = await Resource.aggregate([{ $group: { _id: '$subject', count: { $sum: 1 } } }]);
    const byType = await Resource.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]);
    res.json({ total, bySubject, byType });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
