export class Card {
  constructor({data, handleCardClick, handleDeleteCard, templateCardSelector, handleLikeIcon}, userId) {
      this._name = data.name;
      this._link = data.link;
      this._handleCardClick = handleCardClick;
      this._handleDeleteCard = handleDeleteCard;
      this._handleLikeIcon = handleLikeIcon;
      this._id = data.id;
      this._userId = userId;
      this._ownerId = data.owner._id;
      this._likes = data.likes;
      console.log(this.data, "data");
      console.log(this._userId, "user123");
      console.log(this._ownerId, "owner")

      this._itemTemplate = document.querySelector(templateCardSelector);
      this._itemElement = this._itemTemplate.content.querySelector('.gallery');
  }

//   _handleLikeIcon(evt) {
//       evt.target.classList.toggle("gallery__like-active");
//   };

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
//   document
//   .querySelector(this._cardSelector)
//   .content
//   .querySelector('.card')
//   .cloneNode(true);

  likeCard(newLikes) {
    this._likes = newLikes;
    this._element.querySelector(".gallery__likes-count").textContent = this._likes.length;
            
    this._element.querySelector(".gallery__like").classList.toggle("gallery__like-active");
  }

  isLiked() {
    return this._likes.some((person) => person._id === this._userId);
}

  generateCard = () => {
      this._element = this._itemElement.cloneNode(true);
    
      const image = this._element.querySelector(".gallery__image");
      const title = this._element.querySelector(".gallery__title");
      image.src = this._link;
      image.alt = `Photo of ${this._name}`;
      title.textContent = this._name;

      if(this._ownerId !== this._userId) {
        this._element.querySelector(".gallery__delete").style.display = 'none';
      }

      this._element.querySelector(".gallery__likes-count").textContent = this._likes.length;
      
    //   const isLiked = this._likes.some((person) => person._id === this._userId);

      if (this.isLiked()) {
        this.likeCard(this._likes)
      }

      this._addEventListeners();
      return this._element;
  }
}