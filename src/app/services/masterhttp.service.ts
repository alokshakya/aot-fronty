import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PersonalInfo, SubjectInfo, Result, chapterwiseTest, Misc } from './data.service';
import { EventService } from './event.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as constants from '../../config/constants';

@Injectable()
export class MasterHttpService {
    token: string;
    updated = 0;
    errorEvent:EventEmitter<boolean> = new EventEmitter();
    queryHeaders;
    baseUrl = 'http://scripts.olympiadbox.com/services/api/api.php';
    constructor(
        public http: Http,
        public router: Router,
        public personalInfo: PersonalInfo,
        public subjectInfo: SubjectInfo,
        public misc: Misc,
        public chapterwiseTest: chapterwiseTest,
        public result: Result,
        public event:EventService) {
        this.queryHeaders = new Headers();
        this.queryHeaders.append('Content-Type', 'application/json');
        this.queryHeaders.append('Olympiadbox-Api-Key', constants.OLYMPIADBOX_API_KEY);
    }

    checkToken() {
        if (this.token != localStorage.getItem('session_token')) {
            return false;
        }else {
            return true
        };
    }

    httpError(){
        // this.errorEvent.emit(true);
        this.event.emitErrEvent();
    }

    dataRetreived() {
        this.updated++;
        if (this.updated == 7) {
            let previousRoute = sessionStorage.getItem('route')
            if(previousRoute!=null){
                this.router.navigate([previousRoute]);
            }
            else this.router.navigate(['account'])
        }
    }

    setToken(token) {
        this.token = token;
        this.queryHeaders = new Headers();
        this.queryHeaders.append('Content-Type', 'application/json');
        this.queryHeaders.append('Olympiadbox-Api-Key', constants.OLYMPIADBOX_API_KEY);
        this.queryHeaders.append('session_token', localStorage.getItem('session_token'));
        this.dataRetreived();
    }

    sendOtp(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/otp/generate', requestBody, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json())
    }

    verifyOtp(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/otp/verify', requestBody, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json());
    }

    updatePassword(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/user/updatepassword', requestBody, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json());
    }

    forgotPassword(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/user/forgotpassword', requestBody, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json());
    }

    addTestimonial(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/user/testimonial', requestBody, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json())
    }

    addAchievement(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/user/achievement', requestBody, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json())
    }

    logout(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/user/logout', requestBody, {headers:this.queryHeaders})
            .map((resp:Response)=> resp.json())
    }

    updateProfile(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/user/update', requestBody, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json())
    }

    getSchool(couponeCode) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/user/school', couponeCode, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json())
    }

    generateTest(requestbody) {
            return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/test/generate', requestbody, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json())
        }

    nextQuestion(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/test/nextquestion', requestBody, { headers: this.queryHeaders })
            .map((resp: Response) => resp.json())
    }

    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // data service implementation
    getPersonalInfo() {
        this.http.get(constants.OLYMPIADBOX_INSTANCE_URL + '/user/profile', { headers: this.queryHeaders })
            .map((resp: Response) => resp.json())
            .subscribe((data) => {
                if (data['status'] == 200) {
                    this.personalInfo.setInfo(data['message'][0]);
                    this.dataRetreived();
                }
                else{
                    this.httpError();
                }
            },
            err=>{this.httpError()})
    }

    getSyllabus() {
        this.http.get(constants.OLYMPIADBOX_INSTANCE_URL + '/classdata/topics', { headers: this.queryHeaders }).map((resp: Response) => resp.json())
            .subscribe((data) => {
                if(data.hasOwnProperty('status')){
                    if(data['status']==719){
                        this.httpError();
                    }
                }
                else{
                    this.subjectInfo.setSyllabus(data['class']['subjects']);
                    this.dataRetreived();
                }
            },
            err=>{
                this.httpError();
            })
    }

    getTestDetails() {
        this.http.get(constants.OLYMPIADBOX_INSTANCE_URL + '/test/details', { headers: this.queryHeaders }).map((resp: Response) => resp.json())
            .subscribe((data) => {
                if(data['status']==723){
                    this.httpError();
                }
                else{
                    this.chapterwiseTest.setTestDetails(data['message']);
                    this.dataRetreived();
                }
            },
            err=>{
                this.httpError();
            })
    }

    getResult() {
        this.http.get(constants.OLYMPIADBOX_INSTANCE_URL + '/result/generate', { headers: this.queryHeaders }).map((resp: Response) => resp.json())
            .subscribe((data) => {
                if(data['status']==723){
                    this.httpError();
                }
                else{
                    this.result.setResult(data['message']);
                    this.dataRetreived();
                }
            },
            err=>{
                this.httpError();
            })
    }
    // -----------------------------------------------------------------------------------------------
    setQuestions(data) {
        this.chapterwiseTest.setQuesAnswerSet(data);
        this.router.navigate(['test']);
    }

    beginTest(requestBody) {
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL + '/test/attempt', requestBody, { headers: this.queryHeaders })
        .map((resp: Response) => resp.json())
    }
    // -------------------------------------------------------------------------------------------------

    retakeTest(requestBody){
        return this.http.post(constants.OLYMPIADBOX_INSTANCE_URL+ '/test/retake', requestBody, {headers: this.queryHeaders})
        .map((resp: Response) => resp.json())
    }

    getTestimonials() {
        this.http.get(constants.OLYMPIADBOX_INSTANCE_URL + '/common/tablerecords/testimonial', { headers: this.queryHeaders }).map((resp: Response) => resp.json())
            .subscribe((data) => {
                this.misc.setTestimonial(data['message']);
                this.dataRetreived();
            })
    }

    getNotices() {
        this.http.get(constants.OLYMPIADBOX_INSTANCE_URL + '/common/tablerecords/notice_board', { headers: this.queryHeaders }).map((resp: Response) => resp.json())
            .subscribe((data) => {
                this.misc.setNotice(data['message']);
                this.dataRetreived();
            },
            err=>{
                this.httpError();
            })
    }

    getUserTestimonials(studentId){
        return this.http.get(constants.OLYMPIADBOX_INSTANCE_URL + '/common/relatedtable/testimonial/user_testimonial_set/testimonial_id/student_id/'+studentId, {headers: this.queryHeaders})
        .map((resp: Response)=>resp.json())
        .subscribe((data)=>this.personalInfo.setUserTestimonials(data['message']),
            err=>{
                this.httpError();
            })
    }
}
