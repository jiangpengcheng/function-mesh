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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
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
    var main_1 = require("./process.ts").process;
    var readline_1 = require('readline');
    var fs_1 = require("fs");
    var Buffer_1 = require('node:buffer').Buffer;
    function actionLoop() {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var rl, _d, rl_1, rl_1_1, line, result, data, topic, payload, error_1, res, err_1, message, error, e_1_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        process.stdout.write('READY\n');
                        rl = readline_1.createInterface({
                            input: process.stdin
                        });
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 15, 16, 21]);
                        _d = true, rl_1 = __asyncValues(rl);
                        _e.label = 2;
                    case 2: return [4 /*yield*/, rl_1.next()];
                    case 3:
                        if (!(rl_1_1 = _e.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 14];
                        _c = rl_1_1.value;
                        _d = false;
                        _e.label = 4;
                    case 4:
                        _e.trys.push([4, , 12, 13]);
                        line = _c;
                        _e.label = 5;
                    case 5:
                        _e.trys.push([5, 10, , 11]);
                        result = '';
                        line = line.trim();
                        if (line.length == 0) {
                            return [3 /*break*/, 13];
                        }
                        fs_1.writeFileSync('/tmp/debug.txt', 'line is: ' + line);
                        data = line.toString().split("@@");
                        if (data.length != 2) {
                            result = "error: wrong format " + line + ", should be ${TOPIC}@@${DATA_IN_HEX_FORMAT}";
                        }
                        else {
                            topic = data[0];
                            payload = Buffer_1.from(data[1], 'hex').toString() // only support string scheme for now
                            ;
                            result = main_1(payload);
                            if (typeof result === 'undefined') {
                                result = '';
                            }
                        }
                        if (!(Promise.resolve(result) == result)) return [3 /*break*/, 9];
                        _e.label = 6;
                    case 6:
                        _e.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, result];
                    case 7:
                        result = _e.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _e.sent();
                        if (typeof error_1 === 'undefined') {
                            error_1 = {};
                        }
                        result = "error: " + error_1;
                        return [3 /*break*/, 9];
                    case 9:
                        res = Buffer_1.from(result).toString('hex');
                        process.stderr.write(res + "\n");
                        process.stdout.write(res + "\n");
                        return [3 /*break*/, 11];
                    case 10:
                        err_1 = _e.sent();
                        console.log(err_1);
                        message = err_1.message || err_1.toString();
                        error = "error:" + message;
                        process.stdout.write(Buffer_1.from(error + "\n").toString('hex'));
                        return [3 /*break*/, 11];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 13: return [3 /*break*/, 2];
                    case 14: return [3 /*break*/, 21];
                    case 15:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 21];
                    case 16:
                        _e.trys.push([16, , 19, 20]);
                        if (!(!_d && !_a && (_b = rl_1["return"]))) return [3 /*break*/, 18];
                        return [4 /*yield*/, _b.call(rl_1)];
                    case 17:
                        _e.sent();
                        _e.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 20: return [7 /*endfinally*/];
                    case 21: return [2 /*return*/];
                }
            });
        });
    }
    actionLoop();
}
catch (e) {
    if (e.code == "MODULE_NOT_FOUND") {
        console.log("zipped actions must contain either package.json or index.js at the root.");
    }
    console.log(e);
    process.exit(1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY19fLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhlY19fLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEdBQUc7QUFDSCw4REFBOEQ7QUFDOUQsZ0VBQWdFO0FBQ2hFLHlEQUF5RDtBQUN6RCw4REFBOEQ7QUFDOUQscURBQXFEO0FBQ3JELDhEQUE4RDtBQUM5RCw4REFBOEQ7QUFDOUQsR0FBRztBQUNILGdEQUFnRDtBQUNoRCxHQUFHO0FBQ0gsOERBQThEO0FBQzlELCtEQUErRDtBQUMvRCwwREFBMEQ7QUFDMUQsNkRBQTZEO0FBQzdELDJEQUEyRDtBQUMzRCxzQkFBc0I7QUFDdEIsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxJQUFJO0lBQ0EsSUFBTSxNQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtJQUM1QyxJQUFNLFVBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsSUFBTSxJQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hCLElBQUEsUUFBTSxHQUFLLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBM0IsQ0FBNEI7SUFFMUMsU0FBZSxVQUFVOzs7Ozs7O3dCQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTt3QkFDekIsRUFBRSxHQUFHLFVBQVEsQ0FBQyxlQUFlLENBQUM7NEJBQ2hDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSzt5QkFDdkIsQ0FBQyxDQUFDOzs7O21DQUNvQixPQUFBLGNBQUEsRUFBRSxDQUFBOzs7Ozt3QkFBRixrQkFBRTt3QkFBRixXQUFFOzs7O3dCQUFWLElBQUksS0FBQSxDQUFBOzs7O3dCQUVQLE1BQU0sR0FBRyxFQUFFLENBQUM7d0JBQ2hCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFF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