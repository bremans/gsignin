import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { AppComponent } from './app.component';
import { BlankComponent } from './blank.component';
import { LoginGuard } from './login.guard';

const ROUTES = [
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    component: BlankComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'project',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRouting {}
