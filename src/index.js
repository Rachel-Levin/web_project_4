import "./pages/index.css";

import {
  Card
} from './Card.js';
// import { openedImage } from "./utils.js";
import {
  FormValidator
} from './FormValidator.js';
import {
  PopupWithImage
} from './PopupWithImage.js';
import {
  PopupWithForm
} from './PopupWithForm.js';
import Section from './Section.js';
import {
  UserInfo
} from './UserInfo.js';
// import { api, Api } from './Api.js'

// const
const settings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_theme_error",
  errorClass: "form__input-error"
}

const addCard = document.querySelector(".modal-add-card");
const editModal = document.querySelector(".modal-edit");
const addCardFormValidator = new FormValidator(settings, addCard);
const editModalFormValidator = new FormValidator(settings, editModal);

addCardFormValidator.enableValidation();
editModalFormValidator.enableValidation();

const openedImage = document.querySelector(".modal-full-screen");
const imageActive = openedImage.querySelector(".modal__image-active");
const titleImageActive = openedImage.querySelector(".modal__title-active");
//modals
const addCardModal = document.querySelector(".modal-add-card");
//closeButtons
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const addCardModalCloseButton = addCardModal.querySelector(
  ".modal__close-button"
);
//buttons
const editButton = document.querySelector(".profile__edit");
const addCardButton = document.querySelector(".profile__add");
//inputs
const inputName = editModal.querySelector(".form__input-name");
const inputProfession = editModal.querySelector(".form__input-profession");
const inputCardTitle = addCardModal.querySelector(".form__input-card-title");
const inputCardLink = addCardModal.querySelector(".form__input-card-link");
//forms
const editForm = editModal.querySelector(".form");
const addForm = addCardModal.querySelector(".form");

const imageModal = new PopupWithImage(".modal-full-screen");
imageModal.setEventListeners();
const templateCardSelector = "#gallery";

function createCard(data) {
  const currentCard = new Card(data['name'], data['link'], templateCardSelector,
    () => {
      handleCardClick(data)
    }
  );
  const itemElement = currentCard.generateCard();
  console.log(itemElement);
  return itemElement;
}


const addCardForm = new PopupWithForm(".modal-add-card",
  (inputValues) => {
    const cardContent = createCard({
      name: inputValues['card-title'],
      link: inputValues['card-link'],
    });
    cardsSection.addItem(cardContent);
    addCardForm.closeModal();
  }
);
addCardForm.setEventListeners();

const editProfileForm = new PopupWithForm(".modal-edit",
  (inputValues) => {
    userProfile.setUserInfo(inputValues);
    editProfileForm.closeModal();
  }
);
editProfileForm.setEventListeners();

const userProfile = new UserInfo(".profile__name", ".profile__job");

addCardButton.addEventListener("click", () => {
  addForm.reset();
  addCardFormValidator.resetValidation();
  addCardForm.openModal();
});

addCardModalCloseButton.addEventListener("click", () => {
  addCardForm.closeModal();
});

editButton.addEventListener("click", function () {
  editForm.reset();
  editModalFormValidator.resetValidation();
  let userProfileData = userProfile.getUserInfo();
  inputName.value = userProfileData.name;
  inputProfession.value = userProfileData.job;
  editProfileForm.openModal();
});


editModalCloseButton.addEventListener("click", () => {
  editProfileForm.closeModal();
});


const initialCards = [{
  name: "Yosemite Valley",
  link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
},
{
  name: "Lake Louise",
  link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
},
{
  name: "Bald Mountains",
  link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
},
{
  name: "Latemar",
  link: "https://code.s3.yandex.net/web-code/latemar.jpg",
},
{
  name: "Vanoise National Park",
  link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
},
{
  name: "Lago di Braies",
  link: "https://code.s3.yandex.net/web-code/lago.jpg",
},
];

const handleCardClick = (data) => {
  imageModal.openModal();
  imageActive.src = data.link;
  titleImageActive.textContent = data.name;
  imageActive.alt = `Photo of ${data.name}`;
};


const cardsSection = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = createCard(data);
    cardsSection.addItem(card);
  },
}, ".cards");

cardsSection.rendererItems();

function loadImage(imageUrl) {
  return new Promise((resolve, reject) => {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.onerror = reject;
  image.onload = resolve;
  });
}

// api.getInitialCards() 
//   .then(res => {
//     console.log('res', res)
//   })