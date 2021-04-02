import { AxiosPromise, AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

type Callback = () => void;

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>();
  public attributes: Attributes<UserProps>;

  constructor(private attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get get() {
    return this.attributes.get;
  }

  // We are returning a reference to the "on" method in "events"
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (id) {
      this.sync.fetch(id).then((response: AxiosResponse) => {
        this.set(response.data);
      });
    } else {
      throw new Error('Cannot fetch without an id');
    }
  }

  save() {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse) => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
