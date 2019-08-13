import { Component, OnInit, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/loginRegister.service';
import { Misc, PersonalInfo } from '../../services/data.service';
import { MasterHttpService } from '../../services/masterhttp.service';
import * as constants from '../../../config/constants';
import { Message } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { EventService } from '../../services/event.service'




@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('*', style({ 'overflow-y': 'hidden' })),
            state('void', style({ 'overflow-y': 'hidden' })),
            transition('* => void', [
                style({ height: '*' }),
                animate(250, style({ height: 0 }))
            ]),
            transition('void => *', [
                style({ height: '0' }),
                animate(250, style({ height: '*' }))
            ]),
        ]
        )
    ],

})

export class LoginComponent implements OnInit {

    loginRegToggle: boolean;
    tog:boolean;
    //login section
    userLoginCreds: any;

    //login-subsection  forgot password
    loginForgotToggle: boolean;
    mode: Array<string>;
    registeredEmail: string;
    registeredMobile;
    verifyForgotToggle: boolean;
    dummyPassword: string;

    dummyConfirmPassword: string;

    passwordObj: any;
    dummyGender:SelectItem[];

    //register section
    userRegCreds: any;
    dummyClass: SelectItem[];
    dummySelectedClass: string;
    dummyMobile: number;
    confirmPassword: string;


    //register subsection  mobile verify
    regVerifyToggle: boolean;
    actualOTP: number;
    mobileOtp: any;
    mobileVerified: boolean;

    //register subsection  email verify
    actualCode: string;
    emailOtp: any;
    emailVerified: boolean;

    //misc
    message: Message[];
    token: string;
    spinner:boolean;
    spinner2:boolean;
    spinner3:boolean;
    wrapper:any;
    disappear:boolean;

    modeStr:string;
    isHuman:boolean;
    @ViewChild('captcha') captcha;
    constructor(
        public httpService: LoginRegisterService,
        public masterhttp: MasterHttpService,
        public misc: Misc,
        public personalInfo: PersonalInfo,
        public router: Router,
        public event: EventService) { }

    ngOnInit() {
        this.loggedInCheck();
        this.event.control = 0;
        this.wrapper = { 'email':null,'verify_mobile':false,'verify_email':false };
        this.userLoginCreds = { "username": null, "password": null };
        this.userRegCreds = { "firstname": "", "lastname": "", "email": "", "password": "", "class": "", "mobile": "" ,"gender":""};
        this.passwordObj = { "new_password": "", "email": "" };
        //temporary
        this.dummyClass = []
        this.dummyClass.push(
            { label: "Select Class", value: null }, { label: "I", value: "I" },
            { label: "II", value: "II" }, { label: "III", value: "III" }, { label: "IV", value: "IV" }, { label: "V", value: "V" },
            { label: "VI", value: "VI" }, { label: "VII", value: "VII" }, { label: "VIII", value: "VIII" });
        this.dummyGender = [{label:'Select Gender',value:null},{label:'Male',value:'Male'},{label:'Female',value:'Female'}];

        this.reset();
    
    }

    loggedInCheck(){
        let token = localStorage.getItem('session_token');
        let previousRoute = sessionStorage.getItem('route');
        if(token!=null){
            this.masterhttp.setToken(token);
            if(previousRoute!=null){
                this.router.navigate([previousRoute]);
            }
        }
    }

    ngAfterViewInit(){
        this.userLoginCreds.password = null;
    }

    spinnerCondition(value){
        switch (value) {
            case "forgotResendMobile":
                this.modeStr = value;
                break;

            case "forgotResendEmail":
                this.modeStr = value;
                break;
            
            case "forgotVerifyMobile":
                this.modeStr = value;
                break;

            case "forgotVerifyEmail":
                this.modeStr = value;
                break;
        }
    }

    setWrapper(resend=false, mode=null,forgotPassword=false){
        if(mode=='selective'&&!resend){
            this.wrapper['email'] = this.registeredEmail;
            if(this.mode.indexOf('verify_email') > -1){
                this.wrapper['verify_email'] = true;
                this.spinner2 = true;
                if(forgotPassword){
                    this.wrapper['forgot_password'] = true;
                }
            }
            if(this.mode.indexOf('verify_mobile') > -1){
                this.wrapper['verify_mobile'] = true;
                this.spinner = true;
            }
        }
        else if(mode=='forgotMobile'&&resend){
            this.wrapper['email'] = this.registeredEmail;
            this.wrapper['verify_mobile'] = true;
            this.wrapper['verify_email'] = false;
            this.spinner = true;
        }

        else if(mode=='forgotEmail'&&resend){
            this.wrapper['email'] = this.registeredEmail;
            this.wrapper['verify_mobile'] = false;
            this.wrapper['verify_email'] = true;
            this.spinner2 = true;
            if(forgotPassword){
                this.wrapper['forgot_password'] = true;
            }
        }

        else if(mode=='mobile'&&resend){
            this.wrapper['email'] = this.userRegCreds['email'];
            this.wrapper['verify_mobile'] = true;
            this.wrapper['verify_email'] = false;
            this.spinner = true;
        }

        else if(mode=='email'&&resend){
            this.wrapper['email'] = this.userRegCreds['email'];
            this.wrapper['verify_mobile'] = false;
            this.wrapper['verify_email'] = true;
            this.spinner2 = true;
        }
    }

