import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/ShareModule';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { WebSocketUtil } from './utils/websocket';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicModalComponent } from './public-modal/public-modal.component';

const COMPONENT = [
	PublicModalComponent
];

@NgModule({
	declarations: COMPONENT,
	imports: [
		ShareModule,
		CommonModule,
		NgZorroAntdModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [...COMPONENT],
	providers: []
})
export class PublicComModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: PublicComModule,
			providers: [WebSocketUtil]
		};
	}
}
