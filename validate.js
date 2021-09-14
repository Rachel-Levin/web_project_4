function toggleButtonState (inputs, button, settings) {
    console.log(1213);
    const {inactiveButtonClass} = settings;
    const isFormValid = inputs.every(input =>  {
     return input.validity.valid})
    if(isFormValid){
      button.disabled = false;
      button.classList.remove(inactiveButtonClass);
    } else {
      console.log(button, button.classList);
      button.classList.add(inactiveButtonClass);
      button.disabled = 'disabled';
    }
  }
  

function showError (input, settings) {
    const {inputErrorClass, errorClass} = settings;
    const error = input.validationMessage;
    const errorElement = document.querySelector(`#${input.id}-error`);
    console.log(errorElement, input, error);
    errorElement.textContent = error;
    errorElement.classList.add(inputErrorClass);
    input.classList.add(errorClass);
  }
  
  function hideError (input, settings) {
    const {inputErrorClass, errorClass} = settings;
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(inputErrorClass);
    input.classList.remove(errorClass);
  }
  
  function checkValidity (input, settings) {
    if (input.validity.valid) {
      hideError (input, settings);
    } else {
      showError (input, settings);
    }
  }
  
  function enableValidation (settings) {
    const {formSelector, inputSelector, submitButtonSelector, ...rest} = settings;
    const forms = [...document.querySelectorAll(formSelector)];
    forms.forEach(form => {
      form.addEventListener("submit", (e) => { 
        e.preventDefault();
      });
      const inputs = [...form.querySelectorAll(inputSelector)];
      const button = form.querySelector(submitButtonSelector);
        inputs.forEach(input => {
           input.addEventListener("input", () => {
             checkValidity(input, rest);
             toggleButtonState (inputs, button, rest)
           })
        });
      console.log(inputs);
    });
  }
  
  const config = {
    formSelector: ".modal",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_theme_error",
    errorClass: "form__input-error"
  }
  
  enableValidation(config); 
  
  