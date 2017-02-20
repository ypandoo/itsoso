var debug = require('debug')('itsoso');
/** database */
require('./app/models/create');

/*-------------------*/ 
var koa = require('koa');
//配置文件
var config = require('./config/config');
//路由
var router = require('./router/routes')();

var app = koa();
app.keys = ['itsoso'];
app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});

//log记录
var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

var onerror = require('koa-onerror');
onerror(app);

//session中间件
var session = require('koa-session');
app.use(session(app));


//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//数据校验
var validator = require('koa-validator');
app.use(validator());

//router
app.use(router.routes())
    .use(router.allowedMethods());

app.listen(config.port);
console.log('listening on port %s',config.port);

module.exports = app;

