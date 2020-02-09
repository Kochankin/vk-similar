import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {
  public email: string;

  @Output()
  addDialogEmitter: EventEmitter<string>;

  constructor() {
    this.addDialogEmitter = new EventEmitter();
  }

  public addConversant(): void {
    if (!this.email){ return; }
    this.addDialogEmitter.emit(this.email);
  }
}
