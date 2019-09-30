import 'jsrender';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import 'syncfusion-javascript/Scripts/ej/web/ej.web.all.min';
export function configure(aurelia) {
    var authconfig = {
        endpoint: 'auth',
        loginRedirect: '#/admin',
        configureEndpoints: ['auth'],
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
            .registerEndpoint('auth', environment.remoteSessionUrl);
    })
        .plugin(PLATFORM.moduleName('aurelia-syncfusion-bridge'), function (syncfusion) { return syncfusion.useAll(); })
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