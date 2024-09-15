import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastComponent } from './common/toast/toast.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './i18n/', '.json');
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TranslateModule, ToastComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    title = 'Medserve';

    constructor(
        private router: Router,
        private viewportScroller: ViewportScroller,
        public translate: TranslateService
    ) {

        this.translate.addLangs(['en', 'fr']);
        this.translate.setDefaultLang('en');

        const browserLang = this.translate.getBrowserLang();
        console.log("browserLang==>", browserLang);
        translate.use(browserLang && browserLang.match(/en|fr/) ? browserLang : 'en');

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                // Scroll to the top after each navigation end
                this.viewportScroller.scrollToPosition([0, 0]);
            }
        });
    }

}