"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var config_1 = require("./config");
function server() {
    app_1.default.listen(config_1.default.PORT, function () {
        console.log("Example app listening on port ".concat(config_1.default.PORT));
    });
}
server();
