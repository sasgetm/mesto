class Section {
  constructor ({items, renderer}, containerSelector) {
    this.items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems () {
    this.items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem (element) {
    this._containerElement.prepend(element);
  }
}

export { Section };