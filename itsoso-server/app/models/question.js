'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var QuestionSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: ObjectId, ref: 'User' },
    tags: [{
        tagId: { type: ObjectId, ref: 'Tag' },
        tagName: { type: String }
    }],
    meta: {
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

QuestionSchema.pre('save', function(next) {
    if (!this.isNew) {
        this.meta.updateAt = Date.now();
    }

    next();
});

mongoose.model('Question', QuestionSchema);