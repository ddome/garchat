var mongoose = require("mongoose");
var Message = require("../data/message");
var _ = require("underscore");

var router = require("express").Router();
router.route("/message").post(addMessage).get(getMessages);

function getMessages(req, res) {
    Message.find(function (err, messages) {
        if (err)
            res.send(err);
        else {
            console.log("message sent: " + messages);
            res.json(messages);
        }
    });
}

function addMessage(req, res) {
    var message = new Message(_.extend({}, req.body));
    message.save(function (err) {
        if (err)
            res.send(err);
        else {
            console.log("store: " + message.text);
            res.json(message);
        }
    });
}

module.exports = router;