import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/loginRegister.service';
import { Misc, PersonalInfo } from '../../services/data.service';
import { MasterHttpService } from '../../services/masterhttp.service';

import { EventService } from '../../services/event.service'
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {

  constructor(
    public httpService: LoginRegisterService,
    public masterhttp: MasterHttpService,
    public misc: Misc,
    public personalInfo: PersonalInfo,
    public router: Router,
    public event: EventService) { }
  userLoginCreds: any;
  spinner:boolean;
  ngOnInit() {
    this.userLoginCreds = { "username": null, "password": null };
  }

  signIn() {
    this.spinner = true;
    this.httpService.login(this.userLoginCreds)
        .subscribe((data: Response) => {
            if (data['Status'] == 200 || data['status'] == 200) {
                this.setToken(data['session_token']);
                this.spinner = false;
            } else {
                //this.message = [];
                //this.message.push({ severity: 'error', summary: 'Invalid Credentials', detail: 'Sign Up with OlympiadBox' });
                this.spinner = false;
            }
        },
        err=>{
            //this.message = [];
            //this.message.push({ severity: 'error', summary: 'Server Error', detail: 'Please Try Again'});
            this.spinner = false;
        })
  }
  setToken(token) {
    localStorage.setItem('session_token',token);
    this.masterhttp.setToken(token);
    this.router.navigate(['loadout']);
}
}
