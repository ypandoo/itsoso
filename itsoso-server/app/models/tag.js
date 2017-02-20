'use strict';

var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
    name: String,
    meta:{
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

TagSchema.pre('save', function(next){
    if(!this.isNew){
        this.meta.updateAt = Date.now();
    }

    next();
});

var findOrCreate = require('mongoose-findorcreate')
TagSchema.plugin(findOrCreate);
mongoose.model('Tag', TagSchema);
