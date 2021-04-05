import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = document.querySelector('input');

    const newName = input.value;
    // input.value = '';
    console.log(newName);
    this.model.set({ name: newName });
  };

  onSaveClick = (): void => {
    this.model.save();
  };

  template(): string {
    return `
        <div>
        <h1>User Form</h1>
        <input placeholder=${this.model.get('name')} />
        <button class="set-name">Set Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
        </div>
      `;
  }
}
