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
    "sa-east-1"
];

let runTest = async (region, config) => {
    const sshconfig = {
        host: region + '.runner.hackaton.deki.icu',
        username: 'ec2-user',
        identity: './key',
      }

    var ssh = new SSH2Promise(sshconfig);
    var command = "/wrk2 " + config.args.join(' ');
    console.log(region + " -> " + command);

    await ssh.connect();
    console.log("Connection established "+region);
    var e = await ssh.exec(command);
    return {
        'region': region,
        'config': config,
        'result': parseWrk(e),
        'raw': e,
    };
}

let runTests = async (regions, config) => {
    return Promise.all(regions.map((region) => runTest(region, config)));
};


/*
(async function(){
    let results = await runTests(regions, {args: ['-c', '2', '-d', '2', '-R', '10', '-L', 'http://celtra.com']});
    console.log(JSON.stringify(results, null, 4));
    exit
})();
*/

module.exports = runTests
