import '../pages/index.css';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Card } from "../components/Card.js";
import { Api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, token, baseUrl, profilePopupSelector, profileElementsSelectors, placePopupSelector, imagePopupSelector, deletePopupSelector, avatarPopupSelector, elementsContainerSelector } from '../utils/constants.js';


const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}); 
let profileId;


Promise.all([api.getProfile(), api.getCards()])
.then(([userData, cards]) => {
  createProfile(userData);
  profileId = userData._id
  cardsList.items = cards;
  cardsList.renderItems();
})
.catch(err => {
  console.log(err);
});

// showProfile;

function createProfile(item) {
  profileUserInfo.setUserInfo({name:item.name, role:item.about, avatar:item.avatar});
}


// edit profile

const profileEditButton = document.querySelector('.profile__edit');
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
  sendNewProfileInfo(editedName, editedRole)
}

function sendNewProfileInfo (name, about) {
  profilePopup.switchLoader(true);
  api.editProfile (name, about)
  .then((result) => {
    createProfile(result);
    profilePopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    profilePopup.switchLoader(false);
  });
}


// showCards();

let initialCards = [];

const elementsTemplate = document.querySelector('.elements__template').content;

function renderCard(item, method) {
  function createCard(item) {
    const card = new Card(item, elementsTemplate, profileId, showImage, showDeletePopup, addLikeRequest, removeLikeRequest);
    const elementsElement = card.getCard();
    return elementsElement;
  }
  const cardForAppend = createCard(item);
  cardsList.addItem(cardForAppend, method);
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item, method) => renderCard(item, method),
  },
  elementsContainerSelector
);


// add place

const placeAddButton = document.querySelector('.profile__add-button');

const placePopup = new PopupWithForm(placePopupSelector, handlePlaceForm);

placePopup.setEventListeners();

placeAddButton.addEventListener('click', () => 
placePopup.open());

function handlePlaceForm (inputValues) {
  const placeName = inputValues.place;
  const placeLink = inputValues.link;
  addNewCard (placeName, placeLink)
}

function addNewCard (name, link) {
  placePopup.switchLoader(true);
  api.sendNewCard (name, link)
  .then((result) => {
    cardsList.items = [result];
    cardsList.renderItems('prepend');
    placePopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    placePopup.switchLoader(false);
  });
}


// show image

const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();

function showImage(name, link) {
  imagePopup.open(name, link);
}


// show delete-popup

const deletePopup = new PopupWithConfirmation(deletePopupSelector, deleteCard);

deletePopup.setEventListeners();

function showDeletePopup(card) {
  deletePopup.open(card);
}

function deleteCard(cardObj) {
  deletePopup.switchLoader(true);
  api.deleteCardRequest(cardObj._cardId)
  .then((result) => {
    cardObj.removeCard();
    deletePopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    deletePopup.switchLoader(false);
  });
}


// forms validaton

const enableAllFormsValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(options, formElement);
    formValidator.enableValidation();
  })
};

enableAllFormsValidation(validationConfig);


// add/remove like

function addLikeRequest (card) {
  api.addLike (card._cardId)
  .then((result) => {
    card.actualizeLikes(result);
  })
  .catch((err) => {
    console.log(err);
  });
}
function removeLikeRequest (card) {
  api.removeLike (card._cardId)
  .then((result) => {
    card.actualizeLikes(result);
  })
  .catch((err) => {
    console.log(err);
  });
}


//edit avatar

const editAvatarButton = document.querySelector('.js-profile-avatar');
editAvatarButton.addEventListener('click', showAvatarPopup);
const avatarPopup = new PopupWithForm(avatarPopupSelector, editAvatar);
avatarPopup.setEventListeners();

function showAvatarPopup() {
  avatarPopup.open();
}

function editAvatar(inputValues) {
  avatarPopup.switchLoader(true);
  const avatarLink = inputValues.avatar;
  api.editAvatarRequest(avatarLink)
  .then((result) => {
    createProfile(result);
    avatarPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    avatarPopup.switchLoader(false);
  });
}