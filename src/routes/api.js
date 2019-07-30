const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('respond with a check');
});

router.get('/login', (req, res) => {
  res.send('user login');
});

module.exports = router;
