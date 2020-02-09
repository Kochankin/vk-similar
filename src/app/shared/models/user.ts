export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pictureSrc: string;
}

export class User {
  static parse(proto: IUser): User {
    return new User(
      proto.id,
      proto.firstName,
      proto.lastName,
      proto.email,
      proto.password,
      proto.pictureSrc
    );
  }

  public deparse(): IUser {
    return {
      id: this._id,
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      password: this._password,
      pictureSrc: this._pictureSrc
    };
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get pictureSrc(): string {
    return this._pictureSrc;
  }

  constructor(
    private _id: number,
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    private _password: string,
    private _pictureSrc: string,
  ) {}
}
