import {
    Popup
} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler;
    }

    _getInputValues() {
        const inputs = [...this._modal.querySelectorAll(".form__input")];
        const inputValues = {};


        inputs.forEach((input) => {
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
        this._modal.reset();
    }
}