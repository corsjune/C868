"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var App = (function () {
    function App() {
    }
    App.prototype.configureRouter = function (config, router) {
        config.title = 'Aurelia';
        config.map([{
                route: ['', 'step1'],
                name: 'step1',
                settings: { icon: 'home' },
                moduleId: aurelia_framework_1.PLATFORM.moduleName('../steps/step1/step1'),
                nav: true,
                title: 'Step 1'
            }, {
                route: 'counter',
                name: 'counter',
                settings: { icon: 'education' },
                moduleId: aurelia_framework_1.PLATFORM.moduleName('../counter/counter'),
                nav: true,
                title: 'Counter'
            }, {
                route: 'fetch-data',
                name: 'fetchdata',
                settings: { icon: 'th-list' },
                moduleId: aurelia_framework_1.PLATFORM.moduleName('../fetchdata/fetchdata'),
                nav: true,
                title: 'Fetch data'
            }, {
                route: 'grid',
                name: 'grid',
                settings: { icon: 'th' },
                moduleId: aurelia_framework_1.PLATFORM.moduleName('../grid/grid'),
                nav: true,
                title: 'Grid'
            }, {
                route: 'schedule',
                name: 'schedule',
                settings: { icon: 'th' },
                moduleId: aurelia_framework_1.PLATFORM.moduleName('../grid/grid'),
                nav: true,
                title: 'Schedule'
            }
        ]);
        this.router = router;
    };
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map