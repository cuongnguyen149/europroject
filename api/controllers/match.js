'use strict';
var Match = require('../model/match').Match;
module.exports = {
  matchList: matchList
};

function matchList(req, res) {
  Match.find(function(err, matchReturn){
    if(err){
    	res.json({message: "Data is not available. Please try later."})
    }else{
    	res.json({message: "Get match list success.", data: {matchReturn}});
    }
  });

}
