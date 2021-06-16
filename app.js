const { time } = require('console');
const { config } = require('process');

var Koa=require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path=require('path'),
    DB=require('./module/db.js');
    http = require('./module/http.js');
    httpConfig = require('./module/config.js');
    crypto = require('./module/crypto.js')

var app=new Koa();
//配置 koa-art-template模板引擎
// render(app, {
//     root: path.join(__dirname, 'views'),   // 视图的位置
//     extname: '.html',  // 后缀名
//     debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
// });

// 第一个中间件，进出处理数据
app.use(async (ctx,next)=>{
    console.log('进入服务器')
    await next();  
})

/* 调用行情相关接口 */

//测试服务器联通性
//   'Content-Type': 'application/json',
//   'X-MBX-APIKEY': 'NhUgU7VXlhNt71R2AsrJhw2ZINqRwDRokkTl9xr4gHOuJJEnY0IXlCIIq5CzpytM'
router.get('/api/v5/account/config',async (ctx)=>{
    // /api/v3/ping
    console.log('准备调用接口')
    let timestamp = new Date()
    let sign = crypto(timestamp,'GET', '/api/v5/account/config')
    console.log(sign)
    let options = {
        hostname: httpConfig.apiServerUrl,
        port: 443,
        path: '/api/v5/account/config',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'OK-ACCESS-KEY': httpConfig.api_secret_key,
            'OK-ACCESS-SIGN': sign,
            'OK-ACCESS-TIMESTAMP': JSON.stringify (timestamp),
            'OK-ACCESS-PASSPHRASE': httpConfig.api_PASSPHRASE,
            // 'x-simulated-trading': '1'
        
        }
    }
    http.sendGetHttp(options, function(data){
        console.log(data)
    })
})

/* 行情相关dataBase操作 */


app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);

// router.get('/',async (ctx)=>{

//     console.time('start');
//     var result=await DB.find('user',{'age': 25});

//     console.timeEnd('start');
//     console.log(result);
//     await ctx.render('index',{
//         list:{
//             name:'张三'
//         }
//     });
// })


// router.get('/news',async (ctx)=>{

//     console.time('start');
//     var result=await DB.find('user',{});

//     console.timeEnd('start');
//     ctx.body="这是一个新闻页面";
// })

//www.域名.com/news
// app.use(async (ctx,next)=>{
//     console.log('1、这是第一个中间件01');
//     await next();

//     console.log('5、匹配路由完成以后又会返回来执行中间件');
// })

// app.use(async (ctx,next)=>{
//     console.log('2、这是第二个中间件02');
//     await next();

//     console.log('4、匹配路由完成以后又会返回来执行中间件');
// })

// router.get('/',async (ctx)=>{

//     ctx.body="首页";

// })
// router.get('/news',async (ctx)=>{

//     console.log('3、匹配到了news这个路由');
//     ctx.body='这是一个新闻';
// })




