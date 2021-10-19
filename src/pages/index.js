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

addCardFormValidator.enableValidation();
editModalFormValidator.enableValidation();

const imageModal = new PopupWithImage(".modal-full-screen");
imageModal.setEventListeners();
const confirmModal = new PopupWithSubmit(".modal-delete-card");

confirmModal.setEventListeners();

// const handleDeleteCard = (id) => {
//   confirmModal.openModal();
//   confirmModal.setAction(() => {
//   api.deleteCard(id)
//     .then (res => {
//       currentCard.removeCard();
//     })
//   })  
// }

function createCard(data) {
  const currentCard = new Card({
    name: data['name'], 
    link: data['link'], 
    id: data['_id'], 
    owner: data['owner'],
    templateCardSelector: constant.templateCardSelector,
    handleCardClick: () => handleCardClick(data),
    handleDeleteCard:  () => {
  confirmModal.openModal();
  confirmModal.setAction(() => {
  api.deleteCard(data['_id'])
    .then (res => {
      currentCard.removeCard();
      confirmModal.closeModal();
    })
  })  
}
      },
      userId)  
    
  const itemElement = currentCard.generateCard();
  console.log(itemElement);
  return itemElement;
}

// api.createCard(data)
// .then(res => {
//   console.log('res', res)
// })

const addCardForm = new PopupWithForm(".modal-add-card",
  (inputValues) => {
    api.createCard({
      name: inputValues['card-title'],
      link: inputValues['card-link'],
    })
    .then(res => {
      console.log('res', res);
      const cardContent = createCard({
        name: inputValues['card-title'],
        link: inputValues['card-link'],
      });
      cardsSection.addItem(cardContent);
      addCardForm.closeModal();
    })
    
  }
);
addCardForm.setEventListeners();

const editProfileForm = new PopupWithForm(".modal-edit",
  (inputValues) => {
    // userProfile.setUserInfo(inputValues);
    editProfileForm.closeModal();
  }
);
editProfileForm.setEventListeners();

const userProfile = new UserInfo(".profile__name", ".profile__job");

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

const handleCardClick = (data) => {
  imageModal.openModal();
  constant.imageActive.src = data.link;
  constant.titleImageActive.textContent = data.name;
  constant.imageActive.alt = `Photo of ${data.name}`;
};



const cardsSection = new Section({
  // items: constant.initialCards,
  renderer: (data) => {
    const card = createCard(data);
    cardsSection.addItem(card);
  },
}, ".cards");

// cardsSection.rendererItems();

// api.getInitialCards() 
//   .then(res => {
//     cardsSection.rendererItems(res);
//     console.log('res', res)
//   });

  // api.getUserInfo() 
  // .then(res => {
  //   userProfile.setUserInfo({name: res.name, profession: res.about})
  //   console.log('res', res)
  // });

  let userId

  Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cardData, userData]) => {
      userId = userData._id;
      console.log(userId)
      cardsSection.rendererItems(cardData);
      userProfile.setUserInfo({name: userData.name, profession: userData.about})
    })