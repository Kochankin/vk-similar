import { DialogPreview } from './../../shared/models/dialog-preview';
import { Component, OnInit } from '@angular/core';
import { DialogPreviewService } from '../dialog-preview-service/dialog-preview.service';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/login/login-service/login.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private _dialogPreviews$: BehaviorSubject<DialogPreview[]>;
  public get dialogPreviews$(): BehaviorSubject<DialogPreview[]> {
    return this._dialogPreviews$;
  }

  constructor(
    private _dialogPreviewService: DialogPreviewService, 
    private _loginService: LoginService,
  ) {
    this._dialogPreviews$ = new BehaviorSubject([]);
  }

  public ngOnInit(): void {
    const initialPreviews = this._dialogPreviewService.getPreviewDialogs();    
    this._dialogPreviews$.next(initialPreviews);
  }

  public logout(): void {
    this._loginService.logout();
  }

  public deleteDialog(conversantID: number): void {
    this._dialogPreviewService.deleteDialog(conversantID);
    this._dialogPreviews$.next(
      this._dialogPreviewService.getPreviewDialogs()
    );
  }

  public addDialog(email: string): void {
    this._dialogPreviewService.addDialog(email); 
    this._dialogPreviews$.next(
      this._dialogPreviewService.getPreviewDialogs()
    );
  }
}