    generateResponse(data){
        if(!this.loginRegToggle&&!this.verifyForgotToggle){
            this.checkConditions(data);
            this.verifyForgotToggle = true;
            this.message = [];
            this.message.push({severity:'success', summary:'Reset Password', detail:'Please Verify To Reset Password'})
        }
        else if(this.wrapper['email']==this.registeredEmail&&this.verifyForgotToggle){
            this.checkConditions(data);
        }
        else if(this.loginRegToggle&&!this.regVerifyToggle){
            this.checkConditions(data);
            this.regVerifyToggle = true;
            this.message = [];
            this.message.push({severity:'success', summary:'Registration Successful', detail:'Please Verify Your Email and Mobile'})
        }
        else if(this.loginRegToggle&&this.regVerifyToggle){
            this.checkConditions(data);
        }
        this.wrapper = { 'email':null,'verify_mobile':false,'verify_email':false };
    }

    checkConditions(data){
        if(data['mobile']!=null && data['email']!=null){
            this.registeredMobile = data['mobile'];
            this.spinner2 = false;
            this.spinner = false;
        }
        if(data['mobile']==null && data['email']!=null){
            this.spinner2 = false;
        }
        if(data['mobile']!=null && data['email']==null){
            this.registeredMobile = data['mobile'];
            this.spinner = false;
        }
    }


    sendOtp() {

        var makeNull = (wrapper)=>{
            if(wrapper['verify_email']){
                this.emailOtp = null;
            }
            if(wrapper['verify_mobile']){
                this.mobileOtp = null;
            }
        }

        this.masterhttp.sendOtp(this.wrapper)
            .subscribe((data: Response) => {
                makeNull(this.wrapper);
                if(data['status']==200){
                    this.generateResponse(data['message']);
                    this.modeStr = null;
                }
                else if(data['status']==718) {
                    this.message = [];
                    this.message.push({severity:'error', summary:'Email Does Not Exists', detail:'Please Try Again With Different Email Address'})
                    this.spinner = false;
                    this.spinner2 = false;
                    this.modeStr = null;
                }
            },
            err=>{
                this.spinner = false;
                this.spinner2 = false
                this.message = [];
                this.message.push({ severity: 'error', summary: 'Server Error', detail: 'Please Try Again'});
                this.modeStr = null;
            });
    }

    verifyResponse(wrapper){
        if(this.verifyForgotToggle||this.regVerifyToggle){
            if(wrapper['verify_mobile']){
                this.mobileVerified = true;
                this.message = [];
                this.message.push({severity:'success', summary:'Success', detail:'Mobile Verified Successfully'});
            }
            if(wrapper['verify_email']){
                this.message = [];
                this.message.push({severity:'success', summary:'Success', detail:'Email Verified Successfully'});
                this.emailVerified = true;
            }
        }
        if(this.regVerifyToggle){
            this.check();
        }

        this.spinner = false;
        this.spinner2 = false;
        this.disappear = true;
    }

    verifyOtp(mode, forgot = false) {
        let wrapper = {'otp':null, 'email':this.wrapper['email'], 'verify_mobile':this.wrapper['verify_mobile'], 'verify_email':this.wrapper['verify_email']}
        if(wrapper['verify_email']){
            wrapper['otp'] = this.emailOtp;
        }
        if(wrapper['verify_mobile']){
            wrapper['otp'] = this.mobileOtp;
        }
        this.masterhttp.verifyOtp(wrapper)
        .subscribe((data)=>{
            if(data['status']==200){
                this.verifyResponse(wrapper);
                this.modeStr = null;
            }else if(data['status']==721){
                this.spinner = false;
                this.spinner2 = false;
                this.message = [];
                this.message.push({severity:'error', summary:'Incorrect OTP', detail:'Please Try Again'});
                this.modeStr = null;

            }
            else{
                this.spinner = false;
                this.spinner2 = false;
                this.message = [];
                this.message.push({severity:'error', summary:'Server Error', detail:'Please Try Again'});
                this.modeStr = null;

            }
        }, err=>{
                this.spinner = false;
                this.spinner2 = false;
                this.message = [];
                this.message.push({severity:'error', summary:'Server Error', detail:'Please Try Again'});
                this.modeStr = null;

        })
    }

    setToken(token) {
        localStorage.setItem('session_token',token);
        this.masterhttp.setToken(token);
        this.router.navigate(['loadout']);
    }

    signIn() {
        this.spinner = true;
        this.httpService.login(this.userLoginCreds)
            .subscribe((data: Response) => {
                if (data['Status'] == 200 || data['status'] == 200) {
                    this.setToken(data['session_token']);
                    this.spinner = false;
                } else {
                    this.message = [];
                    this.message.push({ severity: 'error', summary: 'Invalid Credentials', detail: 'Sign Up with OlympiadBox' });
                    this.spinner = false;
                }
            },
            err=>{
                this.message = [];
                this.message.push({ severity: 'error', summary: 'Server Error', detail: 'Please Try Again'});
                this.spinner = false;
            })
    }

