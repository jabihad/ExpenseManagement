import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/userForAuthenticationDto.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  private _returnUrl: string;

  constructor(private _authService: AuthenticationService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  public loginUser = (loginFormValue) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password
    }

    this._authService.login(userForAuth)
      .subscribe(res => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        
        this._authService.sendMessage(localStorage.getItem("role"));

        /*if (login.username === "admin@gmail.com")
          this._returnUrl = "/admin"*/
        //  else
        //     this._returnUrl = "/home"
        this._router.navigate([this._returnUrl])
          /*.then(() => {
            window.location.reload();
          })*/
      },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error['errorMessage']
          if (this.errorMessage === undefined)
            this.errorMessage = "User Name doesn't exist"
          console.log(this.errorMessage)
          this.showError = true;
        })
  }

}
