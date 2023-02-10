// edit profile

const profileNameElement = document.querySelector('.profile__name');
const profileRoleElement = document.querySelector('.profile__role');
const profileEditButton = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.js-profile-popup');
const profileForm = document.forms['profile-form'];
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileRoleInput = document.querySelector('.popup__input_type_role');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEscapeListener ();
}

function showProfilePopup() {
  const name = profileNameElement.textContent;
  const role = profileRoleElement.textContent;
  profileNameInput.value = name;
  profileRoleInput.value = role;
  openPopup(profilePopup);
}

profileEditButton.addEventListener('click', showProfilePopup);

function handleProfileForm (evt) {
  evt.preventDefault();
  const editedName = profileNameInput.value;
  const editedRole = profileRoleInput.value;
  profileNameElement.textContent = editedName;
  profileRoleElement.textContent = editedRole;
  closePopup();
}

profileForm.addEventListener('submit', handleProfileForm);


// close popup

const popups = document.querySelectorAll('.popup');
const popupCloseElements = document.querySelectorAll('.popup__close');
const popupContainers = document.querySelectorAll('.popup__container');

function closePopup() {
  for (const popup of popups) {
    popup.classList.remove('popup_opened');
  }
  removeEscapeListener ();
}

for (const popupCloseElement of popupCloseElements) {
  popupCloseElement.addEventListener('click', closePopup);
}

for (const popup of popups) {
  popup.addEventListener('click', closePopup);
}

for (const popupContainer of popupContainers) {
  popupContainer.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
}

const escapeListener = function (evt) {
  console.log(evt.key);
  if (evt.key === 'Escape') closePopup();
};

function addEscapeListener () {
  document.addEventListener('keyup', escapeListener)
}

function removeEscapeListener () {
  document.removeEventListener('keyup', escapeListener)
}


// render places

const initialCards = [
  {
    name: 'Карачаевск',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements__template').content;

function getCard(name, link) {
  const cardElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);

  const elementImage = cardElement.querySelector('.elements__element-image');
  elementImage.src = link;
  elementImage.alt = name;

  const elementTitle = cardElement.querySelector('.elements__element-title');
  elementTitle.textContent = name;

  const elementLikeButton = cardElement.querySelector('.elements__element-like');

  elementLikeButton.addEventListener('click', () => switchLike(elementLikeButton));

  const elementBasketButton = cardElement.querySelector('.elements__element-basket');

  elementBasketButton.addEventListener('click', () => removeCard(elementBasketButton));

  elementImage.addEventListener('click', () => showImage(elementImage));

  return cardElement;
}

function appendCard(name, link) {
  const elementsElement = getCard(name, link);
  elementsContainer.append(elementsElement);
}

function prependElement(name, link) {
  const elementsElement = getCard(name, link);
  elementsContainer.prepend(elementsElement);
}

function showCards () {
  initialCards.forEach(function (item) {
    appendCard(item.name, item.link);
  });
}

showCards();


// add place

const placeAddButton = document.querySelector('.profile__add-button');
const placePopup = document.querySelector('.js-place-popup');
const placeForm = document.forms['place-form'];
const placeNameInput = document.querySelector('.popup__input_place_name');
const placeLinkInput = document.querySelector('.popup__input_place_link');

placeAddButton.addEventListener('click', () => openPopup(placePopup));

function handlePlaceForm (evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;

  if (placeName && placeLink) {
    evt.target.reset();
    prependElement(placeName, placeLink);
    closePopup();
  }
}

placeForm.addEventListener('submit', handlePlaceForm);


// like/remove place

function findClickedCard(clickedElement) {
  const element = clickedElement.closest('.elements__element');
  return element;
}

function switchLike(likeElem) {
  likeElem.classList.toggle('elements__element-like_active');
}

function removeCard(basketElem) {
  const card = findClickedCard(basketElem);
  elementsContainer.removeChild(card);
}


// show image

const imagePopup = document.querySelector('.image-popup');
const imagePopupImg = document.querySelector('.image-popup__image');
const imagePopupTitle = document.querySelector('.image-popup__title')

function showImage(imageElement) {
  const imgSrc = imageElement.src;
  const imgName = imageElement.alt;

  imagePopupImg.src = imgSrc;
  imagePopupImg.alt = imgName;
  imagePopupTitle.textContent = imgName;

  openPopup(imagePopup);
}