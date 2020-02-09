import { messages } from './default-data/messages';
import { IMessage, Message } from "src/app/shared/models/message";
import { IUser } from "./../models/user";
import { Injectable } from "@angular/core";
import { users } from 'src/app/shared/local-storage-service/default-data/users';


@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  public getIsLoggedIn(): boolean {
    return this.read('isLoggedIn');
  }

  public setIsLoggedIn(value: boolean): void {
    this.write('isLoggedIn', value);
  }

  public getUserID(): number {
    return this.read("userID") || null;
  }

  public setUserID(id: number): void {
    this.write("userID", id);
  }

  public removeUserID(): void {
    this.remove("userID");
  }

  public getUserByKey(key: string, value: any): IUser {
    const users = this.read("users");
    return users.find((user: IUser) => {
      return user[key] === value;
    });
  }

  public getFilteredMessages(filterFunction: Function): IMessage[] {
    const messages = this.read("messages");
    return messages.filter(filterFunction);
  }

  public addMessage(message: Message): void {
    const messages = this.read("messages");
    const transformedMessages = [...messages, Message.deparse(message)];
    this.write("messages", transformedMessages);
  }

  public removeMessage(removedMessage: Message): void {
    const messages = this.read("messages");
    const message = messages.find((message: IMessage) => {
      return (message.timestamp === removedMessage.timestamp && message.authorID === removedMessage.authorID);
    });

    const transformedMessages = messages.filter(msg => msg !== message);
    this.write("messages", transformedMessages);
  }

  public setDefaultDataToLocalStorage(): void {
    if (!this.read('users') || !this.read('messages')) {
        this.write('users', users);
        this.write('messages', messages);
    }
  }

  private read(itemName: string): any {
    const value = localStorage.getItem(itemName);
    return JSON.parse(value);
  }

  private write(itemName: string, value: any): void {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(itemName, stringifiedValue);
  }

  private remove(itemName: string): void {
    localStorage.removeItem(itemName);
  }
}
