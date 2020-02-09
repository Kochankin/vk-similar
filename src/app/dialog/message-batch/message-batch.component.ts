import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MessagesBatch } from 'src/app/shared/models/messages-batch';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/app/shared/models/message';

@Component({
  selector: 'app-message-batch',
  templateUrl: './message-batch.component.html',
  styleUrls: ['./message-batch.component.scss']
})
export class MessageBatchComponent implements OnInit {
  @Input()
  public messagesBatch: MessagesBatch;

  private _messages$: BehaviorSubject<Message[]>;
  public get messages$(): BehaviorSubject<Message[]> {
    return this._messages$;
  }

  @Output() deleteEmitter: EventEmitter<Message>;

  constructor() {
    this.deleteEmitter = new EventEmitter();
   }

  public ngOnInit(): void {       
    this._messages$ = new BehaviorSubject(this.messagesBatch.messages);
  }

  public removeMessage(message: Message): void {    
    this._messages$.next(this._messages$.value.filter(msg => msg !== message));
    this.deleteEmitter.emit(message);
  }

  public isUnreadMessage(message: Message): boolean {
    return !message.isRead && this.messagesBatch && this.messagesBatch.isUser;
  }
}
