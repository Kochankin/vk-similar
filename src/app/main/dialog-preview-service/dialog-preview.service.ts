import { Injectable } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { Message, IMessage } from "src/app/shared/models/message";
import { DialogPreview } from "src/app/shared/models/dialog-preview";
import { LocalStorageService } from "src/app/shared/local-storage-service/local-storage.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class DialogPreviewService {
  private _user: User;

  constructor(private _localStorageService: LocalStorageService) {
    this._localStorageService.user$.pipe(
      map(user => user && User.parse(user))
    ).subscribe(user => this._user = user);
  }

  public getPreviewDialogs(): DialogPreview[] {
    const messages = this._localStorageService.getFilteredMessages(
      (message: IMessage) => {
        return (
          message.authorID === this._user.id ||
          message.recipientID === this._user.id
        );
      }
    );

    const ids = messages.map(message =>
      [message.recipientID, message.authorID].find(id => id !== this._user.id)
    );
    const uniqueIds = [...new Set(ids)];

    const dialogMessages = uniqueIds.map(id => {
      return messages
        .filter(message => [message.authorID, message.recipientID].includes(id))
        .sort((msgA, msgB) => msgA.timestamp - msgB.timestamp)
        .pop();
    });

    return dialogMessages.map((latestMessage: IMessage) => {
      const isUser = latestMessage.authorID === this._user.id;
      const conversantId = isUser ? latestMessage.recipientID : latestMessage.authorID;
      const conversant = this._localStorageService.getUserByKey("id", conversantId);

      return DialogPreview.parse({
        conversant: User.parse(conversant),
        latestMessage: Message.parse(latestMessage),
        isUser
      });
    }).sort((a, b) => b.latestMessage.timestamp - a.latestMessage.timestamp);
  }

  public deleteDialog(conversantID: number): void {
    const removedMessages = this._localStorageService.getFilteredMessages(
      (message: IMessage) => {
        return (
          (message.authorID === this._user.id &&
            message.recipientID === conversantID) ||
          (message.authorID === conversantID &&
            message.recipientID === this._user.id)
        );
      }
    );

    removedMessages.forEach(message => {
      this._localStorageService.removeMessage(Message.parse(message));
    });
  }

  public addDialog(email: string): void {
    const user = this._localStorageService.getUserByKey("email", email);
    if (!user || user.id === this._user.id) {
      return;
    }

    const newMessage = Message.parse({
      text: `Hi, ${user.firstName}!`,
      authorID: this._user.id,
      recipientID: user.id,
      timestamp: new Date().getTime(),
      isRead: false
    });

    this._localStorageService.addMessage(newMessage);
  }
}
