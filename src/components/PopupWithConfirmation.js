import { Popup } from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor (slelctor, confirmationButtonCallback) {
    super(slelctor);
    this._confirmationButtonCallback = confirmationButtonCallback;
    this._confirmationButton = this._element.querySelector('.js-delete-button');
    this._cardObj = {};
    this._confirmationButtonText = this._confirmationButton.textContent;
  }

  setEventListeners () {
    this._confirmationButton.addEventListener('click', (evt) => {
      this._confirmationButtonCallback(this._cardObj);
    });
    super.setEventListeners ();
  }

  open (card) {
    this._cardObj = card;
    super.open();
  }

  switchLoader (isLoading) {
    if (isLoading) {
      this._confirmationButton.textContent = 'Сохранение...';
    } else {
      this._confirmationButton.textContent = this._confirmationButtonText;
    }
  }
}

export { PopupWithConfirmation };