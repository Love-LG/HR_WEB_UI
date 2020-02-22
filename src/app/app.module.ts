import { NgModule ,APP_INITIALIZER} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { ShareModule } from './share/ShareModule';
import { PublicComModule } from './public/public-com.module';
import { AppComponent } from './app.component';

import { MatIconRegistry } from '@angular/material';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { HttpInterceptorProviders } from './blocks/http-interceptor';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigService } from './config/config.service';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppConfig } from './app.config';
import {SimpleReuseStrategy} from './service/simpleReuseStrategy';
import {RouteReuseStrategy} from '@angular/router';
import {NgxEchartsModule} from 'ngx-echarts';

registerLocaleData(en);

export function createTranslateHttpLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function initializeApp(appConfig: AppConfig) {
	return () => appConfig.load();
}

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		ShareModule.forRoot(),
		LayoutsModule, // ccm
		PublicComModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateHttpLoader,
				deps: [HttpClient]
			}
		}),
		NgxEchartsModule,
		BrowserAnimationsModule,
		NgZorroAntdModule
	],
	declarations: [AppComponent],
	providers: [
		AppConfig,
		{
			provide: APP_INITIALIZER,
			useFactory: initializeApp,
			deps: [AppConfig],
			multi: true,
		},
		{ provide: RouteReuseStrategy, useClass: SimpleReuseStrategy },
		{ provide: NZ_I18N, useValue: en_US },
		ConfigService,
		HttpInterceptorProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(
		matIconRegistry: MatIconRegistry,
		domSanitizer: DomSanitizer
	) {
		matIconRegistry.addSvgIcon('search',
			domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/search.svg'));
	}
}
