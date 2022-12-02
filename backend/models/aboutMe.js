const mongoose = require('mongoose');

const ExperienceSchema = mongoose.Schema({  
    info:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Experience', ExperienceSchema);