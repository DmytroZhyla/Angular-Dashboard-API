import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ErrorsHandlerService} from "../../../../shared/services/errors-handler.service";
import {AuthResponse} from "../../../models/authResponse";
import {Store} from "@ngrx/store";
import {authActions} from "../../store/actions/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$')]),

    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$'),
    ])
  })

  authLoginUrl = 'http://localhost:8080/api/auth/login'
  token!: string

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private ErrorsHandlerService: ErrorsHandlerService,
    private store$: Store
  ) {
  }

  ngOnInit(): void {
  }


  login() {
    this.store$.dispatch(authActions.tryToLogin())
    return this.http.post<AuthResponse>(this.authLoginUrl,
      this.loginForm.getRawValue())
      .subscribe((res: AuthResponse) => {
          this.auth.saveJWT(res.jwt_token)
          this.auth.saveName(res.name)
          this.store$.dispatch(authActions.isAuthed({name: this.auth.getName()}))
          this.store$.dispatch(authActions.loginSuccess(
            {
              userData: {
                name: res.name,
                jwt_token: res.jwt_token
              }
            }))
          this.router.navigateByUrl('/dashboard')
        }, error => {
          this.store$.dispatch(authActions.loginFailure(error))
          this.ErrorsHandlerService.handleError(error)
        }
      )
  }
}
