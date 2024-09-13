import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './i18n/', '.json');
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TranslateModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    title = 'Abezo - Angular 18 Job Board Template';

    constructor(
        private router: Router,
        private viewportScroller: ViewportScroller,
        public translate: TranslateService
    ) {

        translate.addLangs(['en', 'fr']);
        translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();
        console.log("browserLang==>", browserLang);
        // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                // Scroll to the top after each navigation end
                this.viewportScroller.scrollToPosition([0, 0]);
            }
        });
    }

}