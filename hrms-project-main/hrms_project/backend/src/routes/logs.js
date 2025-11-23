const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const controller = require('../controllers/logController');
router.use(authMiddleware);
router.get('/', controller.list);
module.exports = router;
