'use strict';
var Question  = require('../app/controllers/question');
var App  = require('../app/controllers/app');

var Router = require('koa-router');

module.exports = function(){
    var router = new Router({
        prefix:'/api/1'
    });

    //question
    router.post('/question/add', App.hasBody, Question.add);

    return router;
};