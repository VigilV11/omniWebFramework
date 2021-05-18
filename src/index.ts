import { User } from './models/User';
import { UserForm } from './views/UserForm';

const user = User.buildUser({ id: 1, name: 'Dino', age: 33 });
const root = document.querySelector('.app-root');

if (root) {
  const userForm = new UserForm(user, root);
  userForm.render();
}

user.on('change', () => console.log(user.get('age')));
