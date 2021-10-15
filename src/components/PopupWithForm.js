import {
    Popup
} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler;
        this._inputs = [...this._modal.querySelectorAll(".form__input")];
        this._form = this._modal.querySelector(".form");
    }

    _getInputValues() {
        const inputValues = {};


        this._inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        })
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.addEventListener("submit", (e) => {
            e.preventDefault();
            this._submitHandler(this._getInputValues());
        });
    }

    closeModal() {
        super.closeModal();
        this._form.reset();
    }
}