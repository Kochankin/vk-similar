export interface IMessage {
  text: string;
  authorID: number;
  recipientID: number;
  timestamp: number;
  isRead: boolean;
}

export class Message {
  static parse(proto: IMessage): Message {
    return new Message(
      proto.text,
      proto.authorID,
      proto.recipientID,
      proto.timestamp,
      proto.isRead,
    );
  }

  static deparse(message: Message): IMessage {           
    return ({
      text: message.text,
      authorID: message.authorID,
      recipientID: message.recipientID,
      timestamp: message.timestamp,
      isRead: message.isRead,
    });
  }

  public get text(): string {
    return this._text;
  }

  public get authorID(): number {
    return this._authorID;
  }
  
  public get recipientID(): number {
    return this._recipientID;
  }

  public get timestamp(): number {
    return this._timestamp;
  }

  public get displayDate(): string {
    const time = new Date(this._timestamp);
    return time.toLocaleDateString();
  }

  public get displayTime(): string {
    const time = new Date(this._timestamp);
    return time.toLocaleTimeString();
  }

  public get isRead(): boolean {
    return this._isRead;
  }

  constructor(
    private _text: string,
    private _authorID: number,
    private _recipientID: number,
    private _timestamp: number,
    private _isRead: boolean,
  ) {}
}
