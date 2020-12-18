const Koa = require('koa');
const koaRouter = require("koa-router");
var proxy = require('koa-proxy');
const { exec } = require("child_process");
const mongo = require('koa-mongo')
const fs = require('fs')
const runTests = require('./runTests')
const util = require('util');
const bodyParser = require('koa-bodyparser');

// runTests(['us-east-1', 'eu-central-1'],{});
const app = new Koa();
const router = new koaRouter();

const testRegions = [
    "us-east-2",
    "us-west-1",
    "us-west-2"
];

let mongoDetails = {};

if ('MONGODB_URI' in process.env) {
    mongoDetails = {
        uri: process.env['MONGODB_URI'],
        max: 100,
        min: 1,
    }
} else {
    mongoDetails = {
        host: 'localhost',
        port: 27017,
        db: 'test',
        authSource: 'admin',
        max: 100,
        min: 1,
        acquireTimeoutMillis: 100
      }
}

console.log(mongoDetails);

app.use(mongo(mongoDetails));
app.use(bodyParser());

router.get("/regions", async (ctx) => {
    ctx.body = "regions";
});

//set regions
router.post("/regions", async (ctx) => {
    ctx.body = "regions";
});

//return all tests (pending, error, finished)
router.get("/tests", async (ctx) => {
    const result = await ctx.db.collection('tests').find().toArray()
    ctx.body = result;
});

//start new test - returns string:testId params:{regions:[], config{t: "", r: "", v:""}} 
router.post("/tests", async (ctx) => {
    const body = ctx.request.body;
    console.log(util.inspect(body, {depth:null, colors:true}));
    const parsedArgs = {args: ["-c", body.concurrency, "-d", body.duration, "-R", body.rate, "-L", body.url ]};

    const regions = body.regions;

    const dbInsertion = await ctx.db.collection('tests').insert({ status: 'pending'});
    const testId = dbInsertion.ops[0]._id.toString();
    ctx.body = testId;
    runTestWrapper(ctx,testId, regions, parsedArgs);
});

let runTestWrapper = async(ctx, testId, regions, args)=> {
    let results = await runTests(regions, args);
    //const result = await ctx.db.collection('tests').insert({ status: 'pending' });
    console.log("tests finished writing to db");
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
    let testId = ctx.params.id;
    console.log(testId);
    console.log(typeof(testId));

    let test = await ctx.db.collection('tests').findOne(
        {"_id" : mongo.ObjectId(testId)}
    )
    ctx.body = test;
});

router.get("/mock/tests/:id", async (ctx) => {
    ctx.body = JSON.parse(fs.readFileSync('./mock-details.json', 'utf8'));
});

// Vue
app.use(proxy({
    host:  'http://localhost:8080',
    match: /^\/(ui|css|js|img)\//
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
