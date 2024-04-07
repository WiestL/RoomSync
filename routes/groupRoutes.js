// routes/groupRoutes.js

const express = require('express');
const { createGroup, joinGroup, getGroupStatuses, joinGroupByInvitationCode, checkGroupMembership } = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');
const groceryRoutes = require('./groceryRoutes');
const router = express.Router();

router.get('/check-membership/:userId', authMiddleware, checkGroupMembership);
router.use('/:groupId/items', groceryRoutes);
router.get('/:groupId/statuses', authMiddleware, getGroupStatuses);
router.post('/', authMiddleware, createGroup);
router.post('/:groupId/join', authMiddleware, joinGroup);
router.post('/join', authMiddleware, joinGroupByInvitationCode);

module.exports = router;
