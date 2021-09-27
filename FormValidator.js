export class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.formElement = formElement;
    }

    _showError(input, settings) {
        const { inputErrorClass, errorClass } = this.settings;
        const error = input.validationMessage;
        // since the closest() method searches up the DOM tree for the closest element
        // I had to use input.parentElement instead
        const errorElement = this.formElement.querySelector('#' + input.id + '-error');
        console.log(errorElement, input, error);
        errorElement.textContent = error;
        errorElement.classList.add(inputErrorClass);
        input.classList.add(errorClass);
    }

    _hideError(input, settings) {
        const { inputErrorClass, errorClass } = this.settings;
        // since the closest() method searches up the DOM tree for the closest element
        // I had to use input.parentElement instead
        const errorElement = this.formElement.querySelector('#' + input.id + '-error');
        errorElement.textContent = "";
        errorElement.classList.remove(inputErrorClass);
        input.classList.remove(errorClass);
    }

    _checkValidity(input, settings) {
        if (input.validity.valid) {
            this._hideError(input, settings);
        } else {
            this._showError(input, settings);
        }
    }

    _setEventListeners() {
        const inputs = [...this.formElement.querySelectorAll(this.settings.inputSelector)];
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                this._checkValidity(input);
                this._toggleButtonState(inputs)
            })
        });
        console.log(inputs);
    }

    _toggleButtonState(inputs) {
        const { inactiveButtonClass } = this.settings;
        const button = this.formElement.querySelector(this.settings.submitButtonSelector);
        const isFormValid = inputs.every(input => {
            return input.validity.valid
        })
        if (isFormValid) {
            button.disabled = false;
            button.classList.remove(inactiveButtonClass);
        } else {
            console.log(button, button.classList);
            button.classList.add(inactiveButtonClass);
            button.disabled = 'disabled';
        }
    }

    enableValidation() {
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }

}

