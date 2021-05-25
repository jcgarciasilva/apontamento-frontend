import { Role } from '../auth/role.enum';

export enum Status {
  ACTIVE,
  INACTIVE
}

export enum Genre {
  MALE,
  FEMALE
}

export interface IUser {
  uid: string;
  email: string;
  login: string;
  name: string;
  picture: string;
  role: Role;
  userStatus: Status;
  dateOfBirth: Date;
  address: {
    line1: string
    line2: string
    city: string
    state: string
    zip: string
  };
  phones: IPhone[];
  genre: Genre;
}

export interface IPhone {
  type: string;
  number: string;
  id: number;
}

export class User implements IUser {
  constructor(
    public uid = '',
    public email = '',
    public login,
    public name = '',
    public picture = '',
    public role = Role.DEVELOPER,
    public dateOfBirth = null,
    public userStatus = Status.ACTIVE,
    public address = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    },
    public phones = [],
    public genre = null,
  ) { }

  static BuildUser(user: IUser) {
    return new User(
      user.uid,
      user.email,
      user.login,
      user.name,
      user.picture,
      user.role,
      user.dateOfBirth,
      user.userStatus,
      user.address,
      user.phones
    );
  }

  static createUser(user: any) {
    return new User(
      user?.uid,
      user?.email,
      user?.name,
      user?.picture,
      user?.role,
      user?.dateOfBirth,
      Status.ACTIVE,
      user?.address,
      user?.phones
    );
  }
}
