import { LoginService } from './../login-service/login.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public email: string;

  public password: string;

  private _isCorrectCredentials: boolean;
  public get isCorrectCredentials(): boolean {
    return this._isCorrectCredentials;
  }

  constructor(private _loginService: LoginService) { 
    this._isCorrectCredentials = true;
  }

  public ngOnInit(): void {
  }

  public onButtonClick(): void {
    this._isCorrectCredentials = this._loginService.login(this.email, this.password);
  }
}
