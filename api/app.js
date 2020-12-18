const Koa = require('koa');
const koaRouter = require("koa-router");
var proxy = require('koa-proxy');
const { exec } = require("child_process");

const app = new Koa();
const router = new koaRouter();

router.get("/regions", async (ctx) => {
    ctx.body = "regions";
});

router.post("/regions", async (ctx) => {
    ctx.body = "regions";
});

router.get("/tests", async (ctx) => {
    ctx.body = "regions";
});

router.post("/tests", async (ctx) => {
    ctx.body = "regions";
});

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
}, (error, stdout, stderr) => {});
vue.stdout.pipe(process.stdout);
vue.stderr.pipe(process.stderr);
// End Vue

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
