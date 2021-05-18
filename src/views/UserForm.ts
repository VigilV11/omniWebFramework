import { User } from '../models/User';
import { View } from './View';

export class UserForm extends View {
  constructor(public user: User, public parent: Element) {
    super();
  }

  mapHandlers(): { [key: string]: () => void } {
    return {
      'click:.update-name': this.updateNameHandler.bind(this),
      'click:.set-age': this.updateAgeHandler.bind(this),
      'click:.save-data': this.saveDataHandler.bind(this),
    };
  }

  updateNameHandler() {
    const nameInput = document.querySelector('.name-input') as HTMLInputElement;
    const name = nameInput?.value;
    this.user.set({ name });
    this.user.trigger('change');
  }

  updateAgeHandler() {
    this.user.setRandomAge();
  }

  saveDataHandler() {
    this.user.save();
  }

  template(): string {
    return `
    <h1>User Form</h1>
        <input class='name-input'/>
        <button class='update-name'>Update name</button>
        <button class='set-age'>Set random age</button>
        <button class='save-data'>Save data</button>
        `;
  }
}
