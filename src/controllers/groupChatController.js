const GroupChatPosts = require("../models/Group/GroupChatPost");
const GroupChatComment = require("../models/Group/GroupChatComment");
const Group = require("../models/Group/Group");

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

        console.log(groupChatPosts);

        try {
            Group.findById({_id : groupID})
            .then(group => {
                group.groupChatPosts.push(groupChatPosts)
                return group.save();
            })
            .catch(next);
            groupChatPosts.save();
            res.send(groupChatPosts);
        } catch(err) {
            res.status(422).send({ error: err.message });
        }
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
            .catch(next)
    }
}