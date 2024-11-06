// enableValidation
function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputs = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  // Função para exibir a mensagem de erro
  function showError(input, errorElement, errorMessage) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }

  // Função para ocultar a mensagem de erro
  function hideError(input, errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  }

  // Função para verificar se todos os inputs estão válidos
  function checkFormValidity() {
    return Array.from(inputs).every((input) => input.checkValidity());
  }

  // Função para habilitar/desabilitar o botão de envio
  function buttonState() {
    if (checkFormValidity()) {
      submitButton.classList.remove(config.inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classList.add(config.inactiveButtonClass);
      submitButton.disabled = true;
    }
  }

  // Adiciona o ouvinte de evento para cada input
  inputs.forEach((input) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);

    input.addEventListener("input", () => {
      // verificar se o input é válido
      const isValid = input.checkValidity();
      if (isValid) {
        hideError(input, errorElement);
      } else {
        showError(input, errorElement, input.validationMessage);
      }
      buttonState();
    });
  });
  // Verificar o estado do botão no início
  buttonState();

  // Adiciona a lógica de prevenção de envio se o formulário for inválido
  formElement.addEventListener("submit", (event) => {
    if (!checkFormValidity()) {
      event.preventDefault();
    }
  });
}

enableValidation({
  formSelector: ".form__popup",
  inputSelector: ".form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

enableValidation({
  formSelector: ".form__popup-add-card",
  inputSelector: ".form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// verificar se o input é válido
// se for invalido, quero mostrar a msg de erro
// desabilitar button form

// se for valido, esconder a msg de erro

// se todos os inputs forem validos, habilitar o buttom do form
