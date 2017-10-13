import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { SubjectInfo, Misc } from '../../../services/data.service';
import { MasterHttpService } from '../../../services/masterhttp.service';
import { Message } from 'primeng/primeng';
import { CurrencyPipe } from '@angular/common';
import * as constants from '../../../../config/constants';

@Component({
    selector: 'app-accountsettings',
    templateUrl: './accountsettings.component.html',
    styleUrls: ['./accountsettings.component.scss']
})
export class AccountsettingsComponent implements OnInit {

    //subscription details panel
    subscriptionTableData: any;
    subscriptionTableHeaders: any;

    //subscribe now panel
    selectAll: boolean;
    subjectsPrice: any;
    selectedPackage: Array<string>;
    subjects: Array<string>;
    coupon: string;
    subPriceTable: any;


    //temporary
    col: Array<any>;  //header for datatable
    dummySubjects: Array<string>;
    dummyPrice: Array<number>;
    growlMsg:Message[];
    spinner:boolean;
    constructor(
        public _router: Router,
        public subjectInfo: SubjectInfo,
        public misc: Misc,
        public http: MasterHttpService) {
        this.selectedPackage = [];

        this.col = [{ "header": "Subject", "field": "subject_name" }, { "header": "Price", "field": "amount" }]

    }

    ngOnInit() {
        this.misc.setCurrentRoute(["Account Settings"]);
        this.misc.setLocalRoute('account/accountsettings');
    }

    redirect(url){
        let path = constants.PAYMENT_GATEWAY_URL+url;
        window.location.href = path;
        this.spinner = false;
    }

    growlDisplay(severity,summary,detail){
        this.growlMsg = [];
        this.growlMsg.push({'severity':severity,'summary':summary,'detail':detail});
    }

    pay() {
        this.spinner=true;
        let wrapper = {amount:0, fee_id:''};
        for(let i in this.selectedPackage){
            wrapper['amount'] += parseInt(this.selectedPackage[i]['amount']);
            wrapper['fee_id'] += this.selectedPackage[i]['fee_id']+',';
        }
        this.http.subscribe(wrapper).subscribe((data)=>{
            if(data['status']==200){
                this.redirect(data['url']);
            }
            else{
                this.growlDisplay('error','Could Not Process','Please Try Again');
                this.spinner=false;
            }
        },err=>{
                this.growlDisplay('error','Server Error','Please Try Again');
                this.spinner=false;
        })
    }
}



