import { LocalStorageService } from "./../../shared/local-storage-service/local-storage.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public get isLoggedIn(): boolean {
    return this._localStorageService.getIsLoggedIn();
  }

  constructor(
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {}

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
