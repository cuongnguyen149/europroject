var mongoose = require('mongoose'),
	// userSchema = require('../models/user').userSchema,
  	Schema = mongoose.Schema;

var matchSchema = new Schema({
    date      				: { type: Date },
    homeTeamName		 	: { type: String },
    awayTeamName			: { type: String },
    result					: {	type: Object }
});
// disable autoIndex since index creation can cause a significant performance impact.
matchSchema.set('autoIndex', false);
// define index
// adminSchema.index({ weeknumber: 1 });
// create model
var match = mongoose.model('match', matchSchema);

module.exports = {
  Match: match
};