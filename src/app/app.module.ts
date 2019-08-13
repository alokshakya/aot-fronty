// import { AppRoutes } from './app.routes';
import { AppRoutingModule } from './app-routing.module';
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
// import { AppMenuComponent, AppSubMenu } from './components/account/main/main.menu.component';
// import { AppTopBar } from './components/account/apptopbar/app.topbar.component';
// import { AppFooter } from './components/account/appfooter/app.footer.component';
// import { InlineProfileComponent } from './components/account/appProfile/app.profile.component';


//Added Components
// import { AccountMainComponent } from "./components/account/main/main.component";
// import { DashboardComponent } from './components/account/dashboard/dashboard.component';
import { SharedComponentsModule } from './shared-components/shared-components.module';



// import { ProfileComponent } from './components/account/profile/profile.component';
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
// import { CssIdPipe } from './pipes/css-id.pipe';

// import { RoundPipe } from './pipes/round.pipe';

import { GrowlModule } from 'primeng/primeng'; // this is being used in appcomponent html
import { DialogModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { CaptchaModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule, //new
        FormsModule,
        AppRoutingModule,
        HttpModule,
        MatButtonModule,
        GrowlModule,
        DialogModule,
        FileUploadModule,
        TooltipModule,
        PanelModule,
        OverlayPanelModule,
        PanelMenuModule,
        TabViewModule,
        RatingModule,
        ConfirmDialogModule,
        DataTableModule,
        InputMaskModule,
        CalendarModule,
        RadioButtonModule,
        DropdownModule,
        CheckboxModule,
        CaptchaModule,
        PasswordModule,
        ProgressSpinnerModule,
        ChartModule,
        SharedComponentsModule,
        //MomentModule //Moment

    ],
    declarations: [
        AppComponent,
        // AppMenuComponent,
        // AppSubMenu,
        // AppTopBar,
        // AppFooter,
        // InlineProfileComponent,
        // AccountMainComponent,
        // DashboardComponent,
        LoadoutComponent,
        LoginComponent,
        TestComponent,
        SubscriptionComponent,
        KeysPipe
    
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
