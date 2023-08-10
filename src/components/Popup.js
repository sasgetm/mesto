class Popup {
  constructor (selector) {
    this._element = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open () {
    this._element.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close () {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
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