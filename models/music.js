const mongoose=require('mongoose');

var musicSchema= new mongoose.Schema({

    instrument:{
        type:String,
        requered:'This field is required.'
        
    },

    price:{
        type:String,
        requered:true
    },

    color:{
        type:String,
        requered:true
    },

    year:{
        type:String,
        requered:true
    },

    comments:{
        type:String,
        requered:true
    },

    data:{
        type:Date,
        default:Date.now
    }
    
});

module.exports = mongoose.model('musics',musicSchema);