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
  document.addEventListener('keyup', closeByEsc);
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
  closePopup(profilePopup);
}

profileForm.addEventListener('submit', handleProfileForm);


// close popup

const popups = document.querySelectorAll('.popup');
const popupCloseElements = document.querySelectorAll('.popup__close');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEsc);
}

for (const popupCloseElement of popupCloseElements) {
  const popup = popupCloseElement.closest('.popup');
  popupCloseElement.addEventListener('click', () => closePopup(popup));
}

for (const popup of popups) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
       closePopup(popup);
    }
  })
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}


// render places

import { Card } from './Card.js';

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

const elementsTemplate = document.querySelector('.elements__template').content;
const elementsContainer = document.querySelector('.elements');

function createCard(item) {
  const card = new Card(item, elementsTemplate, showImage);
  const elementsElement = card.getCard();
  return elementsElement;
}

function appendCard(item) {
  const cardForAppend = createCard(item);
  elementsContainer.append(cardForAppend);
}

function prependElement(item) {
  const cardForPrepend = createCard(item);
  elementsContainer.prepend(cardForPrepend);
}

function showCards () {
  initialCards.forEach(function (item) {
    appendCard(item);
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

  evt.target.reset();
  prependElement({name:placeName, link:placeLink});
  closePopup(placePopup);
}

placeForm.addEventListener('submit', handlePlaceForm);


// show image

const imagePopup = document.querySelector('.image-popup');
const imagePopupImg = document.querySelector('.image-popup__image');
const imagePopupTitle = document.querySelector('.image-popup__title')

function showImage(name, link) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupTitle.textContent = name;

  openPopup(imagePopup);
}


// forms validaton

import { FormValidator } from './FormValidator.js';

const enableAllFormsValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(options, formElement);
    formValidator.enableValidation();
  })
};

enableAllFormsValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});