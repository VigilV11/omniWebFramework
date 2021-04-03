import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

import { User } from './models/User';

// const user = User.buildUser({ id: 1, name: 'Yani', age: 23 });

// user.on('save', () => console.log('Saved data'));
// user.save();

///////////

const collection = User.buildUserCollection();

collection.on('change', () => console.log(collection.models));
collection.fetch();
