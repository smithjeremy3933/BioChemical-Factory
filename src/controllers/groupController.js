const Group = require("../models/Group");
const User = require("../models/User");

module.exports = {
    /*
    TODO: remove group member, edit groupName, edit groupDescription, delete group

    TODO: work on groupchat comment and post. Group will contain ChatPosts, while 
          ChatPosts will contain the ChatComments.

    TODO: Add priority list. Maybe work on when I have an actual object for machines
    and operations in a factory.
    */
    createGroup(req, res) {
        const { groupName, groupDescription } = req.body;  

        if (!groupName) {
            return res.status(422).send({ 
                error: "A Group Name is required."
            });
        }

        const group = new Group({
            groupName,
            groupDescription,
            groupOwnerID: req.user._id,
            groupOwnerUsername: req.user.email,
            groupMembers: [{
                memberUsername: req.user.email,
                memberID: req.user._id
            }]
        })
        console.log(group);

        try {
            group.save();
            res.send(group);
        } catch(err) {
            res.status(422).send({ error: err.message });
        }
    },

    getAllGroups (req, res, next)  {
        Group.find()
            .then(group => res.send(group))
            .catch(next);
    },

    getOneGroupByID (req, res, next) {
        const groupID = req.params.id;
        
        Group.findById({_id : groupID})
            .then(group => res.send(group))
            .catch(next);
    },

    addGroupMemberByGroupID (req, res, next) {
        const groupID = req.params.groupID;
        const newMemberID = req.params.newMemberID;
        let newMember;

        User.findById({ _id : newMemberID })
            .then(member => { return newMember = {
                memberUsername: member.email,
                memberID: member._id
            }})
            .then(() =>  Group.findById({ _id : groupID }))
            .then(group => {
                group.groupMembers.push(newMember)
                res.send(newMember);
                return group.save()
            })
            .catch(next)
    }
}