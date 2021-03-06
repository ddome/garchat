/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var $ = require("jquery");
var promise = require("es6-promise");

// TODO: this should be defined in a config file
var resourceUrl = "http://localhost:7777/api/message";

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

function postMessage(message) {
  var Promise = promise.Promise;
  return new Promise(function (resolve, reject) {
    $.ajax({
        url: resourceUrl,
        data: JSON.stringify(message),
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        success: resolve,
        error: reject
    });
  });
}

function getMessages() {
  var Promise = promise.Promise;
  return new Promise(function (resolve, reject) {
    $.ajax({
        url: resourceUrl,
        method: "GET",
        dataType: "json",
        contentType: "application/json",
        success: resolve,
        error: reject
    });
  });
}

module.exports = {

  getAllMessages: function() {

    var rawMessages = JSON.parse(localStorage.getItem('messages'));
    ChatServerActionCreators.receiveAll(rawMessages);

    $.get(resourceUrl, function( data ) {
      ChatServerActionCreators.receiveAll(data);
    });

  },

  createMessage: function(message, threadName) {
    // simulate writing to a database
    var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp
    };

    postMessage(createdMessage).then(function (res) {
      ChatServerActionCreators.receiveCreatedMessage(res);
      rawMessages.push(createdMessage);
      localStorage.setItem('messages', JSON.stringify(rawMessages));
    });

  }

};
