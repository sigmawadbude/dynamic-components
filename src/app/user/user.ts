export interface IUser {
  email: string;
  id: string;
  displayName: string;
  token: string | null;
  expiresIn: Date | null;
}

export class User {
  constructor(
    public email: string,
    public id: string,
    public displayName: string,
    private _token: string,
    private _expiresIn: Date
  ) {}

  get token(): string | null {
    if (!this._expiresIn || this._expiresIn < new Date()) {
      return null;
    }
    return this._token;
  }

  get expiresIn(): Date | null {
    if (!this._expiresIn || this._expiresIn < new Date()) {
      return null;
    }
    return this._expiresIn;
  }
  
}

 // Function to convert User to IUser
export function mapToIUser(user: User): IUser {
  return {
    email: user.email,
    id: user.id,
    displayName: user.displayName,
    token: user.token,
    expiresIn: user.expiresIn
  };
}