class Card {
  constructor(data, selector, profileId, handleCardClick, handleDeleteClick, handleAddLike, handleRemoveLike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._selector = selector;
    this._ownerId = data.owner._id;
    this._profileId = profileId;
    this._cardId = data._id;

    this._cardElement = this._selector.querySelector('.elements__element').cloneNode(true);
    this._elementImage = this._cardElement.querySelector('.elements__element-image');
    this._elementTitle = this._cardElement.querySelector('.elements__element-title');
    this._elementLikeButton = this._cardElement.querySelector('.elements__element-like');
    this._elementLikeValue = this._cardElement.querySelector('.elements__element-like-value');
    this._elementBasketButton = this._cardElement.querySelector('.elements__element-basket');

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => this._switchLike());
    this._elementBasketButton.addEventListener('click', () => this._handleDeleteClick(this));
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
  
  getCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikeValue.textContent = this._likes.length;

    if(this._checkProfileLike()) this._elementLikeButton.classList.add('elements__element-like_active');    
    if(this._ownerId == this._profileId) this._elementBasketButton.classList.add('elements__element-basket_active');
    this._setEventListeners();
    return this._cardElement;
  }

  // like/remove place
  _switchLike() {
    if(this._checkProfileLike()) {
      this._removeLike();
      return;
    }
    this._addLike();
  }

  _checkProfileLike() {
    if(this._likes) {
      for (let key in this._likes) {
        var propertyValue = this._likes[key]._id;
        if (propertyValue === this._profileId) {
            return true;
        } 
      }
    }
    return false;
  }

  _addLike() {
    this._handleAddLike(this);
  }
  _removeLike() {
    this._handleRemoveLike(this);
  }

  actualizeLikes(responsedData) {
    this._likes = responsedData.likes;
    this._elementLikeValue.textContent = this._likes.length;
    if(this._checkProfileLike()) {
      this._elementLikeButton.classList.add('elements__element-like_active');
      return;
    }
    this._elementLikeButton.classList.remove('elements__element-like_active');
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
    this._elementImage = null;
    this._elementTitle = null;
    this._elementLikeButton = null;
    this._elementBasketButton = null;
  }
}

export { Card };