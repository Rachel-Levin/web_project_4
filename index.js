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

function openModal(modal) {
  modal.classList.add("modal__open");
  document.addEventListener("click", closeFormOverlay);
  document.addEventListener("keyup", closeFormEsc);
  const inputs = [...modal.querySelectorAll(config.inputSelector)];
  inputs.forEach(input => {
      hideError(input, config);
  });
};

function closeModal(modal) {
  modal.classList.remove("modal__open");
  document.removeEventListener("click", closeFormOverlay);
  document.removeEventListener("keyup", closeFormEsc);
};

function isFormEsc (e, action) {
  const activeModal = document.querySelector(".modal__open");
  if (e.key === 'Escape') {
    action(activeModal);
  }
};

function closeFormEsc (e) {
  isFormEsc(e, closeModal);
};

function isOverlayClicked (e, action) {
  const activeModal = document.querySelector(".modal__open");
  if (e.target === activeModal) {
    action(activeModal);
  }; 
};

function closeFormOverlay (e) {
  isOverlayClicked(e, closeModal)
}

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

