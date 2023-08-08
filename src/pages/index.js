import '../pages/index.css';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// edit profile

const profileElementsSelectors = {
  userNameElementSelector: '.profile__name',
  userRoleElementSelector: '.profile__role'
};
const profileEditButton = document.querySelector('.profile__edit');
const profilePopupSelector = '.js-profile-popup';
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileRoleInput = document.querySelector('.popup__input_type_role');

const profilePopup = new PopupWithForm(profilePopupSelector, handleProfileForm);

const profileUserInfo = new UserInfo(profileElementsSelectors);

profilePopup.setEventListeners();

function showProfilePopup() {
  const profileInfo = profileUserInfo.getUserInfo();
  profileNameInput.value = profileInfo.name;
  profileRoleInput.value = profileInfo.role;
  profilePopup.open();
}

profileEditButton.addEventListener('click', showProfilePopup);

function handleProfileForm (evt, inputValues) {
  evt.preventDefault();

  const editedName = inputValues.name;
  const editedRole = inputValues.role;

  profileUserInfo.setUserInfo({name:editedName, role:editedRole});
  profilePopup.close();
}


// render places

import { Card } from '../components/Card.js';

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

// showCards();

const elementsTemplate = document.querySelector('.elements__template').content;
const elementsContainer = document.querySelector('.elements');

function renderCard(item) {
  function createCard(item) {
    const card = new Card(item, elementsTemplate, showImage);
    const elementsElement = card.getCard();
    return elementsElement;
  }
  const cardForAppend = createCard(item);
  cardsList.addItem(cardForAppend);
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => renderCard(item),
  },
  elementsContainer
);

cardsList.renderItems();

// add place

const placeAddButton = document.querySelector('.profile__add-button');
const placePopupSelector = '.js-place-popup';

const placePopup = new PopupWithForm(placePopupSelector, handlePlaceForm);

placePopup.setEventListeners();

placeAddButton.addEventListener('click', () => 
placePopup.open());

function handlePlaceForm (evt, inputValues) {
  evt.preventDefault(evt);

  const placeName = inputValues.place;
  const placeLink = inputValues.link;

  const newPlace = [{name:placeName, link:placeLink}];

  const newCard = new Section(
    {
      items: newPlace,
      renderer: (item) => renderCard(item),
    },
    elementsContainer
  );

  placePopup._getInputValues ();
  
  newCard.renderItems();
  placePopup.close();
}


// show image

const imagePopupSelector = '.image-popup';

const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();

function showImage(name, link) {
  imagePopup.open(name, link);
}


// forms validaton

import { FormValidator } from '../components/FormValidator.js';

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