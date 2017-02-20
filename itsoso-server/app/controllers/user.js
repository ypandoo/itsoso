'use strict'
var mongoose = require('mongoose');
var User = mongoose.model('User');
var xss = require('xss');
var uuid  = require('uuid');
var sms = require('../util/sms');

exports.signup = function *(next){
    var phoneNumber = this.request.body.phoneNumber;
    var user = yield User.findOne({
        phoneNumber:phoneNumber
    }).exec();

    var verifyCode = sms.getCode();

    //new user
    if(!user){
        user = new User({
            nickname:'dog',
            phoneNumber: xss(phoneNumber),
            verifyCode: verifyCode,
            accessToken: uuid.v4(),
            avatar: 'www.vnewcd.com',
            freed: 'test',
            verify:false
        })
    }
    else{
        user.verifyCode = verifyCode;
    }

    try{
        user = yield user.save();
    }
    catch(e){
        console.log(e);
    }

    //just send verify code back
    this.body ={
        'success':true,
        verifyCode: user.verifyCode
    }

    yield next;
}

exports.verify = function *(next){
    var verifyCode = this.request.body.verifyCode;
    var phoneNumber = this.request.body.phoneNumber;

    if(!verifyCode || !phoneNumber)
    {
        this.body = {
            success: false,
            err: '验证没通过'
        }
        yield next;
        return;
    }

    var user = yield User.findOne({phoneNumber:phoneNumber,
    verifyCode:verifyCode}).exec();

    if(!user)
    {
        this.body = {
            success: false,
            err: '验证没通过'
        }
        yield next;
        return;
    }

    user.verify = true;
    yield user.save();
    this.body ={
        'success':true,
        data:{
            nickname:user.nickname,
            avatar:'http://www.vnewcd.com/cases/',
            accessToken: user.accessToken
        }
    }

    yield next;
}

exports.update = function *(next){
    var body = this.request.body;
    var accessToken = body.accessToken;

    var user =  yield User.findOne({
        accessToken:accessToken
    }).exec();

    if(!user){
        this.body={
            success:false,
            err:'no user'
        }
        yield next;
        return;
    }

    var fields = 'avatar,gender,age,nickname,breed'.split(',');
    fields.forEach(function(field){
        if(body[field]){
            user[field] = body[field];
        }
    })

    yield user.save();

    this.body ={
        'success':true
    }

    yield next;
}