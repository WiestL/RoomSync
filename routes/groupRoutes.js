// routes/groupRoutes.js

const express = require('express');
const { createGroup, joinGroup } = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createGroup);
router.post('/:groupId/join', authMiddleware, joinGroup);
router.post('/join', authMiddleware, joinGroupByInvitationCode);

module.exports = router;
