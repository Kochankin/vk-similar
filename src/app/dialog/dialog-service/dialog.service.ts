import { Injectable } from "@angular/core";
import { MessagesBatch } from "src/app/shared/models/messages-batch";
import { User } from "src/app/shared/models/user";
import { IMessage, Message } from "src/app/shared/models/message";
import { LocalStorageService } from 'src/app/shared/local-storage-service/local-storage.service';


@Injectable({
  providedIn: "root"
})
export class DialogService {
  constructor(
    private _localStorageService: LocalStorageService
  ){}

  public getMessagesBatches(recepientID: number): MessagesBatch[] {
    const userID = this._localStorageService.getUserID();
    const USER = User.parse(this._localStorageService.getUserByKey('id', userID));
   
    const messages = this._localStorageService.getFilteredMessages((message: IMessage) => {
        return message.authorID === USER.id && message.recipientID === recepientID
          || message.authorID === recepientID && message.recipientID === USER.id;
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
          isUser: author.id === USER.id
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
    const message = this._localStorageService.getFilteredMessages((message: IMessage) => {
      return message.authorID === newMessage.authorID && message.timestamp === newMessage.timestamp;
    })[0];
    this._localStorageService.removeMessage(Message.parse(message));
    this._localStorageService.addMessage(newMessage);
  }
}
