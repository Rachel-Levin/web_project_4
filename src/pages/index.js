import "./index.css";

import {
  Card
} from '../components/Card.js';
import {
  FormValidator
} from '../components/FormValidator.js';
import {
  PopupWithImage
} from '../components/PopupWithImage.js';
import {
  PopupWithForm
} from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import {
  UserInfo
} from '../components/UserInfo.js';
import * as constant from '../components/constant.js';
import { api } from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit';

const addCardFormValidator = new FormValidator(constant.settings, constant.addCard);
const editModalFormValidator = new FormValidator(constant.settings, constant.editModal);
const editAvatarFormValidator = new FormValidator(constant.settings, constant.editAvatar);

addCardFormValidator.enableValidation();
editModalFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

const imageModal = new PopupWithImage(".modal-full-screen");
imageModal.setEventListeners();
const confirmModal = new PopupWithSubmit(".modal-delete-card");

confirmModal.setEventListeners();

function createCard(data) {
  const currentCard = new Card({
    data: data,
    handleCardClick: () => handleCardClick(data),
    handleDeleteCard:  () => {
      confirmModal.openModal();
      confirmModal.setAction(() => {
        api.deleteCard(data['_id'])
          .then (res => {
            currentCard.removeCard();
            confirmModal.closeModal();
          });
        });
      },
      handleLikeIcon:() => {

        const isAlreadyLiked = currentCard.isLiked();
        if (isAlreadyLiked) {
          api.deleteLike(data['_id'])
          .then(res => {
            currentCard.likeCard(res.likes);
          })
        } else {
          api.likeCard(data['_id'])
          .then(res => {
            currentCard.likeCard(res.likes);
          });
        }
      },
  templateCardSelector: constant.templateCardSelector, 
  } , userId
);
    
  const itemElement = currentCard.generateCard();
  return itemElement;
}

const editAvatarForm = new PopupWithForm (".modal-avatar-edit", (inputValues) => {
  api.setUserAvatar({avatar: inputValues['card-link']})
  .then(
    userProfile.setUserAvatar({link: inputValues['card-link']}),
    editAvatarForm.closeModal())
})

  editAvatarForm.setEventListeners()

const addCardForm = new PopupWithForm(".modal-add-card",
  (inputValues) => {
    renderLoading(true);
    api.createCard({
      name: inputValues['card-title'],
      link: inputValues['card-link'],
    })
    .then(res => {
      const cardContent = createCard(res);
      cardsSection.addItem(cardContent);
      
    })
    .finally(() => {
            renderLoading();
            addCardForm.closeModal();
          });
  }
);
addCardForm.setEventListeners();

const editProfileForm = new PopupWithForm(".modal-edit",
  (inputValues) => {
    renderLoading(true);
    api.setUserInfo({
      name: inputValues.name,
      about: inputValues.profession
  })
  .then((res) => {
    userProfile.setUserInfo(inputValues);

  })
  .finally(() => {
    renderLoading();
    editProfileForm.closeModal();
  });
}
    
  
);
editProfileForm.setEventListeners();

const userProfile = new UserInfo(".profile__name", ".profile__job", ".profile__avatar");

constant.addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardForm.openModal();
});

constant.editButton.addEventListener("click", function () {
  editModalFormValidator.resetValidation();
  const userProfileData = userProfile.getUserInfo();
  constant.inputName.value = userProfileData.name;
  constant.inputProfession.value = userProfileData.job;
  editProfileForm.openModal();
});

constant.avatarEditButton.addEventListener("click", function() {
  editAvatarFormValidator.resetValidation();
  editAvatarForm.openModal();
});

const handleCardClick = (data) => {
  imageModal.openModal();
  constant.imageActive.src = data.link;
  constant.titleImageActive.textContent = data.name;
  constant.imageActive.alt = `Photo of ${data.name}`;
};



const cardsSection = new Section({
  renderer: (data) => {
    const card = createCard(data);
    cardsSection.addItem(card);
  },
}, ".cards");

  export const renderLoading = (isLoading = false) => {
    const currentActiveButton = document.querySelector('.modal__open .form__button');
  
    currentActiveButton.textContent = isLoading ? 'Loading...' : 'Loaded';
  };


  let userId

  Promise.all([api.getInitialCards(), api.getUserInfo(), api.getUserAvatar()])
    .then(([cardData, userData, userAvatar]) => {
      userProfile.setUserAvatar({link: userAvatar['avatar']})
      userId = userData._id;
      cardsSection.rendererItems(cardData);
      userProfile.setUserInfo({name: userData.name, profession: userData.about})
    })


  
    