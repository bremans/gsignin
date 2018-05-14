import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    isAuthenticate: boolean = false;
    userName: string = '';
    redirectUrl: string = '';
}
