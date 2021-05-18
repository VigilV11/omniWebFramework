import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

// K specifies the structure of the JSON data that we get back
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  // deserialize is a function that takes each json data of type K and turns it into type T
  constructor(public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get('/users').then((response: AxiosResponse) => {
      // this.models = response.data.map((user: K) => User.buildUser(user));
      this.models = response.data.map(this.deserialize);
      this.trigger('change');
    });
  }
}
