var moment = require('moment');


var generateMessage = function (from, text) {
	return {
		from,
		text,
		createdAt: moment().valueOf()
		// createdAt: new Date().getTime()
	};
};

module.exports = {
	generateMessage: generateMessage
}