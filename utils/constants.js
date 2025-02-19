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
const formElement = document.querySelector(".form__popup");
const cardContainer = document.querySelector(".gallery");

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

export {
  popup,
  openPopupButton,
  closePopupButton,
  popupForm,
  openPopupButtonForm,
  closePopupButtonForm,
  nomeTitulo,
  linkImagem,
  nomeField,
  bioField,
  profileNameElement,
  profileBioElement,
  formElement,
  cardContainer,
  initialCards,
};
