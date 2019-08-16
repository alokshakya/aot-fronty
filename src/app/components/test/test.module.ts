import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestComponent } from '../test/test.component';
import { SharedComponentsModule } from '././../../shared-components/shared-components.module';


// add account-routing module for routing of all components
import { TestRoutingModule } from './test-routing.module';
//import AppPrimeNgModule to add all prime ng modules
import { AppPrimeNgModule } from '../../app-prime-ng/app-prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    AppPrimeNgModule,
    TestRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    TestComponent 
  ],
  providers: [
],
})
export class TestModule { }
