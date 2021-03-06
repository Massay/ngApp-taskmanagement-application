import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fg: FormGroup;
  loading: boolean;
  error: boolean;
  message: {};
  success: boolean;
  clicked: boolean;
  obs: Observable<any>;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router
              ) {
                this.loading = false;
                this.error = false;
                this.success = false;
                this.message = [];
              }

  ngOnInit() {
    this.clicked = true;
    this.fg = this.fb.group({
        'email': [null, Validators.compose([Validators.required, Validators.email])],
        'password': [null, Validators.required]
    });
  }


  validateEmail(email){
      email.subscribe( data => {
        console.log('hello', data);
      } );
  }


  login() {
    this.clicked = !true;
    this.loading = true;
    this.error = false;
    this.success = false;
    console.log('login', this.fg.value);
    this.userService.attemptAuth(this.fg.value).subscribe ( (response: any) => {
       console.log(' result from login route', response);
      this.loading = false;
       this.router.navigateByUrl('tasks');

    }, err => {
        this.error = true;
        this.loading = false;
        this.success = false;
        console.log('err', err.json().errors);
        if( err.type ===3 ){

                this.message['server_err'] = 'Server is Down.Please check your API Provider';
                this.message['email']='';
                this.message['password'] ='';
                this.message['unknown'] ='';
        }else{
            this.message = err.json().errors;
            this.message['server_err']='';
        }

    }, () => {
      this.loading = false;
    } );
  }
}
