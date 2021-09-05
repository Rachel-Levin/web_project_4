
// const 
const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__job');
// const cardTitle = document.querySelector('.')
//modals
const editModal = document.querySelector('.modal-edit');
const addCardModal = document.querySelector('.modal__add-card');
//closeButtons
const editModalCloseButton = editModal.querySelector('.modal__close-button');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close-button');
//buttons
const editButton = document.querySelector('.profile__edit');
const addCardButton = document.querySelector('.profile__add')
//inputs
const inputName = editModal.querySelector('.form__input-name');
const inputProfession = editModal.querySelector('.form__input-profession');
const inputCardTitle = addCardModal.querySelector('.form__input-card-title');
const inputCardLink = addCardModal.querySelector('.form__input-card-link');
//forms
const editForm = editModal.querySelector('.form');
const addForm = addCardModal.querySelector('.form');
//images
const imageOpen = document.querySelector(".modal__opens-card");
const imageActive = imageOpen.querySelector(".gallery__image-active");
const titleImageActive = imageOpen.querySelector(".gallery__title-active");
const imageOpenCloseButton = imageOpen.querySelector(".modal__card-close-button");
function toggleModal (modal) {
    modal.classList.toggle("modal__open");
};

addCardButton.addEventListener("click", () => {
    addForm.reset();
    toggleModal (addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
    toggleModal (addCardModal);
});


editButton.addEventListener('click', function(){
    editForm.reset();
    toggleModal (editModal);
});

function closeModal() {
    toggleModal (editModal);
};

editModalCloseButton.addEventListener('click', closeModal);

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameValue = inputName.value;
    const professionValue = inputProfession.value;

    userName.textContent = nameValue;
    userProfession.textContent = professionValue;

    toggleModal (editModal);

})

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    generateCard({name: inputCardTitle.value, link: inputCardLink.value})
    toggleModal (addCardModal);
})

const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ];
  
  function generateCard(cardDate) {
    const itemTemplate = document.querySelector("#gallery__item").content;
    const itemElement = itemTemplate.querySelector(".gallery__item").cloneNode(true);
    const gallery = document.querySelector(".gallery");
    const deleteCard = itemElement.querySelector(".gallery__delete");
    const likeCard = itemElement.querySelector(".gallery__like");
    const image = itemElement.querySelector(".gallery__image");
    const title = itemElement.querySelector(".gallery__title");
    
    image.src = cardDate.link;
    title.textContent = cardDate.name;
    
    image.addEventListener('click', () => {
        imageOpen.classList.add("modal__open-card-active");
        imageActive.src = cardDate.link;
        titleImageActive.textContent = cardDate.name;
      })

    likeCard.addEventListener('click', () => {
        likeCard.classList.toggle("gallery__like-active")
    });

    deleteCard.addEventListener('click', () => {
        itemElement.remove();
    });

    gallery.prepend(itemElement);
  };

  initialCards.forEach(generateCard);

  imageOpenCloseButton.addEventListener("click", () => {
    imageOpen.classList.remove("modal__open-card-active");
});


//   const itemTemplate = document.querySelector("#gallery__item").content;
//   const itemElement = itemTemplate.querySelector(".gallery__item").cloneNode(true);
//   const gallery = document.querySelector(".gallery");
//   itemElement.querySelector(".gallery__image").src = "https://code.s3.yandex.net/web-code/yosemite.jpg";
//   itemElement.querySelector(".gallery__title").textContent = "Yosemite Valley";
//   gallery.append(itemElement);

// const itemTemplate = document.querySelector("#gallery__item").content.querySelector(".gallery__item")
// const gallery = document.querySelector(".gallery");
// const itemElement = itemTemplate.cloneNode(true);
// const image = itemElement.querySelector(".gallery__image");
// const title = itemElement.querySelector(".gallery__title");



// const itemOnline = document.querySelector(".gallery__item-online");
// const itemElement = document.querySelector(".gallery__item").cloneNode(true);

// itemElement.querySelector(".gallery__image").src = "https://code.s3.yandex.net/web-code/yosemite.jpg";
// itemElement.querySelector(".gallery__title").textContent = "Yosemite Valley";
// itemOnline.prepend(itemElement);