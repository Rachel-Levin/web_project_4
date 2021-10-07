import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openModal(name, link) {
        super.openModal();
        const imageActive = this._modal.querySelector(".modal__image-active");
        const titleImageActive = this._modal.querySelector(".modal__title-active");

        imageActive.src = link;
        titleImageActive.textContent = name;
        imageActive.alt = `Photo of ${name}`;

     
    }


}


