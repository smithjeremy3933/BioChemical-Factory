const mongoose = require("mongoose");

const groupChatPostSchema = new mongoose.Schema({
    chatPoster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    chatPosterUsername: {
        type: String,
        ref: "User"
    },
    chatPosterGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    chatPostSubject: {
        type: String,
        default: "",
        required: true
    },
    chatPostContent: {
        type: String,
        default: "",
        required: true
    },
    chatPostComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupChatComment"
    }]
}, {
    timestamps : true
})

const GroupChatPost = mongoose.model("GroupChatPost", groupChatPostSchema);

module.exports = GroupChatPost;