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

groupChatPostSchema.pre('remove', function(next) {
    const GroupChatComment = mongoose.model("GroupChatComment");

    GroupChatComment.remove({ _id : { $in: this.chatPostComments } })
        .then(() => next());
})

const GroupChatPost = mongoose.model("GroupChatPost", groupChatPostSchema);

module.exports = GroupChatPost;