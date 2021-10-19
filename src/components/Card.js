export class Card {
  constructor({name, link, templateCardSelector, handleCardClick, handleDeleteCard, id, owner}, userId) {
      this._name = name;
      this._link = link;
      this._handleCardClick = handleCardClick;
      this._handleDeleteCard = handleDeleteCard;
      this._id = id;
      this._userId = userId;
      this._ownerId = owner._id;
      console.log(this._userId)

      this._itemTemplate = document.querySelector(templateCardSelector);
  }

  _handleLikeIcon(evt) {
      evt.target.classList.toggle("gallery__like-active");
  };

  removeCard () {
    //   evt.target.closest(".gallery").remove();
      //this._element is not accessible here, because it's a context of a clickListener
      this._element.remove();
      this._element = null;
  }

  _addEventListeners() {
      const deleteCard = this._element.querySelector(".gallery__delete");
      const likeCard = this._element.querySelector(".gallery__like");
      const image = this._element.querySelector(".gallery__image");

      likeCard.addEventListener("click", this._handleLikeIcon);
      deleteCard.addEventListener("click", this._handleDeleteCard);
      image.addEventListener("click", this._handleCardClick);
  }

  generateCard = () => {


      this._itemElement = this._itemTemplate.cloneNode(true);
      this._element = this._itemElement.content;
    
      const image = this._element.querySelector(".gallery__image");
      const title = this._element.querySelector(".gallery__title");
      image.src = this._link;
      image.alt = `Photo of ${this._name}`;
      title.textContent = this._name;

      if(this._ownerId !== this._userId) {
        this._element.querySelector(".gallery__delete").style.display = 'none';
      }

      this._addEventListeners();
      return this._element;
  }
}