import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$')]),

    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$'),
    ])
  })

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.registerForm.invalid) {
      return
    }
    this.http.post('http://localhost:8080/api/auth/register',
      this.registerForm.getRawValue())
      .subscribe(res => {
        this.router.navigateByUrl('auth/login')
      })
  }


}
