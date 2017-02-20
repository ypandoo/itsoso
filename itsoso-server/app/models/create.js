'use strict';
//Database 
var mongoose = require('mongoose');
var db = 'mongodb://localhost/itsoso';

mongoose.Promise = require('bluebird');
mongoose.connect(db, function(err) {
    if (err) throw err;
});

var createDB = true;
if(createDB){
    require('./user');
    require('./tag');
    require('./question');
}
