const express = require('express');
const router = express.Router();
const cAuth = require('../controllers/auth.controller');
const verifyToken = require('../controllers/verifyToken');

router.get('/', (req, res) => {
    res.send('hello world');
});

router.post('/signup', cAuth.signup);
router.post('/signin', cAuth.signin);
router.get('/me', verifyToken, cAuth.profile);

module.exports = router;