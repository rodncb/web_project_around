import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

// Configuração do validador de formulário
const formValidator = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error_active",
    inactiveButtonClass: "popup__button_disabled",
  },
  document.querySelector(".form__popup")
);
formValidator.enableValidation();

// Selecionando elementos do pop-up de edição de perfil
const popup = document.getElementById("popup");
const openPopupButton = document.querySelector(".profile__info-edit-button");
const closePopupButton = document.getElementById("closePopup");

// Selecionando elementos do pop-up de adicionar novo local
const popupForm = document.getElementById("popupForm");
const openPopupButtonForm = document.querySelector(".profile__add-button");
const closePopupButtonForm = document.getElementById("closePopupForm");

// Selecionando os campos de texto dentro do pop-up de adicionar novo local
const nomeTitulo = document.getElementById("tituloImagem");
const linkImagem = document.getElementById("linkImagem");

// Selecionando os campos de texto dentro do pop-up de edição de perfil
const nomeField = document.getElementById("profileName");
const bioField = document.getElementById("profileBio");

// Selecionando os elementos da página que precisam ser atualizados
const profileNameElement = document.querySelector(".profile__info-title");
const profileBioElement = document.querySelector(".profile__info-bio");

// Dados do perfil
const profileData = {
  nome: "Jacques Cousteau",
  bio: "Explorador",
};

// Abrir a pop-up de edição de perfil
openPopupButton.addEventListener("click", () => {
  nomeField.value = profileData.nome;
  bioField.value = profileData.bio;
  openPopup(popup);
});

// Fechar a pop-up de edição de perfil
closePopupButton.addEventListener("click", () => {
  closePopup(popup);
});

popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    closePopup(popup);
  }
});

// Abrir a pop-up de adicionar novo local
openPopupButtonForm.addEventListener("click", () => {
  openPopup(popupForm);
});

// Fechar a pop-up de adicionar novo local
closePopupButtonForm.addEventListener("click", () => {
  closePopup(popupForm);
});

popupForm.addEventListener("click", (event) => {
  if (event.target === popupForm) {
    closePopup(popupForm);
  }
});

// Selecionando elementos para o popup de imagem
const imagePopup = document.getElementById("popupImage");
const closeImagePopupButton = document.getElementById("closeImagePopup");

// Adicionar evento para fechar o popup de imagem
closeImagePopupButton.addEventListener("click", () => {
  imagePopup.classList.remove("popup-image-opened");
});

imagePopup.addEventListener("click", (event) => {
  if (event.target === imagePopup) {
    imagePopup.classList.remove("popup-image-opened");
  }
});

// Função para lidar com o submit do formulário de edição de perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nomeField.value;
  profileBioElement.textContent = bioField.value;
  profileData.nome = nomeField.value;
  profileData.bio = bioField.value;
  closePopup(popup);
}

// Conectar o handler ao formulário
const formElement = document.querySelector(".popup__container form");
formElement.addEventListener("submit", handleProfileFormSubmit);

// Cards iniciais da galeria de imagens
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Função para criar um novo card de imagem
function newCard(card) {
  const cardsTemplate = document.getElementById("cardTemplate");
  const cardElement = cardsTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardLike = cardElement.querySelector(".card__icon");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  // Alternar o ícone de curtir
  cardLike.addEventListener("click", () => {
    if (cardLike.classList.contains("liked")) {
      cardLike.classList.remove("liked");
      cardLike.src = "./images/heart-icon.png";
    } else {
      cardLike.classList.add("liked");
      cardLike.src = "./images/Liked.png";
    }
  });

  // Excluir o cartão
  const cardErase = cardElement.querySelector(".card__erase");
  cardErase.addEventListener("click", () => {
    cardElement.remove();
  });

  const cardsList = document.querySelector(".gallery");
  cardsList.prepend(cardElement);
}

// Popular os cartões iniciais da galeria
const cardContainer = document.querySelector(".gallery");
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#cardTemplate");
  cardContainer.appendChild(card.generateCard());
});
