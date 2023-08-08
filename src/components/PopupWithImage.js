import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor (slelctor) {
    super(slelctor);
    this._imagePopupImg = this._element.querySelector('.image-popup__image');
    this._imagePopupTitle = this._element.querySelector('.image-popup__title')
  }

  open (name, link) {
    this._imagePopupImg.src = link;
    this._imagePopupImg.alt = name;
    this._imagePopupTitle.textContent = name;
    super.open();
  }
}

export { PopupWithImage };