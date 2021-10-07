import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        // this._name = data.name;
        // this._link = data.link;
    }

    openModal(name, link) {
        super.openModal();
        const imageActive = this._modal.querySelector(".modal__image-active");
        const titleImageActive = this._modal.querySelector(".modal__title-active");
        // const openedImage = document.querySelector(".modal-full-screen");

        imageActive.src = link;
        titleImageActive.textContent = name;
        imageActive.alt = `Photo of ${name}`;

     
    }


}


