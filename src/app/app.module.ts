import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { ProjectComponent } from './project.component';
import { BlankComponent } from './blank.component';
import { LoginGuard } from './login.guard';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectComponent,
    BlankComponent
  ],
  imports: [
    BrowserModule, 
    AppRouting
  ],
  providers: [
    LoginGuard,
    AuthService,
    LoginService,
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
