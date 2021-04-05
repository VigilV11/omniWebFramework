import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel() {
    this.model.on('change', () => {
      this.reRender();
    });
  }

  bindEvents(): void {
    const allEvents = this.eventsMap();
    // Convert the objects in allEvents into an array of arrays of key-value pairs
    Object.entries(allEvents).forEach((eventComposite) => {
      // split the 'click:button' syntax
      const [event, element] = eventComposite[0].split(':');

      // get a list of all "element"s
      document.querySelectorAll(element).forEach((ele) => {
        // attach event listner to the event with the call back function
        ele.addEventListener(event, eventComposite[1]);
      });
    });
  }

  mapRegions(): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];

      this.regions[key] = this.parent.querySelector(selector);
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';

    this.parent.insertAdjacentHTML('afterbegin', this.template());
    this.bindEvents();
    this.mapRegions();

    this.onRender();
  }

  reRender(): void {
    this.parent.innerHTML = '';

    this.parent.insertAdjacentHTML('afterbegin', this.template());
    this.mapRegions();
    this.onRender();
  }
}
