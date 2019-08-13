import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { AppPrimeNgModule } from '../app-prime-ng/app-prime-ng.module';

import { AppMenuComponent, AppSubMenu } from '../components/account/main/main.menu.component';
import { AppTopBar } from '../components/account/apptopbar/app.topbar.component';
import { AppFooter } from '../components/account/appfooter/app.footer.component';
import { InlineProfileComponent } from '../components/account/appProfile/app.profile.component';
import { AccountMainComponent } from '../components/account/main/main.component';
import { DashboardComponent } from '../components/account/dashboard/dashboard.component';
import {MathJaxDirective} from '../directives/mathjax.directive';
import { CssIdPipe } from '../pipes/css-id.pipe';
import { RoundPipe } from '../pipes/round.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AppPrimeNgModule
  ],
  declarations:[
    AppMenuComponent,
    AppSubMenu,
    AppTopBar,
    AppFooter,
    InlineProfileComponent,
    AccountMainComponent,
    DashboardComponent,
    CssIdPipe,
    RoundPipe,
    MathJaxDirective
  ],
  exports:[
    AppMenuComponent,
    AppSubMenu,
    AppTopBar,
    AppFooter,
    InlineProfileComponent,
    AccountMainComponent,
    DashboardComponent,
    CssIdPipe,
    RoundPipe,
    MathJaxDirective
  ]
})
export class SharedComponentsModule { }
