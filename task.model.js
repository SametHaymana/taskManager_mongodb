const  mongoose  = require("mongoose");


const task_schema = mongoose.Schema({

    taskName : String,
    taskDesciription: String,
    date: {
        type: Date,
        index: true
    },
    functionArgs: mongoose.SchemaTypes.Mixed,

}, {timestamps : true})


module.exports = mongoose.model("Task", task_schema);