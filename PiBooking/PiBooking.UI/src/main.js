import 'jsrender';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import 'syncfusion-javascript/Scripts/ej/web/ej.web.all.min';
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .plugin(PLATFORM.moduleName('aurelia-api'), function (config) {
        config.registerEndpoint('api', environment.remoteSessionUrl);
    })
        .plugin(PLATFORM.moduleName('aurelia-syncfusion-bridge'), function (syncfusion) { return syncfusion.ejGrid().ejSchedule().ejSignature(); })
        .feature(PLATFORM.moduleName('resources/index'));
    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }
    aurelia.start().then(function () { return aurelia.setRoot(PLATFORM.moduleName('app/components/app/app')); });
}
//# sourceMappingURL=main.js.map