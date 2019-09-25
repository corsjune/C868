var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PLATFORM, autoinject } from 'aurelia-framework';
import { stepsEnabledService } from "app/services/stepsEnabledService";
var App = (function () {
    function App(stepsEnabled) {
        this.stepsEnabled = stepsEnabled;
    }
    App.prototype.configureRouter = function (config, router) {
        config.title = 'Book Now';
        config.map([{
                route: ['', 'step1'],
                name: 'step1',
                settings: { icon: 'calendar', enabled: this.stepsEnabled.step1, roles: [] },
                moduleId: PLATFORM.moduleName('../step1/step1'),
                nav: true,
                title: 'Step 1 - Choose Dates and Times'
            }, {
                route: 'step2',
                name: 'step2',
                settings: { icon: 'phone-alt', enabled: this.stepsEnabled.step2, roles: [] },
                moduleId: PLATFORM.moduleName('../step2/step2'),
                nav: true,
                title: 'Step 2 - Contact Information'
            }, {
                route: 'step3',
                name: 'step3',
                settings: { icon: 'briefcase', enabled: this.stepsEnabled.step3, roles: [] },
                moduleId: PLATFORM.moduleName('../step3/step3'),
                nav: true,
                title: 'Step 3 - Job Details'
            }, {
                route: 'step4',
                name: 'step4',
                settings: { icon: 'ok', enabled: this.stepsEnabled.step4, roles: [] },
                moduleId: PLATFORM.moduleName('../step4/step4'),
                nav: true,
                title: 'Step 4 - Confirm'
            }, {
                route: 'step5',
                name: 'step5',
                settings: { icon: 'credit-card', enabled: this.stepsEnabled.step5, roles: ['admin'] },
                moduleId: PLATFORM.moduleName('../step5/step5'),
                nav: true,
                title: 'Step 5 - Pay and Submit'
            }, {
                route: 'stepfinished',
                name: 'stepfinished',
                settings: { icon: 'credit-card', roles: ['admin'] },
                moduleId: PLATFORM.moduleName('../stepfinished/stepfinished'),
                nav: false,
                title: 'Thank you!'
            }
        ]);
        this.router = router;
    };
    App = __decorate([
        autoinject,
        __metadata("design:paramtypes", [stepsEnabledService])
    ], App);
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map