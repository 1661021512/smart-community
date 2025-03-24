import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardShareModule} from './dashboard-share.module';
import {WelcomeModule} from './welcome/welcome.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardShareModule,
    WelcomeModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
