class Section {
  constructor ({items, renderer}, containerSelector) {
    this.items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems (method) {
    this.items.forEach(item => {
      this._renderer(item, method);
    });
  }

  addItem (element, method) {
    if(method == 'prepend') {
      this._containerElement.prepend(element);
    } else {
      this._containerElement.append(element);
    }
  }
}

export { Section };