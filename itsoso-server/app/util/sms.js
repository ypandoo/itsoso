'use strict'
var speakeasy = require('speakeasy');
var Promise = require('bluebird');

exports.getCode = function(){
    var code = speakeasy.totp({
        secret: 'yanglei',
        digits: 4
    });

    return code;
}

exports.send = function(phoneNumber, msg){
    return new Promise(function(resolve, reject){
        if(!phoneNumber)
        {
            reject(new Error('empty phone number'));
            return
        }
        return resolve({'status': 0});
    })
}