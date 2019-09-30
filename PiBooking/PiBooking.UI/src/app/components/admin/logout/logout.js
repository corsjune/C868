var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from 'aurelia-framework';
import { environment } from 'app/environment/environment';
var Reports = (function () {
    function Reports(env) {
        this.env = env;
        var self = this;
        this._baseUrl = env.remoteSessionUrl;
        this._reporturl = env.remoteSessionUrl + '/api/Report';
    }
    Reports.prototype.activate = function (urlParams, routeMap, navInstr) {
        if (routeMap.name === "haspaid") {
            this.reportpath = "HasPaid.RDL";
        }
        else {
            this.reportpath = "Upcoming.RDL";
        }
    };
    Reports = __decorate([
        autoinject,
        __metadata("design:paramtypes", [environment])
    ], Reports);
    return Reports;
}());
export { Reports };
//# sourceMappingURL=logout.js.map