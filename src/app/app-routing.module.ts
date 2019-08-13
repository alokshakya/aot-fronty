import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { LoadoutComponent } from './components/account/loadout/loadout.component';
import { AccountMainComponent } from "./components/account/main/main.component";
import { DashboardComponent } from './components/account/dashboard/dashboard.component';
import { SubscribeComponent } from './components/account/subscribe/subscribe.component';


import { ProfileComponent } from './components/account/profile/profile.component';

import { TestComponent } from './components/test/test.component';

import { SubscriptionComponent } from './components/subscription/subscription.component';

import { AccountGuard, TestDeactivate } from './components/account/account.guard';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'loadout',component:LoadoutComponent},
  { path: 'subscription', component: SubscriptionComponent, canDeactivate:[TestDeactivate] },
  { path: 'dashboard', component: AccountMainComponent,
    children:[
        {path:'dashboard', component: DashboardComponent},
        {path:'', redirectTo:'dashboard', pathMatch:'full'}
    ]
   },
  {
    path: 'account',
    loadChildren: './components/account/account.module#AccountModule'
  },
  {
    path: '',
    redirectTo:'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }