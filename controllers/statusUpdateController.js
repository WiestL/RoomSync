// controllers/statusUpdateController.js
const { createStatusUpdate, getStatusUpdates, getStatusUpdateById, updateStatusUpdateById, deleteStatusUpdateById } = require('../models/statusUpdate');

exports.postStatusUpdate = async (req, res) => {
    try {
        const { userId, statusText, wantVisitors } = req.body;
        const updateId = await createStatusUpdate(userId, statusText, wantVisitors);
        res.status(201).send({ updateId, message: "Status update posted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getAllStatusUpdates = async (req,res)=> {
    try{
        const updates = await this.getStatusUpdates();
        res.status(200).send(updates);
    } catch(error){
        res.status(500).send({error: error.message});
    }
};

exports.getStatusUpdate = async (req, res) => {
    try{
        const {id} = req.params;
        const update = await getStatusUpdateById(id);
        if (update) {
            res.status(200).send(update);
        } else {
            res.status(404).send({message: "Status update not found"});
        }
    }catch(error) {
        res.status(500).send({error: error.message });
    }
}

exports.updateStatusUpdate = async (req, res) =>{
    try{
        const {id} = req.params;
        const {statusText, wantVisitors} = req.body;
        const result = await updateStatusUpdateById(id, statusText, wantVisitors);
        if(result){
            res.status(200).send({ message: "Status update updated successfully"});
        }else{
            res.status(404).send({message: "Status update not found"});
        }
    }catch (error){
        res.status(500).send({error: error.message});
    }
} 

exports.deleteStatusUpdate = async (req, res) => {
    try{
        const{id} = req.params;
        const result = await deleteStatusUpdateById(id);
        if(result){
            res.status(200).send({message: "Status update deleted successfully"});
        } else {
            res.status(404).send({message: "Status update not found"});
        } 
    } catch (error){
        res.status(500).send({ error: error.message});
    }
}

exports.getGroupStatuses = async(req, res) =>{
    const { groupId} = req.params;
    const userId = req.user.id;

    try{
        const isMember = await checkGroupMembership(userId, groupId);
        if(!isMember)
        {
            return res.status(403).send({error: "User is not a member of the group"});
        }

        const statuses = await fetchGroupStatusUpdates(groupId);
        res.status(200).send(statuses);
    } catch (error){
        res.status(500).send({error: error.message});
    }
};
   
