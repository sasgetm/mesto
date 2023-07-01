class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }
  
  getCard() {
    const _cardElement = this._selector.querySelector('.elements__element').cloneNode(true);

    const _elementImage = _cardElement.querySelector('.elements__element-image');
    _elementImage.src = this._link;
    _elementImage.alt = this._name;

    const _elementTitle = _cardElement.querySelector('.elements__element-title');
    _elementTitle.textContent = this._name;

    const _elementLikeButton = _cardElement.querySelector('.elements__element-like');

    _elementLikeButton.addEventListener('click', () => this._switchLike(_elementLikeButton));

    const _elementBasketButton = _cardElement.querySelector('.elements__element-basket');

    _elementBasketButton.addEventListener('click', () => this._removeCard(_elementBasketButton));

    _elementImage.addEventListener('click', () => showImage(this._name, this._link));

    return _cardElement;
  }

  // like/remove place

  _switchLike(likeElem) {
    likeElem.classList.toggle('elements__element-like_active');
  }

  _removeCard(basketElem) {
    const card = basketElem.closest('.elements__element');
    card.remove();
  }
}

export { Card };