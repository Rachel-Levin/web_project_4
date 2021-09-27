import { Card } from './Card.js';
import { openModal, closeModal } from "./utils.js";
import { FormValidator } from './FormValidator.js';


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

const userName = document.querySelector(".profile__name");
const userProfession = document.querySelector(".profile__job");
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

addCardButton.addEventListener("click", () => {
  addForm.reset();
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

editButton.addEventListener("click", function () {
  editForm.reset();
  openModal(editModal);
});


editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameValue = inputName.value;
  const professionValue = inputProfession.value;

  userName.textContent = nameValue;
  userProfession.textContent = professionValue;

  closeModal(editModal);
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const card = new Card(inputCardTitle.value, inputCardLink.value, templateCardSelector);
  const cardContent = card.generateCard();
  closeModal(addCardModal);
  gallery.prepend(cardContent);
});

const initialCards = [
  {
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
const templateCardSelector = "#gallery";
const gallery = document.querySelector(".cards");
const renderCard = (data, wrap) => {
  const itemElement = new Card(data['name'], data['link'], templateCardSelector);
  wrap.prepend(itemElement.generateCard());
}

initialCards.forEach((data) => {
  renderCard(data, gallery);
});


