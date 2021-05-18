import { Role } from '../auth/role.enum';

export enum Status {
  ACTIVE,
  INACTIVE
}
export interface IUser {
  uid: string;
  email: string;
  name: {
    first: string
    last: string
  };
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
    public name = { first: '', last: '' },
    public picture = '',
    public role = Role.None,
    public dateOfBirth = null,
    public userStatus = Status.ACTIVE,
    public address = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    },
    public phones = []
  ) { }

  static BuildUser(user: IUser) {
    return new User(
      user.uid,
      user.email,
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
      user.uid,
      user.email,
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
