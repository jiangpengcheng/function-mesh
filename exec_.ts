try {
    const main = require("excla").process
    const readline = require('readline');
    const fs = require("fs")
    const { Buffer } = require('node:buffer');

    async function actionLoop() {
        process.stdout.write('READY\n')
        const rl = readline.createInterface({
            input: process.stdin
        });
        for await (let line of rl) {
            try {
                let result = '';
                line = line.trim()
                if (line.length == 0) {
                    continue
                }
                fs.writeFileSync('/tmp/debug.txt', 'line is: ' + line)
                let data = line.toString().split("@@")
                if (data.length != 2) {
                    result = "error: wrong format " + line +  ", should be ${TOPIC}@@${DATA_IN_HEX_FORMAT}"
                } else {
                    let topic = data[0]
                    let payload = Buffer.from(data[1], 'hex').toString() // only support string scheme for now
                    result = main(payload)
                    if (typeof result === 'undefined') {
                        result = '';
                    }
                }
                if (Promise.resolve(result) == result)
                    try {
                        result = await result
                    } catch (error) {
                        if (typeof error === 'undefined') {
                            error = {}
                        }
                        result = "error: " + error
                    }
                let res = Buffer.from(result).toString('hex');
                process.stderr.write(res + "\n");
                process.stdout.write(res + "\n");
            } catch (err) {
                console.log(err);
                let message = err.message || err.toString()
                let error = "error:" + message
                process.stdout.write(Buffer.from(error + "\n").toString('hex'));
            }
        }
    }
    actionLoop()
} catch (e) {
    if (e.code == "MODULE_NOT_FOUND") {
        console.log("zipped actions must contain either package.json or index.js at the root.")
    }
    console.log(e)
    process.exit(1)
}
