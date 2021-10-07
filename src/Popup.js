export class Popup {
    constructor(popupSelector) {
        this._modal = document.querySelector(popupSelector);

    }

    openModal() {
        const closeButton = document.querySelector(".modal__close-button");
        this._modal.classList.add("modal__open");
        document.addEventListener("click", this._handleOverlayClick);
        document.addEventListener("keyup", this._handleEsc);
        closeButton.addEventListener("click", this.closeModal);
    }

    closeModal = () => {
        this._modal.classList.remove("modal__open");
        document.removeEventListener("click", this._handleOverlayClick);
        document.removeEventListener("keyup", this._handleEsc);
    };

    _handleEsc = (e) => {
        // const activeModal = document.querySelector(".modal__open");
        if (e.key === 'Escape') {
            this.closeModal();
        }
    };

    _handleOverlayClick = (e) => {
        const activeModal = document.querySelector(".modal__open");
        if (e.target === activeModal) {
            this.closeModal();
        };
    };

    setEventListeners() {
        this._modal.querySelector(".modal__close-button").addEventListener("click", this.closeModal);
        // const openedImageCloseButton = openedImage.querySelector(
        //     ".modal__card-close-button");
        // const openedImage = document.querySelector(".modal-full-screen");

        // openedImageCloseButton.addEventListener("click", () => {
        //     closeModal(openedImage);
        // });
    };
}