/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountsettingsComponent } from './accountsettings.component';

describe('AccountsettingsComponent', () => {
    let component: AccountsettingsComponent;
    let fixture: ComponentFixture<AccountsettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountsettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountsettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});