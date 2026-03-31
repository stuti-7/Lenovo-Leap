const express = require('express');
const router = express.Router();

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Computer Science', 'English', 'History', 'Geography',
  'Economics', 'Political Science', 'Hindi', 'Sanskrit'
];

router.get('/', (req, res) => {
  res.json(subjects);
});

module.exports = router;
