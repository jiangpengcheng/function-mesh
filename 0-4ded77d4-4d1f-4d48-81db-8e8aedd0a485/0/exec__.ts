///
/// Licensed to the Apache Software Foundation (ASF) under one
/// or more contributor license agreements.  See the NOTICE file
/// distributed with this work for additional information
/// regarding copyright ownership.  The ASF licenses this file
/// to you under the Apache License, Version 2.0 (the
/// "License"); you may not use this file except in compliance
/// with the License.  You may obtain a copy of the License at
///
///   http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing,
/// software distributed under the License is distributed on an
/// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
/// KIND, either express or implied.  See the License for the
/// specific language governing permissions and limitations
/// under the License.
///

/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

try {
    const main = require("./process.ts").process
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