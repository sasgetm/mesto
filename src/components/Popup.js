class Popup {
  constructor (selector) {
    this._selector = selector;
    this._element = document.querySelector(this._selector);
  }

  open () {
    this._element.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose.bind(this));
  }

  close () {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners () {
    const popupCloseElement = this._element.querySelector('.popup__close');
    popupCloseElement.addEventListener('click', () => this.close());

    this._element.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    })
  }

}

export { Popup };