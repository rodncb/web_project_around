// Selecionando elementos poppup
let popup = document.getElementById("popup");
let openPopupButton = document.querySelector(".profile__info-edit-button");
let closePopupButton = document.getElementById("closePopup");
// selecionando elementos popupform
let popupForm = document.getElementById("popup__form");
let openPopupButtonForm = document.querySelector(".profile__add-button");
let closePopupButtonForm = document.getElementById("closePopupForm");

// Selecionando os campos de texto dento do pop-up form
let nomeTitulo = document.getElementById("tituloImagem");
let linkImagem = document.getElementById("linkImagem");

// Selecionando os campos de texto dentro do pop-up
let nomeField = document.getElementById("profileName");
let bioField = document.getElementById("profileBio");

// Selecionando os elementos da página que precisam ser atualizados
let profileNameElement = document.querySelector(".profile__info-title");
let profileBioElement = document.querySelector(".profile__info-bio");

// Dados do perfil
let profileData = {
  nome: "Jacques Cousteau",
  bio: "Explorador",
};

// Abrir a pop-up
openPopupButton.addEventListener("click", () => {
  // Preencher os campos de texto com os dados do perfil
  nomeField.value = profileData.nome;
  bioField.value = profileData.bio;

  // Adiciona a classe para mostrar a pop-up
  popup.classList.add("popup__opened");
});

// Fechar a pop-up ao clicar no botão de fechar
closePopupButton.addEventListener("click", () => {
  // Remove a classe para esconder a pop-up
  popup.classList.remove("popup__opened");
  // Reexibir o botão de abrir a pop-up
  openPopupButton.style.display = "inline-block";
});

// Fechar a pop-up ao clicar fora do conteúdo da pop-up
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.classList.remove("popup__opened");
  }
});

// Função para lidar com o submit do formulário
function handleProfileFormSubmit(evt) {
  // Esta linha impede o navegador de enviar o formulário da forma padrão.
  evt.preventDefault();

  // Vamos encontrar os campos de formulário no DOM
  let nameInput = document.querySelector("#profileName");
  let bioInput = document.querySelector("#profileBio");

  // Pegue os valores de cada campo do valor da propriedade correspondente
  let nameValue = nameInput.value;
  let bioValue = bioInput.value;

  // Selecione os elementos aos quais os valores dos campos serão inseridos
  let profileNameElement = document.querySelector(".profile__info-title");
  let profileBioElement = document.querySelector(".profile__info-bio");

  // Insira novos valores usando a propriedade textContent
  profileNameElement.textContent = nameValue;
  profileBioElement.textContent = bioValue;

  profileData.nome = nameValue;
  profileData.bio = bioValue;

  // Fechar a pop-up após salvar as alterações
  popup.classList.remove("popup_opened");
  // Reexibir o botão de abrir a pop-up
  openPopupButton.style.display = "inline-block";
}

// Conecte o handler ao formulário: ele vai observar o evento de submit
let formElement = document.querySelector(".popup__container form");
formElement.addEventListener("submit", handleProfileFormSubmit);

// Cartões de imagens de imagens

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago louise",
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
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

let formData = {
  nome: "Título",
  link: "Link de imagem",
};
// Abir pop-up Form
openPopupButtonForm.addEventListener("click", () => {
  nomeTitulo.value = formData.nome;
  linkImagem.value = formData.link;
  popupForm.classList.add("popup__opened-form");
});

// Fechar a pop-up ao clicar no botão de fechar
closePopupButtonForm.addEventListener("click", () => {
  // Remove a classe para esconder a pop-up
  popupForm.classList.remove("popup__opened-form");
  // Reexibir o botão de abrir a pop-up
  openPopupButtonForm.style.display = "inline-block";
});

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

  // Muda o ícone de "Curtir" quando clicado
  cardLike.addEventListener("click", () => {
    // colocar if/else cardLike.classList.toggle("card__icon-liked");
  });
  // Função de exclusão do cartão
  const cardErase = cardElement.querySelector(".card__erase");
  cardErase.addEventListener("click", () => {
    cardElement.remove();
  });

  // Abrir pop-up da imagem quando clicada
  cardImage.addEventListener("click", () => {
    const imagePopup = document.getElementById("popupImage");
    const popupImage = imagePopup.querySelector(".popup__image");

    popupImage.src = card.link;
    popupImage.alt = card.name;

    imagePopup.classList.add("popup__image-opened");
  });

  return cardElement;
}

// Fechar pop-up da imagem
const closeImagePopupButton = document.getElementById("closeImagePopup");
closeImagePopupButton.addEventListener("click", () => {
  const imagePopup = document.getElementById("imagePopup");
  imagePopup.classList.remove("popup__opened");
});
