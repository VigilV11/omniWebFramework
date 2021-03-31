import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';

import { User } from './models/User';

const user = new User({ id: 2 });

console.log(user.get('id'));
user.fetch();
// console.log(user.get('name'));

// user.set({ name: 'Alice' });
// console.log(user.get('name'));

// import axios from 'axios';

// axios.post('http://localhost:3000/users', {
//   name: 'Vigil',
//   age: 33,
// });

// console.log('vigil');
