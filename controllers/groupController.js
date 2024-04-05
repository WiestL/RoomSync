// controllers/groupController.js

const { createGroup, getGroupByInvitationCode, addMemberToGroup } = require("../models/group");

//Creates a new group
exports.createGroup = async (req, res) => {
    try{
        const { groupName } = req.body;
        const userId = req.user.id; // The ID of the user creating the group

        // Create the group and get its ID and invitationCode
        const { groupId, invitationCode } = await createGroup(groupName);

        // Add the creator as a member of the group
        await addMemberToGroup(userId, groupId);

        res.status(201).send({ groupId, invitationCode, message: "Group created successfully"});
    } catch (error){
        res.status(500).send({ error: error.message });
    }
};

//Adds a user to an existing group
exports.joinGroup = async (req, res) => {
    try {
        const { groupId } = req.params; // The ID of the group to join
        const userId = req.user.id; // The ID of the user joining the group

        // Add the user as a member of the group
        await addMemberToGroup(userId, groupId);

        res.status(200).send({ message: "Joined group successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Function to join a group using an invitation code
exports.joinGroupByInvitationCode = async (req, res) => {
    const { invitationCode } = req.body;
    const userId = req.user.id; // Assuming userID is set from auth middleware

    try {
        const group = await getGroupByInvitationCode(invitationCode);
        if (!group) {
            return res.status(404).send({ error: "Invalid invitation code." });
        }
        
        await addMemberToGroup(userId, group.id);
        res.status(200).send({ message: "Joined group successfully." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

//module.exports = { createGroup, joinGroup, joinGroupByInvitationCode};