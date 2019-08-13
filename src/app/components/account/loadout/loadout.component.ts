import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MasterHttpService } from '../../../services/masterhttp.service';
import { PersonalInfo, SubjectInfo, Misc, Result } from '../../../services/data.service';
import { EventService } from '../../../services/event.service';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'app-loadout',
    templateUrl: './loadout.component.html',
    styleUrls: ['./loadout.component.scss']
})
export class LoadoutComponent implements OnInit {

    growlMsg:Message[];

    constructor(
        public http: MasterHttpService,
        public personalInfo: PersonalInfo,
        public SubjectInfo: SubjectInfo,
        public misc: Misc,
        public router: Router,
        public event: EventService,
        public result: Result
    ) { }

    ngOnInit() {
        this.event.control=0;
        this.event.feeEvent.subscribe((data)=>{
            if(data){
                this.http.getPaymentHistory(); //
            }
        })
        this.eventAction();

        this.errorCheck();
        this.loadData();
    }

    eventAction(){
        this.event.dataEvent.subscribe((data)=>{
            if(data==8){
                let previousRoute = sessionStorage.getItem('route');
                this.changeTheme(this.personalInfo.userInfo['gender']);
                if(previousRoute!=null){
                    this.router.navigate([previousRoute]);
                    // if(this.personalInfo.userInfo.email_verified==1&&this.personalInfo.userInfo.mobile_verified==1){
                        // setTimeout(()=>{
                        //     this.router.navigate([previousRoute]);
                        // },)
                    // }
                    // else this.router.navigate(['account']);
                }
                else this.router.navigate(['account'])
            }
        })
    }

    loadData(){
        this.http.getResult(); //
        this.http.setToken(localStorage.getItem('session_token'));
        this.http.getPersonalInfo();//
        this.http.getSyllabus();//
        this.http.getNotices(); //
        this.http.getTestDetails();//
        this.http.getTestimonials(); //
        this.http.getPattern();
        this.http.getFee();
        this.misc.logIn();

    }

    errorCheck(){
        this.event.errorEvent.subscribe(data=>{
            if(data){
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['login']);
            }
        })
    }

    ngOnDestroy() {
        this.http.updated = 0;
        this.event.control = 0;
    }

    changeTheme(gender) {
        let theme = {
            Male:'ob',
            Female:'pink'
        }
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        let layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        
        themeLink.href = 'assets/theme/theme-' + theme[gender] +'.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme[gender] +'.css';
    }

}
