// controllers/statusUpdateController.js
const { createStatusUpdate } = require('../models/statusUpdate');

const postStatusUpdate = async (req, res) => {
    try {
        const { userId, statusText, wantVisitors } = req.body;
        const updateId = await createStatusUpdate(userId, statusText, wantVisitors);
        res.status(201).send({ updateId, message: "Status update posted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { postStatusUpdate };
