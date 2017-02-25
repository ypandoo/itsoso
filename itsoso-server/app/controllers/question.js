'use strict'
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tag = mongoose.model('Tag');
var Question = mongoose.model('Question');
var DBHelper = require('../util/dbhelper');

exports.add = function *(next){
    var body = this.request.body;
    var title = body.title;
    var author = body.author;
    var content = body.content;
    var tags = body.tags;

    //循环存储tag, 存储tagname，硬盘比cpu便宜 
    var tagsArray = [];
    for(var index in tags){
      var _findOrSave = yield DBHelper.findOrSave(Tag, {name:tags[index]});
      tagsArray.push({tagId:_findOrSave._id, tagName:_findOrSave.name});
    }

    //save question
    var _question = new Question({
      title:title,
      content:content,
      // author:author
      tags:tagsArray
    })

    try{
        var question = yield _question.save();

        this.body ={
            'success':true,
            question: question
        }
      }
    catch(e){
        console.log(e);
    }

    yield next;
}