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
//forms
const templateCardSelector = "#gallery";
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
export { 
    settings, 
    addCard, 
    editModal, 
    openedImage, 
    imageActive, 
    titleImageActive,
    addCardModal, 
    editModalCloseButton,
    addCardModalCloseButton, 
    editButton, 
    addCardButton, 
    inputName, 
    inputProfession, 
    templateCardSelector, 
    initialCards
}