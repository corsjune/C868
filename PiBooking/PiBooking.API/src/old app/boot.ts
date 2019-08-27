import 'isomorphic-fetch';
import { Aurelia, PLATFORM } from 'aurelia-framework'; 
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-closest';

//Export jQuery to window object
import * as $ from 'jquery';
window['jQuery'] = $;
window['$'] = $;



declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) { 

    aurelia.use.standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-syncfusion-bridge'), (syncfusion) => syncfusion.ejGrid().ejSchedule().ejSignature())
        .plugin(PLATFORM.moduleName('aurelia-validation'));
    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    (<any>Promise).config({
            warnings: false,
            longStackTraces: false 
    });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app/components/app/app')));
}
