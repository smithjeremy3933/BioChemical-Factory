const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        default: "",
        required: true
    },
    groupDescription: {
        type: String,
        default: "",
    },
    groupOwnerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    groupOwnerUsername: {
        type: String,
        default: "",
        ref: "User"
    },
    // Member IDs should be here
    groupMembers: [{
        memberUsername: {
            type: String,
            ref: "User"
        },
        memberID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],
}, {
    timestamps : true
})

//Virtual function for group count

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;