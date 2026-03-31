const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/subjects', require('./routes/subjects'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    await User.deleteOne({ email: 'admin@edureach.com' });
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({ name: 'Super Admin', email: 'admin@edureach.com', password: hashed, role: 'admin' });
    console.log('Super admin ready: admin@edureach.com / admin123');
  })
  .catch(err => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
