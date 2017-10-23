var moment = require('moment');

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'))

var timestamp = moment().valueOf();
console.log(timestamp);