import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MetricChartComponent } from './pages/metric-chart/metric-chart.component';
import { MetricChartCreateComponent } from './pages/metric-chart-create/metric-chart-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MetricDetailsComponent } from './pages/metric-details/metric-details.component';
import { LogsComponent} from './pages/logs/logs.component';
import {DxDataGridModule} from 'devextreme-angular';
import { LogsSearchComponent } from './pages/logs-search/logs-search.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MetricChartComponent,
    MetricChartCreateComponent,
    MetricDetailsComponent,
    LogsComponent,
    LogsSearchComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
