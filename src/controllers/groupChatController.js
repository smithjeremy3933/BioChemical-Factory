const GroupChatPosts = require("../models/Group/GroupChatPost");
const GroupChatComment = require("../models/Group/GroupChatComment");
const Group = require("../models/Group/Group");
const Log = require("../models/Logging/Log");

module.exports = {
    /*
    TODO: Add comments to posts,
    */

    createGroupChatPost(req, res, next) {
        const { chatPostSubject, chatPostContent } = req.body;
        const groupID = req.params.groupID;

        if (!chatPostSubject || !chatPostContent) {
            return res.status(422).send({ 
                error: "A Subject and Content is needed."
            });
        }

        const groupChatPosts = new GroupChatPosts({
            chatPostSubject,
            chatPostContent,
            chatPoster: req.user._id,
            chatPosterGroup: groupID,
            chatPosterUsername: req.user.email,
            chatPostComments: []
        })

        const log = new Log({
            logContent: "New Group Chat Post: " + groupChatPosts.chatPostSubject + ", Created By: " + groupChatPosts.chatPosterUsername + ".",
            logPriority: 4
        })

        console.log(groupChatPosts);

        Group.findById({_id : groupID})
        .then(group => {
            group.groupChatPosts.push(groupChatPosts)
            res.send(groupChatPosts);
            return group.save();
        })
        .then(() => {
            return groupChatPosts.save();
        })
        .then(() => {
            return log.save();
        })
        .catch(next);
    },
    createGroupChatComment(req, res, next) {
        const { chatCommentContent } = req.body;
        const postID = req.params.postID;

        if (!chatCommentContent) {
            return res.status(422).send({ 
                error: "Please provide some content!"
            });
        }

        const groupChatComment = new GroupChatComment({
            chatCommentContent,
            chatCommenterUsername: req.user.email,
            chatCommenter: req.user._id
        })

        const log = new Log({
            logContent: "New Group Chat Comment: " + groupChatComment.chatCommentContent 
                        + ", Created By: " + groupChatComment.chatCommenterUsername + ".",
            logPriority: 5
        })

        console.log(groupChatComment);

        GroupChatPosts.findById({ _id : postID })
            .then(groupPost => {
                groupPost.chatPostComments.push(groupChatComment)
                return groupPost.save()
            })
            .then(() => {
                res.send(groupChatComment)
                return groupChatComment.save()
            })
            .then(() => {
                return log.save();
            })
            .catch(next)
    }
}