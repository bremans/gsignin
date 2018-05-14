import { Component, Injectable, ElementRef, AfterViewInit} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { ILogonUser } from './logon-user';
declare const gapi: any;

@Injectable()
// export class LoginService implements Resolve<ILogonUser>{
export class LoginService {
  // logonUser : ILogonUser;
  private clientId: string = '250321649374-3o4drlknv5cfj754ip8m7q1cuacnpgg5.apps.googleusercontent.com';
  public auth2: any;

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ILogonUser {
  //   this.logonUser = {
  //     name: "Saya",
  //     email: "",
  //     isAuthenticate: true
  //   }
  //   return this.logonUser;
  //   //throw new Error("Method not implemented.");
  // }

  constructor() {}

  public signInUser() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      })
      .then(() => {
        this.auth2 = gapi.auth2.getAuthInstance();
        console.log ('Auth terinisialisasi - ' + this.auth2);
        if (this.auth2.isSignedIn.get()) {
          this.printGoogleUser(this.auth2.currentUser.get());
        } 
        else {
          this.auth2.signIn();
        }
      })
      .catch(() => {
        return null;
      })
    });
  }

  printGoogleUser(user){
    let profile = user.getBasicProfile();
    console.log('Token || ' + user.getAuthResponse().id_token);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
}
