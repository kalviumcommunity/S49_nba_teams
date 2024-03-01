const mongoose = require('mongoose');

const UTSchema = new mongoose.Schema({
    "Team_Name": String,
    "Rep_City": String,
    "Conference": String    
});

let UTdata= mongoose.model("team",UTSchema);


module.exports =UTdata
