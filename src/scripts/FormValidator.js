export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    // console.log(inputElement, errorMessage);
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    console.log(errorElement);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    console.log(inputElement.validity.valid);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasInvalidInput) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      // console.log(inputElement);
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // enableValidation() {
  //   this._setEventListeners();
  //   this._toggleButtonState();
  // }

  resetInputValidation() {
    // 1. Limpa os erros de todos os campos
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // Reutiliza a lógica de esconder erros
    });

    // 2. Reseta o estado do botão de envio
    this._toggleButtonState(); // Força a reavaliação do botão
  }

  enableValidation = () => {
    const inputError = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    // console.log(inputError);
    // inputError.forEach((fieldset) => {
    //   this._setEventListeners(fieldset); // Só se _setEventListeners precisar do fieldset
    // });
    this._setEventListeners();
  };
}
