import { AxiosPromise, AxiosResponse } from 'axios';
import { Collection } from './Collection';

interface ModelAttributes<T> {
  get<K extends keyof T>(propName: K): T[K];
  getAll(): T;
  set(update: T): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T, allValidIds: number[]): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  //   attributes: ModelAttributes<T>;
  //   sync: Sync<T>;
  //   events: Events;
  allValidIds: number[] = [];

  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {
    const collection = new Collection();
    collection.fetchAllIds().then((response: AxiosResponse) => {
      this.allValidIds = response.data.map((item: T) => item.id);
      this.trigger('ready');
    });
  }

  get get() {
    return this.attributes.get.bind(this.attributes);
  }

  get trigger() {
    return this.events.trigger.bind(this.events);
  }

  get on() {
    return this.events.on.bind(this.events);
  }

  set(update: T): void {
    this.attributes.set(update);
    this.trigger('change');
  }

  fetch(id: number): void {
    if (!this.allValidIds.includes(id)) {
      throw new Error('The id does not exist');
    }

    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.attributes.set(response.data);
      this.trigger('update');
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll(), this.allValidIds)
      .then((): void => this.events.trigger('saved'))
      .catch((): void => this.events.trigger('error'));
  }
}
