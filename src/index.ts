import { User } from './models/User';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

////////////////////////////////

const user = new User({ id: 2, name: 'VAered', age: 33 });

console.log(user.get('name'));

user.on('save', () => console.log('Saved'));
// user.trigger('change');

user.save();
