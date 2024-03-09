
import 'jsrender';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Aurelia } from 'aurelia-framework';
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import 'syncfusion-javascript/Scripts/ej/web/ej.web.all.min';

declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {


    var authconfig = {
        endpoint: '',
        loginRedirect: '#/admin',
        configureEndpoints: [''],
        loginUrl: 'user/authenticate',
        accessTokenProp: 'Token',
        storageChangedReload: true,    // ensure secondary tab reloading after auth status changes

        expiredRedirect: 1             // redirect to logoutRedirect after token expiration
    };


    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .plugin(PLATFORM.moduleName('aurelia-api'), config => {
            // Register hosts
            config.registerEndpoint('api', environment.remoteSessionUrl)
                .setDefaultEndpoint('api');
        })
        .plugin(PLATFORM.moduleName('aurelia-syncfusion-bridge'), (syncfusion) =>
            syncfusion.ejGrid().ejSchedule().ejReportViewer().ejSignature().ejDatePicker().ejDateTimePicker().ejTemplate()
        )
        .feature(PLATFORM.moduleName('resources/index'))
        .globalResources(PLATFORM.moduleName('aurelia-authentication/authFilterValueConverter'))
        .plugin(PLATFORM.moduleName('aurelia-authentication'), baseConfig => {
            baseConfig.configure(authconfig);
        })

    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }

    //Uncomment the line below to enable animation.
    // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
    //if the css animator is enabled, add swap-order="after" to all router-view elements

    //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app/components/app/app')));
}
