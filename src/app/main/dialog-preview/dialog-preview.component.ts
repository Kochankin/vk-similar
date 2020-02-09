import { DialogPreview } from './../../shared/models/dialog-preview';
import { Component, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.scss']
})
export class DialogPreviewComponent implements OnInit {
  @Input()
  public dialogPreview: DialogPreview;

  @Output() 
  deleteEmitter: EventEmitter<Number>;

  public get isNewMessage(): boolean {
    return this.dialogPreview && !this.dialogPreview.isUser && !this.dialogPreview.latestMessage.isRead;
  }

  public get isUnreadMessage(): boolean {
    return this.dialogPreview && this.dialogPreview.isUser && !this.dialogPreview.latestMessage.isRead;
  }

  private _conversant: User;
  public get conversant(): User {
    return this._conversant;
  }

  constructor(private _router: Router) { 
    this.deleteEmitter = new EventEmitter();
  }

  public ngOnInit(): void {
    this._conversant = this.dialogPreview && this.dialogPreview.conversant;
  }

  public openDialog(): void {
    this._router.navigate([`dialog/${this._conversant.id}`]);
  }

  public deleteDialog(event: MouseEvent): void {
    event.stopPropagation();    
    this.deleteEmitter.emit(this._conversant.id);
  }
}
