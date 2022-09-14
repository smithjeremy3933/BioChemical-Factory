const mongoose = require("mongoose");

const groupChatPostSchema = new mongoose.Schema({
    chatPosterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    chatPosterUsername: {
        type: String,
        ref: "User"
    },
    chatPostSubject: {
        type: String,
        default: ""
    },
    chatPostContent: {
        type: String,
        default: "",
        required: true
    },
    chatPostCommentIDs: [{

    }]
}, {
    timestamps : true
})

const GroupChatPost = mongoose.model("GroupChatPost", groupChatPostSchema);

module.exports = GroupChatPost;