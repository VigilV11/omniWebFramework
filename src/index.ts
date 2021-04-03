import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

////////////////////////

import { User } from './models/User';

const user = User.buildUser({ id: 1, name: 'Vigil', age: 25 });

console.log(user.get('name'));

// user.on('change', () => console.log('Changed'));
// user.set({ id: 1, name: 'baha', age: 21 });

user.on('saved', () => console.log('Data saved'));
user.on('ready', () => user.fetch(1));
