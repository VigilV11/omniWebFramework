import { AxiosResponse } from 'axios';
import { Attribures } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  attributes: Attribures<UserProps>;
  events: Eventing = new Eventing();
  sync: Sync<UserProps> = new Sync();

  constructor(private userData: UserProps) {
    this.attributes = new Attribures<UserProps>(userData);
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(id: number) {
    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data);
    });
  }

  save() {
    this.sync
      .save(this.attributes.getAll())
      .then(() => {
        this.events.trigger('save');
      })
      .catch(() => {
        this.events.trigger('error');
      });
  }
}
