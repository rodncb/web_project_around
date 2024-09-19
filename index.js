// Selecionando elementos do pop-up de edição de perfil
const popup = document.getElementById("popup");
const openPopupButton = document.querySelector(".profile__info-edit-button");
const closePopupButton = document.getElementById("closePopup");

// Selecionando elementos do pop-up de adicionar imagem
const popupForm = document.getElementById("popupForm");
const openPopupButtonForm = document.querySelector(".profile__add-button");
const closePopupButtonForm = document.getElementById("closePopupForm");

// Selecionando os campos de texto dentro do pop-up de adicionar imagem
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
  // Preencher os campos de texto com os dados do perfil
  nomeField.value = profileData.nome;
  bioField.value = profileData.bio;

  // Adicionar a classe para mostrar a pop-up
  popup.classList.add("popup__opened");
});

// Fechar a pop-up de edição de perfil ao clicar no botão de fechar
closePopupButton.addEventListener("click", () => {
  popup.classList.remove("popup__opened");
});

// Fechar a pop-up ao clicar fora do conteúdo da pop-up
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.classList.remove("popup__opened");
  }
});

// Função para lidar com o submit do formulário de edição de perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // Pegando os valores dos campos de texto
  const nameValue = nomeField.value;
  const bioValue = bioField.value;

  // Atualizando o conteúdo do perfil com os novos valores
  profileNameElement.textContent = nameValue;
  profileBioElement.textContent = bioValue;

  // Atualizando o objeto profileData
  profileData.nome = nameValue;
  profileData.bio = bioValue;

  // Fechar a pop-up após salvar as alterações
  popup.classList.remove("popup__opened");
}

// Conectar o handler ao formulário: ele vai observar o evento de submit
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
    // cardLike.classList.toggle("liked");

    // Verifica se a classe "liked" existe após a troca
    if (cardLike.classList.contains("liked")) {
      cardLike.classList.remove("liked");
      cardLike.src = "./images/heart-icon.png";
    } else {
      cardLike.classList.add("liked");
      cardLike.src = "./images/Liked.png";
    }
  });
  cardLike.addEventListener("mouseover", () => {
    cardLike.src = "./images/heartHover.png"; // Substitua pelo caminho da imagem de hover
  });

  cardLike.addEventListener("mouseout", () => {
    if (cardLike.classList.contains("liked")) {
      cardLike.src = "./images/Liked.png";
    } else {
      cardLike.src = "./images/heart-icon.png";
    }
  });

  // Excluir o cartão
  const cardErase = cardElement.querySelector(".card__erase");
  cardErase.addEventListener("click", () => {
    cardElement.remove();
  });

  // Abrir pop-up da imagem ao clicar na imagem
  cardImage.addEventListener("click", () => {
    const imagePopup = document.getElementById("popupImage");
    const popupImageElement = imagePopup.querySelector(".popup-image-content");
    const popupCaptionElement = imagePopup.querySelector(".popup__caption");

    popupImageElement.src = card.link;
    popupImageElement.alt = card.name;
    popupCaptionElement.textContent = card.name;

    imagePopup.classList.add("popup-image-opened");
  });

  const cardsList = document.querySelector(".gallery");
  cardsList.prepend(cardElement);
}

// Fechar pop-up de imagem
const closeImagePopupButton = document.getElementById("closeImagePopup");
closeImagePopupButton.addEventListener("click", () => {
  const imagePopup = document.getElementById("popupImage");
  imagePopup.classList.remove("popup-image-opened");
});

// Fechar pop-up de imagem ao clicar fora dela
const imagePopup = document.getElementById("popupImage");
imagePopup.addEventListener("click", (event) => {
  if (event.target === imagePopup) {
    imagePopup.classList.remove("popup-image-opened");
  }
});

// Popular os cartões iniciais da galeria
const cardContainer = document.querySelector(".gallery");
initialCards.forEach((card) => {
  const cardElement = newCard(card);
});

// Abrir pop-up de adicionar imagem
openPopupButtonForm.addEventListener("click", () => {
  nomeTitulo.value = "Título";
  linkImagem.value = "Link da Imagem";
  popupForm.classList.add("popup__opened-form");
});

// Fechar pop-up de adicionar imagem ao clicar no botão fechar
closePopupButtonForm.addEventListener("click", () => {
  // Remover a classe para fechar o pop-up
  popupForm.classList.remove("popup__opened-form");
});

// Adicionar um novo card a partir do formulário de adicionar imagem
popupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Salvar os valores do pop-up
  const tituloImagem = nomeTitulo.value;
  const linkImagemValue = linkImagem.value;

  // Criar um novo card e adicionar à galeria
  const newCardData = {
    name: tituloImagem,
    link: linkImagemValue,
  };
  if (!tituloImagem || !linkImagemValue) {
    console.error("Título ou link da imagem não foram fornecidos.");
    return;
  }

  newCard(newCardData); // Apenas chama a função para adicionar o card

  // Fechar o formulário de adicionar imagem
  popupForm.classList.remove("popup__opened-form");
});
