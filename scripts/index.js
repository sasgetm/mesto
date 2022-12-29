// edit profile

let nameElement = document.querySelector('.profile__name');
let roleElement = document.querySelector('.profile__role');
let profileEdit = document.querySelector('.profile__edit');
let profilePopup = document.querySelector('.js-profile-popup');
let profileForm = document.querySelector('.js-profile-form');
let nameInput = document.querySelector('.popup__input_type_name');
let roleInput = document.querySelector('.popup__input_type_role');

function showProfilePopup() {
  let name = nameElement.textContent;
  let role = roleElement.textContent;
  nameInput.value = name;
  roleInput.value = role;
  profilePopup.classList.add('popup_opened');
}

profileEdit.addEventListener('click', showProfilePopup);

function submitHandlerForm (evt) {
  evt.preventDefault();
  let editedName = nameInput.value;
  let editedRole = roleInput.value;
  nameElement.textContent = editedName;
  roleElement.textContent = editedRole;
  closePopup();
}

profileForm.addEventListener('submit', submitHandlerForm);


// close popup

let popup = document.querySelectorAll('.popup');
let popupClose = document.querySelectorAll('.popup__close');

function closePopup() {
  for (let popupElem of popup) {
    popupElem.classList.remove('popup_opened');
  }
}

for (let closeElem of popupClose) {
  closeElem.addEventListener('click', closePopup);
}


// render places

let initialCards = [
  {
    name: 'Карачаевск',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    liked: false,
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    liked: false,
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    liked: false,
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    liked: false,
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    liked: false,
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    liked: false,
  }
];

let elements = document.querySelector('.elements');
let elementsTemplate = document.querySelector('.elements__template').content;

function createElement(name, link, liked) {
  let elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
  elementsElement.querySelectorAll('.js-element-image').forEach((item) => item.src = link);
  elementsElement.querySelectorAll('.js-element-image').forEach((item) => item.alt = name);
  elementsElement.querySelectorAll('.js-element-title').forEach((item) => item.textContent = name);
  elements.append(elementsElement);
  if (liked) elementsElement.querySelector('.elements__element-like').classList.add('elements__element-like_active');
}

function showCards () {
  while (elements.firstChild) {
    elements.removeChild(elements.firstChild);
  }
  initialCards.forEach(function (item) {
    createElement(item.name, item.link, item.liked);
  });
}

showCards();


// add place

let placeAdd = document.querySelector('.profile__add-button');
let placePopup = document.querySelector('.js-place-popup');
let placeForm = document.querySelector('.js-place-form');
let placeNameInput = document.querySelector('.popup__input_place_name');
let placeLinkInput = document.querySelector('.popup__input_place_link');

function showPlacePopup() {
  placePopup.classList.add('popup_opened');
}

placeAdd.addEventListener('click', showPlacePopup);

function submitPlaceForm (evt) {
  evt.preventDefault();

  let placeName = placeNameInput.value;
  let placeLink = placeLinkInput.value;

  if (placeName && placeLink) {
    placeNameInput.value = '';
    placeLinkInput.value = '';

    initialCards.unshift({name: placeName, link: placeLink});

    showCards();
    closePopup();
  }
}

placeForm.addEventListener('submit', submitPlaceForm);


// like/remove place, show image

function findClickedElement(clickedElement) {
  let element = clickedElement.closest('.elements__element');
  return element;
}

function findIndexOfClicked(clickedElement) {
  let element = findClickedElement(clickedElement);
  let name = element.querySelector('.js-element-title').textContent;
  let index = initialCards.findIndex(n => n.name === name);
  return index;
}

function switchLike(likeElem) {
  let index = findIndexOfClicked(likeElem);

  let liked = initialCards[index].liked;
  initialCards[index].liked = !liked;

  showCards();
}

function removeElement(basketElem) {
  let index = findIndexOfClicked(basketElem);
  initialCards.splice(index, 1);

  showCards();
}

function showImage(imageElement) {
  let element = findClickedElement(imageElement);
  let imagePopup = element.querySelector('.js-image-popup');
  imagePopup.classList.add('popup_opened');
}

function closeImage(popupClose) {
  let element = findClickedElement(popupClose);
  let imagePopup = element.querySelector('.js-image-popup');
  imagePopup.classList.remove('popup_opened');
}

function findClicked(clickedElement) {
  if (clickedElement.classList.contains('elements__element-like')) {
    switchLike(clickedElement);
  }
  if (clickedElement.classList.contains('elements__element-basket')) {
    removeElement(clickedElement);
  }
  if (clickedElement.classList.contains('elements__element-image')) {
    showImage(clickedElement);
  }
  if (clickedElement.classList.contains('popup__close')) {
    closeImage(clickedElement);
  }
}

elements.addEventListener('click', (el) => findClicked(el.target));