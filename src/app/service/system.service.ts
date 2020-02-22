import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class SystemService {
	time = {
		date: '',
		time: ''
	};
	timeSetTimer: any = null;
	lang = 'en';
	langLabel = 'EN';
	langs = [{ label: '简体中文', value: 'zh' }, { label: 'EN', value: 'en' }, { label: 'Việt nam', value: 'vi' }];

	constructor(
		private translate: TranslateService
	) { }

	updateTime() {
		// 设置moment 语言
		// const lang = this.lang === 'zh' ? this.lang + '-cn' : this.lang;
		// moment.locale(this.lang);
		moment.locale();
		this.time.date = moment().format('dddd D MMMM YYYY');
		this.time.time = moment().format('k:mm:ss');
	}

    timeSet(){
		if(!this.timeSetTimer){
			this.timeSetTimer =true ;
			this.runtime();
		}
	}

	private runtime(){
		setTimeout(() =>{ this.updateTime(),this.runtime()},500);
	}

	langSet() {
        // 语言服务
        const lang = localStorage.getItem('itmp_lang');

        // 1.默认采用 '英语'
        this.lang = lang ? lang : 'en';

        // 2. 默认采用 '浏览器设置的第一语言'
        /* if (lang) {
            this.lang = lang;
        } else {
            const browserLang = this.translate.getBrowserLang();
            console.log(browserLang);
            const initLang = browserLang.match(/en|zh|vi/) ? browserLang : 'en';
            this.lang = initLang;
        } */
        this.translate.use(this.lang);
        this.langLabel = this.langs.find(l => l.value === this.lang).label;
    }

}
