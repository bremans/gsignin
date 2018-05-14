import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
declare const gapi: any;

@Component({
  selector: 'google-login',
  templateUrl: './login.component.html',
  styles: [`
    .hidden {
      display: none;
    }
  `] 
})
export class LoginComponent implements AfterViewInit {

  private clientId:string = '250321649374-3o4drlknv5cfj754ip8m7q1cuacnpgg5.apps.googleusercontent.com';
  public auth2: any;

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  constructor(private element: ElementRef, private authService: AuthService,
              private router: Router ) {
    this.authService.isAuthenticate = false;
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
    // this.getLogonUser();
    setTimeout (()=>{this.authService.isAuthenticate = this.auth2.isSignedIn.get()},1000);
  }

  public googleInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      }).then(() => {
        this.auth2 = gapi.auth2.getAuthInstance();
        console.log ('Auth terinisialisasi - ' + this.auth2);
        this.getLogonUser();
        this.attachSignin(this.element.nativeElement.firstElementChild);
        this.auth2.isSignedIn.listen((state) => {
          console.log ('MASUK AUTH2.ISSIGNEDIN LISTENER');
          this.authService.isAuthenticate = this.auth2.isSignedIn.get();
          console.log('Authenticate: ' + this.authService.isAuthenticate);
          if (this.authService.redirectUrl != '')
            this.router.navigateByUrl (this.authService.redirectUrl);
        });
        this.auth2.currentUser.listen((user) => {
          console.log ('MASUK AUTH2.CURRENTUSER LISTENER');
          this.authService.isAuthenticate = this.auth2.isSignedIn.get();
          setTimeout (()=>{this.authService.isAuthenticate = true},1000);
          console.log('Authenticate: ' + this.authService.isAuthenticate);
          console.log(user.getBasicProfile().getEmail());
        });
      });
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        console.log ('MASUK BUTTON HANDLER');
        this.printGoogleUser(googleUser);   
        this.authService.isAuthenticate = true;
        setTimeout (()=>{this.authService.isAuthenticate = true},1000);
      }, function (error) {
        this.isAuthenticate = false;
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  signOut(){
    // SETELAH SIGNOUT DENGAN MENEKAN BUTTON SIGNOT, BUTTON SIGNIN GAK BERFUNGSI LAGI !!!
    // KUNCINYA JANGAN GUNAKAN ngIf DI BUTTON KRN PROSES RECREATENYA TIDAK MEMBUAT LINK HANDLER JALAN
    if (this.auth2.isSignedIn.get()){
      this.auth2.signOut();
    }
    this.authService.isAuthenticate = false;
    //this.attachSignin(this.element.nativeElement.firstElementChild);
    this.router.navigate (['']);
    console.log ('Sign Out');
   }

  getLogonUser(){
      //Promise.resolve(this.auth2.signIn()).then( () => {
        if (this.auth2.isSignedIn.get()) {
          this.printGoogleUser(this.auth2.currentUser.get());
          this.authService.isAuthenticate = true;
        } else {
          console.log ("No authenticated user");
        }
     // });
  }

  changeState(){
    this.authService.isAuthenticate = !this.authService.isAuthenticate;
  }

  printGoogleUser(user){
    let profile = user.getBasicProfile();     
    console.log('Token || ' + user.getAuthResponse().id_token);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
}

