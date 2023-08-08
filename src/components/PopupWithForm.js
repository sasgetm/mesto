import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor (slelctor, submitFormCallback) {
    super(slelctor);
    this._submitFormCallback = submitFormCallback;
    this._form = this._element.querySelector('form');
  }

  _getInputValues () {
    const formElements = this._form.querySelectorAll('input');
    const formData = {};
    formElements.forEach(function(element) {
        formData[element.name] = element.value;
    })
    return formData;
  }

  setEventListeners () {
    
    this._element.addEventListener('submit', (evt) => {
      this._submitFormCallback(evt, this._getInputValues ())
    });
    super.setEventListeners ();
  }

  close () {
    this._form.reset();
    super.close();
  }

}

export { PopupWithForm };