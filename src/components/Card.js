class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._cardElement = this._selector.querySelector('.elements__element').cloneNode(true);
    this._elementImage = this._cardElement.querySelector('.elements__element-image');
    this._elementTitle = this._cardElement.querySelector('.elements__element-title');
    this._elementLikeButton = this._cardElement.querySelector('.elements__element-like');
    this._elementBasketButton = this._cardElement.querySelector('.elements__element-basket');
    this._handleCardClick = handleCardClick;
  }
  
  getCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikeButton.addEventListener('click', () => this._switchLike());
    this._elementBasketButton.addEventListener('click', () => this._removeCard());
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    return this._cardElement;
  }

  // like/remove place

  _switchLike() {
    this._elementLikeButton.classList.toggle('elements__element-like_active');
  }

  _removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}

export { Card };