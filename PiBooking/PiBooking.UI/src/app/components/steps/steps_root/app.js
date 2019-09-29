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
        config.map([
            {
                route: ['', 'start'],
                name: 'start',
                settings: { icon: 'user-tie', enabled: this.stepsEnabled.step0, roles: [] },
                moduleId: PLATFORM.moduleName('../start/start'),
                nav: true,
                title: 'Select an Engineer'
            }, {
                route: ['step1'],
                name: 'step1',
                settings: { icon: 'calendar', enabled: this.stepsEnabled.step1, roles: [] },
                moduleId: PLATFORM.moduleName('../step1/step1'),
                nav: true,
                title: 'Choose Dates and Times'
            }, {
                route: 'step2',
                name: 'step2',
                settings: { icon: 'phone-alt', enabled: this.stepsEnabled.step2, roles: [] },
                moduleId: PLATFORM.moduleName('../step2/step2'),
                nav: true,
                title: 'Contact Information'
            }, {
                route: 'step3',
                name: 'step3',
                settings: { icon: 'briefcase', enabled: this.stepsEnabled.step3, roles: [] },
                moduleId: PLATFORM.moduleName('../step3/step3'),
                nav: true,
                title: 'Job Details'
            }, {
                route: 'step4',
                name: 'step4',
                settings: { icon: 'check-circle', enabled: this.stepsEnabled.step4, roles: [] },
                moduleId: PLATFORM.moduleName('../step4/step4'),
                nav: true,
                title: 'Confirm'
            }, {
                route: 'step5',
                name: 'step5',
                settings: { icon: 'credit-card', enabled: this.stepsEnabled.step5, roles: [] },
                moduleId: PLATFORM.moduleName('../step5/step5'),
                nav: true,
                title: 'Pay and Submit'
            }, {
                route: 'stepfinished',
                name: 'stepfinished',
                settings: { icon: 'credit-card', roles: [] },
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