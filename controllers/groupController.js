// controllers/groupController.js

const { createGroup, getGroupByInvitationCode, addMemberToGroup, fetchGroupStatusUpdates, checkGroupMembership, findGroupByUserId } = require("../models/group");

//Creates a new group
exports.createGroup = async (req, res) => {
    try {
        const { groupName } = req.body;
        const userId = req.user.id;  // Ensure req.user is properly populated by your auth middleware

        // Create the group and get its ID and invitationCode
        const group = await createGroup(groupName);
        if (!group || !group.id) {
            return res.status(400).send({ error: "Failed to create group" });
        }

        // Add the creator as a member of the group
        await addMemberToGroup(userId, group.id);

        res.status(201).send({ groupId: group.id, invitationCode: group.invitationCode, message: "Group created successfully"});
    } catch (error) {
        console.error("Create Group Error:", error);
        res.status(500).send({ error: error.message });
    }
};

exports.checkGroupMembership = async (req, res) => {
    const { userId } = req.params;
    try {
        const group = await findGroupByUserId(userId);
        if (group) {
            res.json(group);
        } else {
            res.status(404).send({ message: "No group found for this user." });
        }
    } catch (error) {
        console.error("Failed to check group membership: ", error);
        res.status(500).send({ message: "Failed to check group membership.", error: error.toString() });
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

exports.getGroupStatuses = async (req, res) => {
    const groupId = req.params.groupId;
    const userId = req.user.id; // Assuming req.user is populated from authentication middleware

    console.log("Checking membership for user:", userId, "in group:", groupId);

    try {
        const isMember = await checkGroupMembership(userId, groupId);
        console.log("Membership check result:", isMember);

        if (!isMember) {
            return res.status(403).send({ error: "Access denied: User is not a member of the group." });
        }

        const statuses = await fetchGroupStatusUpdates(groupId);
        res.status(200).json(statuses);
    } catch (error) {
        console.error("Error fetching group statuses:", error);
        res.status(500).send({ error: "An error occurred while fetching group status updates." });
    }
};