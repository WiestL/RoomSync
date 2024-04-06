const { addGroceryItem, getGroceryItemsByGroupId, updateGroceryItem, deleteGroceryItem, getGroceryItemGroupId } = require("../models/groceryItem");
const { checkGroupMembership } = require("../models/group");

// Adds a new grocery item to a group
exports.addGroceryItemToGroup = async (req, res) => {
    const userId = req.user.id;
    const { groupId } = req.params;
    const { itemName, quantity } = req.body;

    try {
        if (!(await checkGroupMembership(userId, groupId))) {
            return res.status(403).send({ message: "Access denied: User is not a member of this group." });
        }

        const itemId = await addGroceryItem(groupId, itemName, quantity);
        res.status(201).send({ itemId, message: "Grocery item added successfully." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Retrieves all grocery items for a group
exports.getGroceryItems = async (req, res) => {
    const userId = req.user.id;
    const { groupId } = req.params;

    try {
        if (!(await checkGroupMembership(userId, groupId))) {
            return res.status(403).send({ message: "Access denied: User is not a member of this group." });
        }

        const items = await getGroceryItemsByGroupId(groupId);
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Updates a specific grocery item
exports.updateGroceryItemDetails = async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.params;
    const updates = req.body; // Expected to contain itemName, quantity, completed

    try {
        const groupId = await getGroceryItemGroupId(itemId);
        if (!groupId) {
            return res.status(404).send({ message: "Grocery item not found." });
        }

        if (!(await checkGroupMembership(userId, groupId))) {
            return res.status(403).send({ message: "Access denied: User is not a member of this group." });
        }

        const result = await updateGroceryItem(itemId, updates);
        if (result > 0) {
            res.status(200).send({ message: "Grocery item updated successfully." });
        } else {
            throw new Error("Update failed, no records affected.");
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


// Deletes a grocery item
exports.deleteGroceryItemById = async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.params;

    try {
        const groupId = await getGroceryItemGroupId(itemId);
        if (!groupId) {
            return res.status(404).send({ message: "Grocery item not found." });
        }
        if (!(await checkGroupMembership(userId, groupId))) {
            return res.status(403).send({ message: "Access denied: User is not a member of this group." });
        }

        await deleteGroceryItem(itemId);
        res.status(200).send({ message: "Grocery item deleted successfully." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
