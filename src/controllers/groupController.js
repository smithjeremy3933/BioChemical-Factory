const Group = require("../models/Group/Group");
const User = require("../models/User");
const Log = require("../models/Logging/Log");

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
            groupMembers: [req.user._id],
            groupChatPosts: []
        })

        const log = new Log({
            logContent: "New Group: " + group.groupName + ", Created By: " + group.groupOwnerUsername + ".",
            logPriority: 3
        })
        console.log(group);

        try {
            group.save();
            log.save();
            res.send(group);
        } catch(err) {
            res.status(422).send({ error: err.message });
        }
    },

    getAllGroups (req, res, next)  {
        Group.find()
            .populate({
                path: 'groupChatPosts',
                populate: {
                    path: 'chatPostComments',
                    model: 'GroupChatComment'
                }
            })
            .then(group => res.send(group))
            .catch(next);
    },

    getOneGroupByID (req, res, next) {
        const groupID = req.params.id;
        
        Group.findById({_id : groupID})
                    .populate({
                path: 'groupChatPosts',
                populate: {
                    path: 'chatPostComments',
                    model: 'GroupChatComment'
                }
            })
            .then(group => res.send(group))
            .catch(next);
    },

    addGroupMemberByGroupID (req, res, next) {
        const groupID = req.params.groupID;
        const newMemberID = req.params.newMemberID;
        let newMember;

        User.findById({ _id : newMemberID })
            .then(member => { return newMember = member })
            .then(() =>  Group.findById({ _id : groupID }))
            .then(group => {
                group.groupMembers.push(newMember._id)
                res.send(newMember._id);
                const log = new Log({
                    logContent: "New Member Added to Group: " + newMember.email + ", Added to Group by: " + group.groupOwnerUsername + ".",
                    logPriority: 3
                })
                log.save();
                return group.save();
            })
            .catch(next)
    }
}