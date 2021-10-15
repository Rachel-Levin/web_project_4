export class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.formElement = formElement;
        this.inputs = [...this.formElement.querySelectorAll(this.settings.inputSelector)];
    }

    _showError(input) {
        const {
            inputErrorClass,
            errorClass
        } = this.settings;
        const error = input.validationMessage;
        // since the closest() method searches up the DOM tree for the closest element
        // I had to use input.parentElement instead
        const errorElement = this.formElement.querySelector('#' + input.id + '-error');
        errorElement.textContent = error;
        errorElement.classList.add(inputErrorClass);
        input.classList.add(errorClass);
    }

    _hideError(input) {
        const {
            inputErrorClass,
            errorClass
        } = this.settings;
        // since the closest() method searches up the DOM tree for the closest element
        // I had to use input.parentElement instead
        const errorElement = this.formElement.querySelector('#' + input.id + '-error');
        errorElement.textContent = "";
        errorElement.classList.remove(inputErrorClass);
        input.classList.remove(errorClass);
    }

    _checkValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }

    _setEventListeners() {

        this.inputs.forEach(input => {
            input.addEventListener("input", () => {
                this._checkValidity(input);
                this._toggleButtonState()
            })
        });
    }

    _toggleButtonState() {
        const {
            inactiveButtonClass
        } = this.settings;
        const button = this.formElement.querySelector(this.settings.submitButtonSelector);
        const isFormValid = this.inputs.every(input => {
            return input.validity.valid
        })
        if (isFormValid) {
            button.disabled = false;
            button.classList.remove(inactiveButtonClass);
        } else {
            button.classList.add(inactiveButtonClass);
            button.disabled = true;
        }
    }

    enableValidation() {
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }
    resetValidation() {
        this.inputs.forEach(input => this._hideError(input));
        this._toggleButtonState();
    }
}


