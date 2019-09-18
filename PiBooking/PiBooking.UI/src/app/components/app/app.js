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
import { Redirect } from 'aurelia-router';
import { stepsEnabledService } from "../../services/stepsEnabledService";
var App = (function () {
    function App(stepsEnabled) {
        this.stepsEnabled = stepsEnabled;
    }
    App.prototype.configureRouter = function (config, router) {
        config.title = 'Book Now';
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
            { route: '', redirect: 'home' },
            {
                route: ['home'],
                name: 'home',
                settings: { icon: 'calendar', enabled: true, roles: [] },
                moduleId: PLATFORM.moduleName('../steps/steps_root/app'),
                nav: true,
                title: 'Home'
            }, {
                route: 'admin',
                name: 'admin',
                settings: { icon: 'phone-alt', enabled: true, roles: [] },
                moduleId: PLATFORM.moduleName('../admin/admin_root/app'),
                nav: true,
                title: 'Admin'
            }, {
                route: 'step3',
                name: 'step3',
                settings: { icon: 'briefcase', enabled: true, roles: [] },
                moduleId: PLATFORM.moduleName('../steps/step3/step3'),
                nav: true,
                title: 'Contact'
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
var AuthorizeStep = (function () {
    function AuthorizeStep() {
    }
    AuthorizeStep.prototype.run = function (navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(function (i) { return i.config.settings.roles.indexOf('admin') !== -1; })) {
            var isAdmin = false;
            if (!isAdmin) {
                return next.cancel(new Redirect('step3'));
            }
        }
        return next();
    };
    return AuthorizeStep;
}());
//# sourceMappingURL=app.js.map