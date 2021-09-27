// const itemTemplate = document.querySelector("#gallery").content;
export const imageOpen = document.querySelector(".modal-full-screen");
const imageOpenCloseButton = imageOpen.querySelector(
    ".modal__card-close-button");


export function openModal(modal) {
    modal.classList.add("modal__open");
    document.addEventListener("click", closeFormOverlay);
    document.addEventListener("keyup", closeFormEsc);
    const inputs = [...modal.querySelectorAll(".form__input")];
    inputs.forEach(input => {
        hideError(input, config);
    });
};

function closeFormOverlay(e) {
    isOverlayClicked(e, closeModal)
}

function closeFormEsc(e) {
    isFormEsc(e, closeModal);
};

function isOverlayClicked(e, action) {
    const activeModal = document.querySelector(".modal__open");
    if (e.target === activeModal) {
        action(activeModal);
    };
};

export function closeModal(modal) {
    modal.classList.remove("modal__open");
    document.removeEventListener("click", closeFormOverlay);
    document.removeEventListener("keyup", closeFormEsc);
};

function isFormEsc(e, action) {
    const activeModal = document.querySelector(".modal__open");
    if (e.key === 'Escape') {
        action(activeModal);
    }
};

imageOpenCloseButton.addEventListener("click", () => {
    closeModal(imageOpen);
});