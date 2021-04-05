import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <h1>User Show</h1>
    <p>User name: ${this.model.get('name')}</p>
    <p>User age: ${this.model.get('age')}</p>
    `;
  }
}
