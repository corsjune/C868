import { customAttribute, bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Element, Router)
@customAttribute('go-to-route')
export class GoToRoute {

    @bindable route;
    @bindable params;

    constructor(private element: Element, private router: Router) {

    }

    attached() {
        this.element.addEventListener("click", () => {
            this.router.navigateToRoute(this.route, this.params);
        });
    }
}