import '../pages/index.css';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Card } from '../components/Card.js';
import { initialCards, validationConfig } from '../utils/constants.js';

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

function handleProfileForm (inputValues) {
  const editedName = inputValues.name;
  const editedRole = inputValues.role;

  profileUserInfo.setUserInfo({name:editedName, role:editedRole});
  profilePopup.close();
}

// showCards();

const elementsTemplate = document.querySelector('.elements__template').content;
const elementsContainerSelector = '.elements';

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
  elementsContainerSelector
);

cardsList.renderItems();

// add place

const placeAddButton = document.querySelector('.profile__add-button');
const placePopupSelector = '.js-place-popup';

const placePopup = new PopupWithForm(placePopupSelector, handlePlaceForm);

placePopup.setEventListeners();

placeAddButton.addEventListener('click', () => 
placePopup.open());

function handlePlaceForm (inputValues) {
  const placeName = inputValues.place;
  const placeLink = inputValues.link;

  const newPlace = [{name:placeName, link:placeLink}];

  cardsList.items = newPlace;
  
  cardsList.renderItems();
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

enableAllFormsValidation(validationConfig);