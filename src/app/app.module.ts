import { AppRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { MatButtonModule } from '@angular/material';

// import { MathJax } from 'mathjax';

//Default theme Components
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenu } from './components/account/main/main.menu.component';
import { AppTopBar } from './components/account/apptopbar/app.topbar.component';
import { AppFooter } from './components/account/appfooter/app.footer.component';
import { InlineProfileComponent } from './components/account/appProfile/app.profile.component';


//Added Components
import { AccountMainComponent } from "./components/account/main/main.component";
import { DashboardComponent } from './components/account/dashboard/dashboard.component';
import { SubscribeComponent } from './components/account/subscribe/subscribe.component';


import { ProfileComponent } from './components/account/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { LoadoutComponent } from './components/account/loadout/loadout.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
//services
import { ConfirmationService } from 'primeng/primeng';
import { LoginRegisterService } from './services/loginRegister.service';
import { EventService } from './services/event.service';
import { MasterHttpService } from './services/masterhttp.service';
import { PersonalInfo, SubjectInfo, Result, Misc, chapterwiseTest } from './services/data.service';

import { AccountGuard, TestAccountGuard, TestDeactivate, verifiedGuard } from './components/account/account.guard';

//Moment
// import * as moment from 'moment';
// import { MomentModule } from 'angular2-moment';

//pipes
import { KeysPipe } from './pipes/keys.pipe';
import { CssIdPipe } from './pipes/css-id.pipe';


import {MathJaxDirective} from './directives/mathjax.directive';
import { RoundPipe } from './pipes/round.pipe';
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule, //new
        FormsModule,
        AppRoutes,
        HttpModule,
        MatButtonModule
        //MomentModule //Moment

    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenu,
        AppTopBar,
        AppFooter,
        InlineProfileComponent,
        AccountMainComponent,
        DashboardComponent,
        SubscribeComponent,
        LoadoutComponent,
        ProfileComponent,
        LoginComponent,
        TestComponent,
        SubscriptionComponent,

        KeysPipe,
        CssIdPipe,
        RoundPipe,

        MathJaxDirective
    
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        LoginRegisterService,
        MasterHttpService,
        ConfirmationService,
        PersonalInfo, SubjectInfo, Result, Misc, chapterwiseTest, 
        AccountGuard, TestAccountGuard, TestDeactivate, verifiedGuard,
        EventService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
