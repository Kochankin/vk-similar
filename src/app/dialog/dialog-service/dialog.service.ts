import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { MessagesBatch } from "src/app/shared/models/messages-batch";
import { User } from "src/app/shared/models/user";
import { IMessage, Message } from "src/app/shared/models/message";
import { LocalStorageService } from 'src/app/shared/local-storage-service/local-storage.service';


@Injectable({
  providedIn: "root"
})
export class DialogService {
  private _user$: Observable<User>;
  public get user$(): Observable<User> {
    return this._user$;
  }

  private _user: User;

  constructor(private _localStorageService: LocalStorageService){
    this._user$ = this._localStorageService.user$.pipe(
      map(user => user && User.parse(user))
    );
    this._user$.subscribe(user => this._user = user);
  }

  public getMessagesBatches(recepientID: number): MessagesBatch[] {
    const messages = this._localStorageService.getFilteredMessages((message: IMessage) => {
        return message.authorID === this._user.id && message.recipientID === recepientID
          || message.authorID === recepientID && message.recipientID === this._user.id;
      });

    const sorted = messages.sort((msgA, msgB) => msgA.timestamp - msgB.timestamp);

    let currArr = [];

    return sorted
      .reduce((acc, msg, i) => {
        if (!currArr.length || msg.authorID === currArr[0].authorID) {
          currArr.push(msg);

          return i === sorted.length - 1 ? [...acc, currArr] : acc;
        } else {
          const arr = [...currArr];
          currArr = [msg];

          return i === sorted.length - 1
            ? [...acc, arr, currArr]
            : [...acc, arr];
        }
      }, [])
      .map((msgs: IMessage[]) => {
        const author = this._localStorageService.getUserByKey('id', msgs[0].authorID);
        const recepient = this._localStorageService.getUserByKey('id', msgs[0].recipientID);

        return MessagesBatch.parse({
          author: User.parse(author),
          recepient: User.parse(recepient),
          messages: msgs.map(msg => Message.parse(msg)),
          isUser: author.id === this._user.id
        });
      });
  }

  public addMessage(message: Message): void {   
    this._localStorageService.addMessage(message);
  }

  public deleteMessage(message: Message): void {   
    this._localStorageService.removeMessage(message);
  }

  public updateMessage(newMessage: Message): void {   
    this._localStorageService.updateMessage(newMessage);
  }
}
