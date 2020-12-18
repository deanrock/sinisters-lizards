const SSH2Promise = require('ssh2-promise');
const path = require('path');
const parseWrk = require('./parseWrk');

var regions = ["us-east-1",
"us-east-2",
"us-west-1",
"us-west-2",
"ca-central-1",
"eu-west-1",
"eu-west-2",
"eu-west-3",
"eu-central-1",
"eu-north-1",
"ap-northeast-1",
"ap-northeast-2",
"ap-southeast-1",
"ap-southeast-2",
"ap-south-1",
"sa-east-1"];

let runTest = async (region) => {
    const sshconfig = {
        host: region + '.runner.hackaton.deki.icu',
        username: 'ec2-user',
        identity: path.join(process.env.HOME, 'Desktop', 'key'), // have key in `~/Desktop/key`
      }

    var ssh = new SSH2Promise(sshconfig);

    await ssh.connect();
    var e = await ssh.exec("/wrk2 -c 2 -d 2 -R 10 http://celtra.com");
    console.log(parseWrk(e))
    console.log("Connection established "+region);
}

let runTests = async (regions, config) => {
    regions.map((region) => {
        runTest(region);
    })
};

module.exports = runTests
