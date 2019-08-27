"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var aurelia_framework_1 = require("aurelia-framework");
require("bootstrap/dist/css/bootstrap.css");
require("bootstrap");
//Export jQuery to window object
var $ = require("jquery");
window['jQuery'] = $;
window['$'] = $;
function configure(aurelia) {
    aurelia.use.standardConfiguration()
        .plugin(aurelia_framework_1.PLATFORM.moduleName('aurelia-syncfusion-bridge'), function (syncfusion) { return syncfusion.ejGrid().ejSchedule(); });
    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }
    Promise.config({
        warnings: false,
        longStackTraces: false
    });
    aurelia.start().then(function () { return aurelia.setRoot(aurelia_framework_1.PLATFORM.moduleName('app/components/app/app')); });
}
exports.configure = configure;
//# sourceMappingURL=boot.js.map