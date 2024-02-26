const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    "NBA_Team": String,
    "Number_of_League_Titles_Won": Number,
    "Longest_Winning_Streak": Number    
});

let StatData= mongoose.model("stat",TeamSchema);


module.exports =StatData
