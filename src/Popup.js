export class Popup {
    constructor(popupSelector) {
        this._modal = document.querySelector(popupSelector);

    }

    openModal() {
        this._modal.classList.add("modal__open");
        document.addEventListener("click", this._handleOverlayClick);
        document.addEventListener("keyup", this._handleEsc);
    }

    closeModal = () => {
        this._modal.classList.remove("modal__open");
        document.removeEventListener("click", this._handleOverlayClick);
        document.removeEventListener("keyup", this._handleEsc);
    };

    _handleEsc = (e) => {
        if (e.key === 'Escape') {
            this.closeModal();
        }
    };

    _handleOverlayClick = (e) => {
        const activeModal = document.querySelector(".modal__open");
        if (e.target.classList.contains('modal__open')) {
            this.closeModal();
          };
    };

    setEventListeners() {
        this._modal.querySelector(".modal__close-button").addEventListener("click", this.closeModal);
    };
}