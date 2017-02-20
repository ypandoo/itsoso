// callbacks to promise
var fs = require("fs");

function hello (file) {
  return new Promise(function(resolve, reject){
    fs.readFile(file, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data.toString())
        }
    });
  });
}

function world (file) {
  return new Promise(function(resolve, reject){
    fs.readFile(file, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data.toString())
        }
    });
  });
}

function log(data){
  return new Promise(function(resolve, reject){
    console.log('promise result = ' + data)
    resolve(data)
  });
}

hello(__dirname+'/app.js').then(log).then(function(){
  return hello(__dirname+'/app.js').then(log)
}).catch(function(err) {
  console.log(err)
})