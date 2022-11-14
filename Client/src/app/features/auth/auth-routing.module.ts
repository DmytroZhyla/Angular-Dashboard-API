import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./component/auth.component";
import {LoginComponent} from "./login/component/login.component";
import {RegisterComponent} from "./register/component/register.component";

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
