import { LocalStorageService } from "./../../shared/local-storage-service/local-storage.service";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user";

@Injectable({
  providedIn: "root"
})
export class LoginService implements OnInit {
  public get isLoggedIn(): boolean {
    return this._localStorageService.getIsLoggedIn();
  }

  constructor(
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {}

  public ngOnInit(): void {
    // const userID = this._localStorageService.getUserID();
    // const user = this._localStorageService.getUserByKey("id", userID);
    // this._user = (user && User.parse(user)) || null;
  }

  public login(email: string, password: string): boolean {
    const user = this._localStorageService.getUserByKey("email", email);
    const isCorrectCredentials = user && user.password === password.trim();

    this._localStorageService.setIsLoggedIn(isCorrectCredentials);

    if (isCorrectCredentials) {
      this._localStorageService.setUserID(user.id);

      this._router.navigate(["main"]);
    }

    return isCorrectCredentials;
  }

  public logout(): void {
    this._localStorageService.setIsLoggedIn(false);
    this._localStorageService.removeUserID();

    this._router.navigate(["login"]);
  }
}
