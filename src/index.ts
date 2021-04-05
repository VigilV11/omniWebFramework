import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

import { User } from './models/User';
import { UserForm } from './views/UserForm';
import { UserShow } from './views/UserShow';
import { UserEdit } from './views/UserEdit';

const user = User.buildUser({ id: 3, name: 'wicky', age: 23 });

// console.log(user.get('name'));
// user.on('save', () => console.log('Saved data'));
// user.save();

///////////

// const collection = User.buildUserCollection();

// collection.on('change', () => console.log(collection.models));
// collection.fetch();

const root = document.querySelector('.app-root');

// type guard for TS strict null check (as root could be null if .app-root is not defined)
// if (root) {
//   const form = new UserForm(root, user);
//   form.render();

//   const show = new UserShow(root, user);
//   show.render();
// } else {
//   throw new Error('Root element not found');
// }

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
} else {
  throw new Error('Root element not found');
}
