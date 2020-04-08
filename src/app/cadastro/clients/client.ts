import { Entity } from 'src/app/data.types';

export interface IClient {
  id: number;
  name: string;
}

export class Client extends Entity implements IClient {
  constructor(
    public id = 0,
    public name = ''
  ) { super(); }

  getEntityName() {
    return 'clients';
  }

}

