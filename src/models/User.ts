import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Model } from './Model';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps) {
    return new User(
      new Attributes<UserProps>(attrs),
      new ApiSync<UserProps>(),
      new Eventing()
    );
  }
}
