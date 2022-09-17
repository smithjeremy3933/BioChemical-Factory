const mongoose = require("mongoose");

const groupChatCommentSchema = new mongoose.Schema({
    chatCommenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    chatCommenterUsername: {
        type: String,
        ref: "User"
    },
    chatCommentContent: {
        type: String,
        default: "",
        required: true
    }
}, {
    timestamps : true
})

const GroupChatComment = mongoose.model("GroupChatComment", groupChatCommentSchema);

module.exports = GroupChatComment;