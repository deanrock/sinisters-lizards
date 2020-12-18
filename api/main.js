const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

// serves Vue app on Heroku
app.use(serve('/dist'));

app.listen(3000);

console.log('listening on port 3000');
