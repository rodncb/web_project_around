import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";
import { Api } from "./api.js";

// Configuração da API
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "b7cf1735-13ba-4a39-ba8f-2535fb3a3a09",
    "Content-Type": "application/json",
  },
});

// Configuração de validação
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Inicialização de elementos
const profileNameElement = document.querySelector(".profile__info-title");
const profileBioElement = document.querySelector(".profile__info-bio");
const galleryContainer = document.querySelector(".gallery");
const addButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__info-edit-button");
const profilePictureButton = document.querySelector(".profile__photo-edit");
const profileImage = document.querySelector(".profile__photo");
const deletePopup = document.querySelector("#PopupWithConfirmation");
const deleteConfirmButton = deletePopup.querySelector("#popupDeleteButton");

// Inicialização de formulários e popups
const profileForm = document.querySelector(".popup__form-profile");
const addCardPopup = document.querySelector("#popupForm");
const profilePopup = document.querySelector(".popup");
const profilePicturePopup = document.getElementById("popupProfilePicture");
const formProfilePicture = document.getElementById("formProfilePicture");
const profilePictureUrlInput = document.getElementById("profilePictureUrl");

// Inicialização dos validadores
const profileFormValidator = new FormValidator(validationConfig, profileForm);

let cardToDelete = null;

// Função para inicializar os event listeners
function initializeEventListeners() {
  // Botão de Adicionar Card
  if (addButton) {
    addButton.addEventListener("click", () => {
      if (addCardPopup) {
        openPopup(addCardPopup);
      }
    });
  }

  // Botão de Editar Perfil
  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      if (profilePopup) {
        openPopup(profilePopup);
      }
    });
  }

  galleryContainer.addEventListener("click", (evt) => {
    if (evt.target.closest(".card__erase")) {
      const card = evt.target.closest(".card");
      if (card) {
        handleDeleteCard(card);
      }
    }
    if (deleteConfirmButton) {
      deleteConfirmButton.addEventListener("click", () => {
        if (cardToDelete) {
          cardToDelete.remove();
          cardToDelete = null;
          closePopup(deletePopup);
        }
      });
    }
  });

  // Botão de Foto de Perfil
  if (profilePictureButton) {
    profilePictureButton.addEventListener("click", () => {
      if (profilePicturePopup) {
        openPopup(profilePicturePopup);
      }
    });
  }

  // Botões de Fechar
  document
    .querySelectorAll(".popup__close-button", ".popup__close-button-image")
    .forEach((button) => {
      button.addEventListener("click", (evt) => {
        closePopup(evt.target.closest(".popup"));
      });
    });

  // Formulário de Foto de Perfil
  if (formProfilePicture) {
    formProfilePicture.addEventListener("submit", (event) => {
      event.preventDefault();
      handleProfilePictureUpdate();
    });
  }
}

// Função para atualizar a foto de perfil
function handleProfilePictureUpdate() {
  const newProfilePictureUrl = profilePictureUrlInput.value;

  if (newProfilePictureUrl) {
    profileImage.src = newProfilePictureUrl;

    api
      .updateProfilePicture(newProfilePictureUrl)
      .then(() => {
        closePopup(profilePicturePopup);
        formProfilePicture.reset();
      })
      .catch((err) => {
        console.error("Erro ao atualizar foto de perfil:", err);
      });
  }
}

// Função para tratar a exclusão de um card
function handleDeleteCard(card) {
  cardToDelete = card;
  openPopup(deletePopup);
}

// Função para renderizar um card
function renderCard(cardData) {
  const card = new Card(cardData, "#cardTemplate");
  const cardElement = card.generateCard();
  galleryContainer.appendChild(cardElement);
}

// Função para carregar os dados iniciais
function loadInitialData() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      // Atualiza o perfil
      profileNameElement.textContent = userData.name;
      profileBioElement.textContent = userData.about;

      // Renderiza os cards
      if (cards && Array.isArray(cards) && cards.length > 0) {
        cards.forEach((cardData) => renderCard(cardData));
      }
    })
    .catch((err) => {
      console.log(`Erro ao carregar dados iniciais: ${err}`);
    });
}

// Função de inicialização
function initialize() {
  // Verifica elementos obrigatórios
  if (!profileNameElement || !profileBioElement) {
    console.error("Elementos de perfil não encontrados");
    return;
  }

  // Habilita a validação do formulário
  if (profileForm) {
    profileFormValidator.enableValidation();
  }

  // Inicializa os event listeners
  initializeEventListeners();

  // Carrega os dados iniciais
  loadInitialData();
}

// Inicializa o aplicativo quando o DOM for carregado
document.addEventListener("DOMContentLoaded", () => {
  initialize();
});
