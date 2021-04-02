import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

import { User } from './models/User';

const user = new User({ id: 1, name: 'Brand new user', age: 0 });

// console.log(user.get('id'));

user.on('save', () => {
  console.log(user.get('name'));
});

// user.set({ name: 'Vigil V' });
// console.log(user.get('name'));

user.save();
// console.log(user.get('name'));
