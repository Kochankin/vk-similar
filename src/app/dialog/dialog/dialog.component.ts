import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { MessagesBatch } from "src/app/shared/models/messages-batch";
import { User } from "src/app/shared/models/user";
import { BehaviorSubject } from "rxjs";
import { Message } from "src/app/shared/models/message";
import { DialogService } from "../dialog-service/dialog.service";


@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent implements OnInit {
  private _messagesBatchesList$: BehaviorSubject<MessagesBatch[]>;
  public get messagesBatchesList$(): BehaviorSubject<MessagesBatch[]> {
    return this._messagesBatchesList$;
  }

  private _user: User;
  
  private _recepient: User;
  public get recepient(): User {
    return this._recepient;
  }

  public newMessage: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _dialogService: DialogService,
  ) {
    this._dialogService.user$.subscribe(user => this._user = user);
  }

  ngOnInit() {
    const batchesList = this._activatedRoute.snapshot.data.dialog as MessagesBatch[];   
    let latestBatch = batchesList.pop();  

    if (!latestBatch.isUser) {
      const messages = latestBatch.messages.map((message: Message) => {
        const { text, authorID, recipientID, timestamp } = message;
        const newMessage = Message.parse({ text, authorID, recipientID, timestamp, isRead: true });
        this._dialogService.updateMessage(newMessage);
        return newMessage;
      });

      const { author, recepient, isUser } = latestBatch; 
      latestBatch = MessagesBatch.parse({ author, recepient, isUser, messages });
    }
    batchesList.push(latestBatch);

    this._messagesBatchesList$ = new BehaviorSubject(batchesList);
    this._recepient = latestBatch.isUser ? latestBatch.recepient : latestBatch.author;
  }

  public onBackClick(): void {
    this._router.navigate(["main"]);
  }

  public sendMessage(newMessageText: string): void {
    if (!newMessageText) { return; }

    const list = this._messagesBatchesList$.value;

    const formattedMessage = Message.parse({
      text: newMessageText,
      authorID: this._user.id,
      recipientID: this._recepient.id,
      timestamp: new Date().getTime(),
      isRead: false
    });

    const lastBatch = list[list.length - 1];
    let newBatch: MessagesBatch;

    if (lastBatch && lastBatch.isUser) {
      list.pop();
      newBatch = MessagesBatch.parse({
        author: this._user,
        recepient: this._recepient,
        messages: [...lastBatch.messages, formattedMessage],
        isUser: true
      });
    } else {
      newBatch = MessagesBatch.parse({
        author: this._user,
        recepient: this._recepient,
        messages: [formattedMessage],
        isUser: true
      });
    }

    this._messagesBatchesList$.next([...list, newBatch]);
    this._dialogService.addMessage(formattedMessage);
    this.newMessage = "";
  }

  public deleteMessage(message: Message): void {
    this._dialogService.deleteMessage(message);

    let list = [...this._messagesBatchesList$.value];

    const oldBatchIndex = list.findIndex(batch =>batch.messages.includes(message));
    const newMessages = list[oldBatchIndex].messages.filter(msg => msg !== message);
    
    if (newMessages.length) {
      const newBatch = MessagesBatch.parse({
        author: list[oldBatchIndex].author,
        recepient: this._recepient,
        messages: newMessages,
        isUser: list[oldBatchIndex].isUser
      });

      list[oldBatchIndex] = newBatch;
    } else {
      list = list.filter(batch => batch !== list[oldBatchIndex]);
    }

    this._messagesBatchesList$.next(list);
  }
}
