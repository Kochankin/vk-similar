import { Injectable } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { Message, IMessage } from "src/app/shared/models/message";
import { DialogPreview } from "src/app/shared/models/dialog-preview";
import { LocalStorageService } from "src/app/shared/local-storage-service/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class DialogPreviewService {
  private _USER: User;

  constructor(
    private _localStorageService: LocalStorageService
  ) {
  }

  public getPreviewDialogs(): DialogPreview[] {
    const userID = this._localStorageService.getUserID();
    this._USER = User.parse(this._localStorageService.getUserByKey('id', userID));
    
    const messages = this._localStorageService.getFilteredMessages(
      (message: IMessage) => {
        return (
          message.authorID === this._USER.id ||
          message.recipientID === this._USER.id
        );
      }
    );

    const ids = messages.map(message =>
      [message.recipientID, message.authorID].find(id => id !== this._USER.id)
    );
    const uniqueIds = [...new Set(ids)];

    const dialogMessages = uniqueIds.map(id => {
      return messages
        .filter(message => [message.authorID, message.recipientID].includes(id))
        .sort((msgA, msgB) => msgA.timestamp - msgB.timestamp)
        .pop();
    });

    return dialogMessages.map((latestMessage: IMessage) => {
      const isUser = latestMessage.authorID === this._USER.id;
      const conversantId = isUser ? latestMessage.recipientID : latestMessage.authorID;
      const conversant = this._localStorageService.getUserByKey("id",conversantId);

      return DialogPreview.parse({
        conversant: User.parse(conversant),
        latestMessage: Message.parse(latestMessage),
        isUser
      });
    });
  }

  public deleteDialog(conversantID: number): void {
    const removedMessages = this._localStorageService.getFilteredMessages(
      (message: IMessage) => {
        return (
          (message.authorID === this._USER.id &&
            message.recipientID === conversantID) ||
          (message.authorID === conversantID &&
            message.recipientID === this._USER.id)
        );
      }
    );

    removedMessages.forEach(message => {
      this._localStorageService.removeMessage(Message.parse(message));
    });
  }

  public addDialog(email: string): void {
    const user = this._localStorageService.getUserByKey("email", email);
    if (!user || user.id === this._USER.id) {
      return;
    }

    const newMessage = Message.parse({
      text: `Hi, ${user.firstName}!`,
      authorID: this._USER.id,
      recipientID: user.id,
      timestamp: new Date().getTime(),
      isRead: false
    });

    this._localStorageService.addMessage(newMessage);
  }
}
