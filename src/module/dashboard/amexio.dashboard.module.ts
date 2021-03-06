import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from "../services/data/common.data.service";
import {DashBoardTitle} from "./dashboardtitle/dashboard.title.component";
import {DataPointCenterComponent} from "./datapoints/center.component";
import {DataPointsComponent} from "./datapoints/datapoints.component";
import {DataPointEastComponent} from "./datapoints/east.component";
import {DataPointNorthComponent} from "./datapoints/north.component";
import {DataPointSouthComponent} from "./datapoints/south.component";
import {DataPointWestComponent} from "./datapoints/west.component";
import {DashboardLoaderService} from "./chart.loader.service";
import {GaugeChartComponent} from "./gaugechart/gauge.chart.component";
import {HttpClientModule} from "@angular/common/http";

export * from '../services/data/common.data.service';
export * from './dashboardtitle/dashboard.title.component';
export * from './datapoints/center.component';
export * from './datapoints/datapoints.component';
export * from './datapoints/east.component';
export * from  './datapoints/north.component';
export * from './datapoints/south.component';
export * from './datapoints/west.component';
export * from './chart.loader.service';
export * from './gaugechart/gauge.chart.component';
const DASHBOARD = [
  DashBoardTitle,
  DataPointCenterComponent,
  DataPointsComponent,
  DataPointEastComponent,
  DataPointNorthComponent,
  DataPointSouthComponent,
  DataPointWestComponent,
  GaugeChartComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: DASHBOARD,
  declarations: DASHBOARD,
  providers: [CommonDataService,DashboardLoaderService]
})
export class AmexioDashBoardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioDashBoardModule,
      providers: [CommonDataService,DashboardLoaderService]
    };
  }
}
