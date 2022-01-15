import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MetricChartComponent } from './pages/metric-chart/metric-chart.component';
import { MetricChartCreateComponent } from './pages/metric-chart-create/metric-chart-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MetricDetailsComponent } from './pages/metric-details/metric-details.component';
import { LogsComponent} from './pages/logs/logs.component';
import {DxDataGridModule} from 'devextreme-angular';
import { LogsSearchComponent } from './pages/logs-search/logs-search.component';
import { DetectorListComponent } from './pages/detector-list/detector-list.component';
import {DurationFormatPipe} from './pipes/duration-format.pipe';
import {BoolEnabledPipe} from './pipes/bool-enabled.pipe';
import { DetectorToggleButtonComponent } from './pages/detector-toogle-button/detector-toggle-button.component';
import { DetectorDetailsComponent } from './pages/detector-details/detector-details.component';
import { DetectorDetailsButtonComponent } from './pages/detector-details-button/detector-details-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MetricChartComponent,
    MetricChartCreateComponent,
    MetricDetailsComponent,
    LogsComponent,
    LogsSearchComponent,
    DetectorListComponent,
    DurationFormatPipe,
    BoolEnabledPipe,
    DetectorToggleButtonComponent,
    DetectorDetailsComponent,
    DetectorDetailsButtonComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    DxDataGridModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
