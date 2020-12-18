const Koa = require('koa');
const koaRouter = require("koa-router");

const app = new Koa();
const router = new koaRouter();

router.get("/", (ctx) => {
    ctx.body = "test";
});

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

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));