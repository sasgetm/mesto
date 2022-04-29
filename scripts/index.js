let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close');
let nameElement = document.querySelector('.profile__name');
let roleElement = document.querySelector('.profile__role');
let nameInput = document.querySelector('.popup__input_type_name');
let roleInput = document.querySelector('.popup__input_type_role');
let formElement = document.querySelector('.popup__form');

function showPopup() {
  let name = nameElement.textContent;
  let role = roleElement.textContent;
  nameInput.value = name;
  roleInput.value = role;
  popup.classList.add('popup_opened');
}

profileEdit.addEventListener('click', showPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupClose.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();

    let editedName = nameInput.value;
    let editedRole = roleInput.value;

    nameElement.textContent = editedName;
    roleElement.textContent = editedRole;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 