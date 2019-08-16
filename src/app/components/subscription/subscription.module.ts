import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionComponent } from '../subscription/subscription.component';
import { SharedComponentsModule } from '././../../shared-components/shared-components.module';


// add account-routing module for routing of all components
import { SubscriptionRoutingModule } from './subscription-routing.module';
//import AppPrimeNgModule to add all prime ng modules
import { AppPrimeNgModule } from '../../app-prime-ng/app-prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    AppPrimeNgModule,
    SubscriptionRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    SubscriptionComponent 
  ],
  providers: [
],
})
export class SubscriptionModule { }
