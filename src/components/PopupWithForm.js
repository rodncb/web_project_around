// // PopupWithForm.js
import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }, formValidator) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".form__popup");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
    this._formValidator = formValidator; // Armazena o validador
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(".popup__input");
    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    console.log(values);

    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
    this.renderLoading(false);

    // Reseta a validação apenas se o validador existir
    if (this._formValidator) {
      this._formValidator.resetInputValidation();
    }
  }

  open() {
    super.open();
    // Atualiza o estado do botão ao abrir
    if (this._formValidator) {
      this._formValidator._toggleButtonState();
    }
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Salvando...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
