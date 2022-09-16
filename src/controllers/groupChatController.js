const GroupChatPosts = require("../models/GroupChatPost")
const Group = require("../models/Group");

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
    }
}