const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    logContent: {
        type: String,
        default: ""
    },
    logPriority: {
        type: Number,
        default: 5
    }
}, {
    timestamps : true
})

const Log = mongoose.model("Log",logSchema);

module.exports = Log;