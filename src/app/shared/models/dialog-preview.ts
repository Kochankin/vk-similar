import { User } from './user';
import { Message } from './message';

export interface IDialogPreviewProto {
    conversant: User;
    latestMessage: Message;
    isUser: boolean;
}

  export class DialogPreview {
    static parse(proto: IDialogPreviewProto): DialogPreview {
      return new DialogPreview(
        proto.conversant,
        proto.latestMessage,
        proto.isUser,
      );
    }
  
    public deparse(): Message {
      return this._latestMessage;
    }
  
    public get latestMessage(): Message {
      return this._latestMessage;
    }
  
    public get conversant(): User {
      return this._conversant;
    }

    public get isUser(): boolean {
        return this._isUser;
    }
  
    constructor(
      private _conversant: User,
      private _latestMessage: Message,
      private _isUser: boolean,
    ) {}
  }
  