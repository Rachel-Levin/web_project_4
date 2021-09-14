// const
const userName = document.querySelector(".profile__name");
const userProfession = document.querySelector(".profile__job");
// const cardTitle = document.querySelector('.')
//modals
const editModal = document.querySelector(".modal-edit");
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
//images
const itemTemplate = document.querySelector("#gallery").content;
const imageOpen = document.querySelector(".modal-full-screen");
const imageActive = imageOpen.querySelector(".modal__image-active");
const titleImageActive = imageOpen.querySelector(".modal__title-active");
const imageOpenCloseButton = imageOpen.querySelector(
  ".modal__card-close-button"
);
function toggleModal(modal) {
  modal.classList.toggle("modal__open");
}

function openModal(modal) {
  modal.classList.add("modal__open");
};

function closeModal(modal) {
  modal.classList.remove("modal__open");
};

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

// function closeModal() {
//   toggleModal(editModal);
// }

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
  generateCard({ name: inputCardTitle.value, link: inputCardLink.value });
  closeModal(addCardModal);
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

function generateCard(cardDate) {
  const itemElement = itemTemplate.querySelector(".gallery").cloneNode(true);
  const gallery = document.querySelector(".cards");
  const deleteCard = itemElement.querySelector(".gallery__delete");
  const likeCard = itemElement.querySelector(".gallery__like");
  const image = itemElement.querySelector(".gallery__image");
  const title = itemElement.querySelector(".gallery__title");

  image.src = cardDate.link;
  title.textContent = cardDate.name;

  image.addEventListener("click", () => {
    openModal(imageOpen);
    imageActive.src = cardDate.link;
    titleImageActive.textContent = cardDate.name;
  });

  likeCard.addEventListener("click", () => {
    likeCard.classList.toggle("gallery__like-active");
  });

  deleteCard.addEventListener("click", () => {
    itemElement.remove();
  });

  gallery.prepend(itemElement);
}

initialCards.forEach(generateCard);

imageOpenCloseButton.addEventListener("click", () => {
  closeModal(imageOpen);
});

function toggleButtonState (inputs, button, settings) {
  const {inactiveButtonClass} = settings;
  const isFormValid = inputs.every(input =>  {
   return input.validity.valid})
  if(isFormValid){
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  } else {
    console.log(button, button.classList);
    button.classList.add(inactiveButtonClass);
    button.disabled = 'disabled';
  }
}

function showError (input, settings) {
  const {inputErrorClass, errorClass} = settings;
  const error = input.validationMessage;
  const errorElement = document.querySelector(`#${input.id}-error`);
  console.log(errorElement, input, error);
  errorElement.textContent = error;
  errorElement.classList.add(inputErrorClass);
  input.classList.add(errorClass);
}

function hideError (input, settings) {
  const {inputErrorClass, errorClass} = settings;
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(inputErrorClass);
  input.classList.remove(errorClass);
}

function checkValidity (input, settings) {
  if (input.validity.valid) {
    hideError (input, settings);
  } else {
    showError (input, settings);
  }
}

function enableValidation (settings) {
  const {formSelector, inputSelector, submitButtonSelector, ...rest} = settings;
  const forms = [...document.querySelectorAll(formSelector)];
  forms.forEach(form => {
    form.addEventListener("submit", (e) => { 
      e.preventDefault();
    });
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);
      inputs.forEach(input => {
         input.addEventListener("input", () => {
           checkValidity(input, rest);
           toggleButtonState (inputs, button, rest)
         })
      });
    console.log(inputs);
  });
}

const config = {
  formSelector: ".modal",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_theme_error",
  errorClass: "form__input-error"
}

enableValidation(config); 

function closeImage(){
  const modals = [...querySelectorAll(".modal")];
    modals.forEach (modal => document.addEventListener("click", (e) =>{
      if(modal.classList.contains("modal__open")) {
        modal.classList.remove("modal__open");
      }
    }));
  };
  closeImage();

    // function closeImage () {
//   if (!target === popup) {
//     closeModal(imageOpen)
//   }
// }

// document.addEventListener("click", closeImage);