const Koa = require('koa');
const koaRouter = require("koa-router");
var proxy = require('koa-proxy');
const { exec } = require("child_process");
const SSH2Promise = require('ssh2-promise');
const mongo = require('koa-mongo')
const runTests = require('./runTests')

// runTests(['us-east-1', 'eu-central-1'],{});

const app = new Koa();
const router = new koaRouter();

const testRegions = [
    "us-east-2",
    "us-west-1",
    "us-west-2"
];

app.use(mongo({
    host: 'localhost',
    port: 27017,
    db: 'test',
    authSource: 'admin',
    max: 100,
    min: 1,
    acquireTimeoutMillis: 100
  }));

router.get("/regions", async (ctx) => {
    ctx.body = "regions";
});

//set regions
router.post("/regions", async (ctx) => {
    ctx.body = "regions";
});

//return all tests (pending, error, finished)
router.get("/tests", async (ctx) => {
    const result = ctx.body = await ctx.db.collection('tests').find().toArray()
    ctx.body = result;
});

//start new test - returns string:testId params:{regions:[], config{t: "", r: "", v:""}} 
router.get("/post-tests", async (ctx) => {
    const dbInsertion = await ctx.db.collection('tests').insert({ status: 'pending' });
    const testId = dbInsertion.ops[0]._id.toString();
    ctx.body = testId;
    runTestWrapper(ctx,testId);
});

let runTestWrapper = async(ctx, testId)=> {
    let results = await runTests(testRegions, {args: ['-c', '2', '-d', '2', '-R', '10', 'http://celtra.com']});
    //const result = await ctx.db.collection('tests').insert({ status: 'pending' });
    console.log("tests inished writing to db");
    ctx.db.collection('tests').updateOne(
        {"_id" : mongo.ObjectId(testId)},
        {$set: { 
            status : "finished",
            results: results
        }},
        {upsert: true}
    );
}

//get test by id
router.get("/tests/:id", async (ctx) => {
    ctx.db.collection('tests').findOne(
        {"_id" : testId}
    );
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
vue.stderr.pipe(process.stderr);
// End Vue

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));