import { openModal, imageOpen } from "./utils.js";
export const imageActive = imageOpen.querySelector(".modal__image-active");
export const titleImageActive = imageOpen.querySelector(".modal__title-active");


export class Card {
  constructor(name, link, templateCardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = templateCardSelector;

    this._itemTemplate = document.querySelector(templateCardSelector);
    // .content.querySelector(".gallery");
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle("gallery__like-active");
  };

  _handleDeleteCard() {
    this.closest(".gallery").remove();
  }

  _handlePreviewPicture = () => {
    openModal(imageOpen);
    imageActive.src = this._link;
    titleImageActive.textContent = this._name;
  };

  _addEventListeners() {
    const deleteCard = this._itemElement.content.querySelector(".gallery__delete");
    const likeCard = this._itemElement.content.querySelector(".gallery__like");
    const image = this._itemElement.content.querySelector(".gallery__image");

    likeCard.addEventListener("click", this._handleLikeIcon);
    deleteCard.addEventListener("click", this._handleDeleteCard);
    image.addEventListener("click", this._handlePreviewPicture);
  }

  generateCard = () => {
    this._itemElement = this._itemTemplate.cloneNode(true);

    const image = this._itemElement.content.querySelector(".gallery__image");
    const title = this._itemElement.content.querySelector(".gallery__title");
    image.src = this._link;
    title.textContent = this._name;

    this._addEventListeners();
    return this._itemElement.content;
  }
}

// function generateCard(cardDate) {
//   const itemElement = itemTemplate.querySelector(".gallery").cloneNode(true);
//   const gallery = document.querySelector(".cards");
//   const deleteCard = itemElement.querySelector(".gallery__delete");
//   const likeCard = itemElement.querySelector(".gallery__like");
//   const image = itemElement.querySelector(".gallery__image");
//   const title = itemElement.querySelector(".gallery__title");

//   image.src = cardDate.link;
//   title.textContent = cardDate.name;

//   image.addEventListener("click", () => {
//     openModal(imageOpen);
//     imageActive.src = cardDate.link;
//     titleImageActive.textContent = cardDate.name;
//   });

//   likeCard.addEventListener("click", () => {
//     likeCard.classList.toggle("gallery__like-active");
//   });

//   deleteCard.addEventListener("click", () => {
//     itemElement.remove();
//   });

//   gallery.prepend(itemElement);
// }
