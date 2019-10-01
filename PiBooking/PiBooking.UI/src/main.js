import 'jsrender';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import 'syncfusion-javascript/Scripts/ej/web/ej.grid.min';
import 'syncfusion-javascript/Scripts/ej/web/ej.schedule.min';
import 'syncfusion-javascript/Scripts/ej/web/ej.reportviewer.min';
import 'syncfusion-javascript/Scripts/ej/web/ej.signature.min';
import 'syncfusion-javascript/Scripts/ej/web/ej.daterangepicker.min';
import 'syncfusion-javascript/Scripts/ej/web/ej.datetimepicker.min';
export function configure(aurelia) {
    var authconfig = {
        endpoint: '',
        loginRedirect: '#/admin',
        configureEndpoints: [''],
        loginUrl: 'user/authenticate',
        accessTokenProp: 'Token',
        storageChangedReload: true,
        expiredRedirect: 1
    };
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .plugin(PLATFORM.moduleName('aurelia-api'), function (config) {
        config.registerEndpoint('api', environment.remoteSessionUrl)
            .setDefaultEndpoint('api');
    })
        .plugin(PLATFORM.moduleName('aurelia-syncfusion-bridge'), function (syncfusion) {
        return syncfusion.ejGrid().ejSchedule().ejReportViewer().ejSignature().ejDatePicker().ejDateTimePicker().ejTemplate();
    })
        .feature(PLATFORM.moduleName('resources/index'))
        .globalResources(PLATFORM.moduleName('aurelia-authentication/authFilterValueConverter'))
        .plugin(PLATFORM.moduleName('aurelia-authentication'), function (baseConfig) {
        baseConfig.configure(authconfig);
    });
    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }
    aurelia.start().then(function () { return aurelia.setRoot(PLATFORM.moduleName('app/components/app/app')); });
}
//# sourceMappingURL=main.js.map