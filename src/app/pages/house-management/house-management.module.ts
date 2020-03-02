import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HouseManagementComponent } from './house-management.component';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { PublicComponentModule } from '../../public/public-component.module';
import { ShareModule } from 'src/app/share/ShareModule';
import { AddHouseinfoComponent } from './add-houseinfo/add-houseinfo.component';
// import { TechnicalAlarmComponent } from './technical-alarm/technical-alarm.component';
// import { InstrusionDetectionComponent } from './instrusion-detection/instrusion-detection.component';
// import { AlarmReportComponent } from './technical-alarm/alarm-report/alarm-report.component';
// import { TrafficMeasureComponent } from './traffic-measure/traffic-measure.component';
// import { TechnicalAlertComponent } from './technical-alert/technical-alert.component';
// import { EquipmentStatusComponent } from './equipment-status/equipment-status.component';
// import { AlarmModalComponent } from './equipment-status/alarm-modal/alarm-modal.component';
// import { ReportModelComponent } from './traffic-measure/report-model/report-model.component';


import {NgxEchartsModule} from 'ngx-echarts';

const COMPONENT = [
    HouseManagementComponent,
    AddHouseinfoComponent
];

const routes: Routes = [
    {
        path: '',
        component: HouseManagementComponent,
        children: [
            // { path: '', redirectTo: 'traffic-alert-page', pathMatch: 'full' },
            { path: 'add-houseInfo', component: AddHouseinfoComponent }
            // { path: 'instrusion-detection', component: InstrusionDetectionComponent },
            // { path: 'traffic-measure', component: TrafficMeasureComponent },
            // { path: 'technical-alert', component: TechnicalAlertComponent },
            // { path: 'equipment-status', component: EquipmentStatusComponent }
            // { path: 'traffic-measure-page', component: TrafficMeasureComponent },
            // { path: 'traffic-alert-page', component: TrafficAlertComponent },
            // { path: 'technical-alarm-page', component: TechnicalAlarmComponent }
            // { path: 'incident-record', component: IncidentRecordComponent },
            // { path: 'incident-logs', component: IncidentLogsComponent }
        ]
    }
];

@NgModule({
    imports: [ShareModule, NgZorroAntdModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), NgxEchartsModule],
    declarations: COMPONENT
})
export class HouseManagementModule {}

