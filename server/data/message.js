var mongoose = require("mongoose");
var messageSchema = mongoose.Schema({
    id: String,
    threadID: String,
    text: String,
    timestamp: Number,
    isRead: Boolean,
    authorName: String
});

module.exports = mongoose.model("message", messageSchema);