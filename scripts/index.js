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
  document.addEventListener('keyup', (evt) => escapeListener(evt, popup))
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
const popupContainers = document.querySelectorAll('.popup__container');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', (evt) => escapeListener(evt, popup));
}

for (const popupCloseElement of popupCloseElements) {
  const popup = popupCloseElement.closest('.popup');
  popupCloseElement.addEventListener('click', () => closePopup(popup));
}

for (const popup of popups) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
       closePopup(popup)
    }
  })
};

const escapeListener = (evt, popup) => {
  if (evt.key === 'Escape') closePopup(popup);
};


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

  elementImage.addEventListener('click', () => showImage(name, link));

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

  evt.target.reset();
  prependElement(placeName, placeLink);
  closePopup(placePopup);
}

placeForm.addEventListener('submit', handlePlaceForm);


// like/remove place

function switchLike(likeElem) {
  likeElem.classList.toggle('elements__element-like_active');
}

function removeCard(basketElem) {
  const card = basketElem.closest('.elements__element');
  card.remove();
}


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