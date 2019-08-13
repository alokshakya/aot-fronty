import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountMainComponent } from "./main/main.component";
import { DashboardComponent } from './dashboard/dashboard.component'
import { SubscribeComponent } from './subscribe/subscribe.component'

//Computers
import { DemotestComputersComponent } from './computers/demotest/demotest-computers.component'
import { ChapterwisetestComputersComponent } from './computers/chapterwisetest/chapterwisetest-computers.component'
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
import { DemotestGkComponent } from './gk/demotest/demotest-gk.component';
import { MocktestGkComponent } from './gk/mocktest/mocktest-gk.component';
import { ResultGkComponent } from './gk/result/result-gk.component';
import { SampletestGkComponent } from './gk/sampletest/sampletest-gk.component';

import { ChapterwisetestReasoningComponent } from './reasoning/chapterwisetest/chapterwisetest-reasoning.component';
import { DemotestReasoningComponent } from './reasoning/demotest/demotest-reasoning.component';
import { ResultReasoningComponent } from './reasoning/result/result-reasoning.component';


import { ProfileComponent } from './profile/profile.component';
import { CreateticketComponent } from '../support/createticket/createticket.component';
import { ViewticketComponent } from '../support/viewticket/viewticket.component';
import { AccountGuard, TestAccountGuard, TestDeactivate} from './account.guard';


const routes: Routes = [

  {path:'', component: AccountMainComponent, canActivate:[AccountGuard], children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, },
            { path: 'subscribe', component: SubscribeComponent },

            { path: 'computers/demotest', component: DemotestComputersComponent },
            { path: 'computers/chapterwisetest', component: ChapterwisetestComputersComponent },
            { path: 'computers/sampletest', component: SampletestComputersComponent },
            { path: 'computers/mocktest', component: MocktestComputersComponent },
            { path: 'computers/result', component: ResultComputersComponent },
            
            { path: 'english/demotest', component: DemotestEnglishComponent },
            { path: 'english/chapterwisetest', component: ChapterwisetestEnglishComponent },
            { path: 'english/sampletest', component: SampletestEnglishComponent },
            { path: 'english/mocktest', component: MocktestEnglishComponent },
            { path: 'english/result', component: ResultEnglishComponent },

            { path: 'science/demotest', component: DemotestScienceComponent },
            { path: 'science/chapterwisetest', component: ChapterwisetestScienceComponent },
            { path: 'science/sampletest', component: SampletestScienceComponent },
            { path: 'science/mocktest', component: MocktestScienceComponent },
            { path: 'science/result', component: ResultScienceComponent },

            { path: 'math/demotest', component: DemotestMathComponent },
            { path: 'math/chapterwisetest', component: ChapterwisetestMathComponent },
            { path: 'math/sampletest', component: SampletestMathComponent },
            { path: 'math/mocktest', component: MocktestMathComponent },
            { path: 'math/result', component: ResultMathComponent },

            { path: 'gk/demotest', component: DemotestGkComponent },
            { path: 'gk/chapterwisetest', component: ChapterwisetestGkComponent },
            { path: 'gk/sampletest', component: SampletestGkComponent },
            { path: 'gk/mocktest', component: MocktestGkComponent },
            { path: 'gk/result', component: ResultGkComponent },

            { path: 'reasoning/demotest', component: DemotestReasoningComponent },
            { path: 'reasoning/chapterwisetest', component: ChapterwisetestReasoningComponent },
            { path: 'reasoning/result', component: ResultReasoningComponent },
            
            { path: 'profile', component: ProfileComponent,canDeactivate:[TestDeactivate]},

            { path: 'support/createticket', component:CreateticketComponent},
            { path: 'support/viewticket', component:ViewticketComponent},

            {path:'', redirectTo:'dashboard', pathMatch:'full'}
  ]},
//   {path:'', redirectTo:'account', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }