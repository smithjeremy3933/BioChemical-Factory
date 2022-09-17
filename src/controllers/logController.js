const Log = require("../models/Logging/Log");
const Functions = require("../libraries/functions");

module.exports = {


    getHighestProrityLogs(req, res, next) {
        Log.find()
            .then(log => {
                const sortedLogs = Functions.selectionSortLogPriority(log);
                res.send(sortedLogs);
                return console.log(sortedLogs);
            })
            .catch(next);
    }
}