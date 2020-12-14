import { get } from 'lodash';
import { IDeserializable } from '../';

export class User implements IDeserializable {
  id?: string;
  name?: string;
  email?: string;
  accountToken?: string;
  refreshToken?: string;

  deserialize(input: any): this {
    this.accountToken = get(input, 'body.accessToken');
    this.id = get(input, 'body.accountId');
    this.name = get(input, 'body.patronName');
    this.email = get(input, 'body.email');
    this.refreshToken = get(input, 'body.refreshToken');

    return this;
  }
}

export interface LoginDataDTO {
  email: string;
  password: string;
}
