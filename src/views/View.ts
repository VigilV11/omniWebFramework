export abstract class View {
  abstract parent: Element;
  abstract template(): string;

  mapHandlers(): { [key: string]: () => void } {
    return {};
  }

  bindHandlers() {
    const allHandlers = this.mapHandlers();
    Object.entries(allHandlers).forEach((handler) => {
      const [event, className] = handler[0].split(':');

      Array.from(document.querySelectorAll(className), (selection: Element) => {
        selection.addEventListener(event, handler[1]);
      });
    });
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('afterbegin', this.template());
    this.bindHandlers();
  }
}
