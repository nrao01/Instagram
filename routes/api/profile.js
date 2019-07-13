const express = require('express');
const router = express.Router();
router.get('/test', (req, res) => res.json({
    msg: 'Profile works!'  //key is msg and value is                        user works
}));

module.exports = router;