    signUp() {
        if(!this.isHuman){
            return false;
        }
        else this.isHuman = false;
        var wrapper = JSON.parse(JSON.stringify(this.userRegCreds));
        wrapper['email'] = wrapper['email'].toLowerCase();
        wrapper['firstname'] = wrapper['firstname'].toLowerCase();
        wrapper['lastname'] = wrapper['lastname'].toLowerCase();
        this.loginForgotToggle = false;
        this.spinner = true;
        this.emailVerified = false;
        this.mobileVerified = false;
        this.httpService.register(wrapper)
            .subscribe((data) => {
                if(data['status']==200){
                    this.wrapper = {'email':this.userRegCreds['email'],'verify_email':true,'verify_mobile':true}
                    this.sendOtp();
                }
                else{
                    this.spinner = false;
                    this.message = [];
                    this.message.push({ severity: 'info', summary: 'Email Already Exists', detail: 'Please Login' });
                }
                this.captcha.reset();
            }, err => {
                this.message = [];
                this.message.push({ severity: 'error', summary: 'Server Error', detail: 'Please Try Again'});
                this.spinner = false;
                this.captcha.reset();

                }
            )
    }

    //called when clicked on forgot password
    forgotPassword() {
        this.reset();
        this.regVerifyToggle = false;
        this.loginForgotToggle = true;

    }

    //used to toggle loginRegister after successful registration
    check() {
        if (this.mobileVerified /*&& this.emailVerified*/) {
            this.message = []
            this.message.push({ severity: 'success', summary: 'Registration Successful', detail: 'Please Login' })
            this.reset();
            this.clearFlags();
            this.loginRegToggle = false;
        }
    }


    reset() {
        this.disappear = false;
        // login
        this.userLoginCreds['email']=null;
        this.userLoginCreds['password']=null;     
        
        // register
        this.userRegCreds['email']=null;
        this.userRegCreds['firstname']=null;
        this.userRegCreds['mobile']=null;
        this.userRegCreds['lastname']=null;
        this.userRegCreds['class']=null;
        this.userRegCreds['password']=null;
        this.userRegCreds['gender']=null;
        this.confirmPassword = null;

        // forgot password
        this.registeredEmail = null;
        this.mode = [];
        this.mobileOtp = null;
        this.emailOtp = null;
        this.passwordObj['new_password'] = null;
        this.dummyPassword = null;
        this.wrapper = { 'email':null,'verify_mobile':false,'verify_email':false };
    }

    clearFlags(){
        this.regVerifyToggle = false;
        this.loginForgotToggle = false;
        this.verifyForgotToggle = false;
        this.disappear = false;
        this.emailVerified = false;
        this.mobileVerified = false;
        this.isHuman = false;
    }

    //submit new password
    changePassword() {
        this.spinner3 = true;
        this.passwordObj['new_password'] = this.dummyPassword;
        this.passwordObj['email'] = this.registeredEmail;
        this.masterhttp.forgotPassword(this.passwordObj)
            .subscribe((data: Response) => {
                if (data['status'] == 200) {
                    this.message = [];
                    this.message.push({ severity: "success", summary: "Password Changed", detail: "Please Login" })
                    this.reset();
                    this.clearFlags();
                    this.loginRegToggle = false;
                }
                else {
                    this.message = [];
                    this.message.push({ severity: "error", summary: "Unable To Change Password", detail: "Please Try Again" });
                }
                this.spinner3 = false;
            }, 

            err=>{
                this.spinner3 = false;
                this.message = [];
                this.message.push({ severity: 'error', summary: 'Server Error', detail: 'Please Try Again'});
            });
    }

    ngOnDestroy(){
        this.reset();
        this.clearFlags();
    }

    otpPattern(){
        let pattern = new RegExp('^[0-9]{6}$');
        let a = [false,false];
        if(!pattern.test(this.mobileOtp)){
            a[0]=true;
        }
        if(!pattern.test(this.emailOtp)){
            a[1]=true;
        }
        return a;
    }

    conditionalDisplay(){
        if(this.loginForgotToggle||this.verifyForgotToggle){
            this.loginRegToggle = false;
        }
        else this.loginRegToggle = !this.loginRegToggle
    }

    skip(){
        this.reset();
        this.clearFlags();
        this.loginRegToggle = false;
        this.message = [];
        this.message.push({ severity: 'success', summary: 'Registration Complete', detail: 'Please Login'})
    }

    showResponse(event){
        let wrapper = {response:event.response};
        this.masterhttp.validateCaptcha(wrapper).subscribe((data)=>{
            if(data['status']==200){
                let status = JSON.parse(data['message']);
                if(status.success){
                    this.isHuman = true;
                }
                else this.isHuman = false;
            }
        })
    }

}
