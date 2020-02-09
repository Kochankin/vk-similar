import { User } from './user';
import { Message } from './message';

export interface IMessagesBatchProto {
    author: User;
    recepient: User;
    messages: Message[];
    isUser: boolean;
}

  export class MessagesBatch {
    static parse(proto: IMessagesBatchProto): MessagesBatch {
      return new MessagesBatch(
        proto.author,
        proto.recepient,
        proto.messages,
        proto.isUser,
      );
    }
  
    public deparse(): Message[] {
      return this._messages;
    }
  
    public get messages(): Message[] {
      return this._messages;
    }
  
    public get author(): User {
      return this._author;
    }

    public get recepient(): User {
      return this._recepient;
    }

    public get startTimestamp(): number {
        return this._messages[0].timestamp;
    }

    public get endTimestamp(): number {
        const { length } = this._messages;
        return this._messages[length - 1].timestamp;
    }

    public get isUser(): boolean {
      return this._isUser;
    }

    public get isAllRead(): boolean {
      return this._messages.every(message => message.isRead);
    }
  
    constructor(
      private _author: User,
      private _recepient: User,
      private _messages: Message[],
      private _isUser: boolean,
    ) {}
  }
  