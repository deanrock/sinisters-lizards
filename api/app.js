const Koa = require('koa');
const koaRouter = require("koa-router");
var proxy = require('koa-proxy');
const { exec } = require("child_process");
const runTests = require('./runTests');

// runTests(['us-east-1', 'eu-central-1'],{});

const dbConfig = {

}

const app = new Koa();
const router = new koaRouter();

router.get("/regions", async (ctx) => {
    ctx.body = "regions";
});

//set regions
router.post("/regions", async (ctx) => {
    ctx.body = "regions";
});

//return all tests (pending, error, finished)
router.get("/tests", async (ctx) => {
    ctx.body = "regions";
});

//start new test - returns string:testId params:{regions:[], config{t: "", r: "", v:""}} 
router.post("/tests", async (ctx) => {
    ctx.body = "regions";
});

//get test by id
router.get("/tests/:id", async (ctx) => {
    ctx.body = ctx.params;
});

// Vue
app.use(proxy({
    host:  'http://localhost:8080',
    match: /^\/(ui|css|js)\//
}));

let vue = exec("npm run serve", {
    cwd: '../client/',
    env: {
        'PATH': process.env['PATH'],
        'PORT': '8080'
    },
}, (error, stdout, stderr) => {});
vue.stdout.pipe(process.stdout);
//vue.stderr.pipe(process.stderr);
// End Vue

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
