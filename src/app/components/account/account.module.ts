import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChapterwisetestComputersComponent } from './computers/chapterwisetest/chapterwisetest-computers.component';

import { DemotestComputersComponent } from './computers/demotest/demotest-computers.component';
import { SampletestComputersComponent } from './computers/sampletest/sampletest-computers.component';
import { MocktestComputersComponent } from './computers/mocktest/mocktest-computers.component';
import { ResultComputersComponent } from './computers/result/result-computers.component';

import { DemotestEnglishComponent } from './english/demotest/demotest-english.component';
import { ChapterwisetestEnglishComponent } from './english/chapterwisetest/chapterwisetest-english.component';
import { SampletestEnglishComponent } from './english/sampletest/sampletest-english.component';
import { MocktestEnglishComponent } from './english/mocktest/mocktest-english.component';
import { ResultEnglishComponent } from './english/result/result-english.component';

import { ChapterwisetestScienceComponent } from './science/chapterwisetest/chapterwisetest-science.component';
import { DemotestScienceComponent } from './science/demotest/demotest-science.component';
import { MocktestScienceComponent } from './science/mocktest/mocktest-science.component';
import { SampletestScienceComponent } from './science/sampletest/sampletest-science.component';
import { ResultScienceComponent } from './science/result/result-science.component';

import { ChapterwisetestMathComponent } from './mathematics/chapterwisetest/chapterwisetest-math.component';
import { DemotestMathComponent } from './mathematics/demotest/demotest-math.component';
import { MocktestMathComponent } from './mathematics/mocktest/mocktest-math.component';
import { ResultMathComponent } from './mathematics/result/result-math.component';
import { SampletestMathComponent } from './mathematics/sampletest/sampletest-math.component';

import { ChapterwisetestGkComponent } from './gk/chapterwisetest/chapterwisetest-gk.component';
import { SampletestGkComponent } from './gk/sampletest/sampletest-gk.component';
import { MocktestGkComponent } from './gk/mocktest/mocktest-gk.component';
import { DemotestGkComponent } from './gk/demotest/demotest-gk.component';
import { ResultGkComponent } from './gk/result/result-gk.component';


import { ChapterwisetestReasoningComponent } from './reasoning/chapterwisetest/chapterwisetest-reasoning.component';
import { DemotestReasoningComponent } from './reasoning/demotest/demotest-reasoning.component';
import { ResultReasoningComponent } from './reasoning/result/result-reasoning.component';


import { CreateticketComponent } from '../../components/support/createticket/createticket.component';
import { ViewticketComponent } from '../../components/support/viewticket/viewticket.component';

import { SubscribeComponent } from './subscribe/subscribe.component';

import { LoginComponent } from '../login/login.component';

import { SharedComponentsModule } from '././../../shared-components/shared-components.module';

import { ProfileComponent } from './profile/profile.component';
// add account-routing module for routing of all components
import { AccountRoutingModule } from './account-routing.module';
//import AppPrimeNgModule to add all prime ng modules
import { AppPrimeNgModule } from '../../app-prime-ng/app-prime-ng.module';

// import { KeysPipe } from '../../pipes/keys.pipe';
// import { CssIdPipe } from '../../pipes/css-id.pipe';

// import { RoundPipe } from '../../pipes/round.pipe';

import { LoginRegisterService } from '../../services/loginRegister.service';
import { EventService } from '../../services/event.service';
import { MasterHttpService } from '../../services/masterhttp.service';
import { PersonalInfo, SubjectInfo, Result, Misc, chapterwiseTest } from '../../services/data.service';

import { AccountGuard, TestAccountGuard, TestDeactivate, verifiedGuard } from '../account/account.guard';

@NgModule({
  imports: [
    CommonModule,
    AppPrimeNgModule,
    AccountRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    ChapterwisetestComputersComponent,

    DemotestComputersComponent,
    SampletestComputersComponent,
    MocktestComputersComponent,
    ResultComputersComponent,

    DemotestEnglishComponent,
    ChapterwisetestEnglishComponent,
    SampletestEnglishComponent,
    MocktestEnglishComponent,
    ResultEnglishComponent,

    ChapterwisetestScienceComponent,
    DemotestScienceComponent,
    MocktestScienceComponent,
    SampletestScienceComponent,
    ResultScienceComponent,

    ChapterwisetestMathComponent,
    DemotestMathComponent,
    MocktestMathComponent,
    ResultMathComponent,
    SampletestMathComponent,

    ChapterwisetestGkComponent,
    SampletestGkComponent,
    MocktestGkComponent,
    DemotestGkComponent,
    ResultGkComponent,

    ChapterwisetestReasoningComponent,
    DemotestReasoningComponent,
    ResultReasoningComponent,
    CreateticketComponent,
    ViewticketComponent,
    SubscribeComponent,
    ProfileComponent,
    LoginComponent
  ],
  providers: [
    AccountGuard, TestAccountGuard, TestDeactivate, verifiedGuard,
    // MasterHttpService, PersonalInfo, SubjectInfo, Result, Misc, chapterwiseTest
],
})
export class AccountModule { }
