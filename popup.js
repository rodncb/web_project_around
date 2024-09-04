// Selecionando elementos
let popup = document.getElementById("popup");
let openPopupButton = document.querySelector(".profile__info__edit__button");
let closePopupButton = document.getElementById("closePopup");

// Selecionando os campos de texto dentro do pop-up
let nomeField = document.getElementById("profileName");
let bioField = document.getElementById("profileBio");

// Selecionando os elementos da página que precisam ser atualizados
let profileNameElement = document.querySelector(".profile__info__title");
let profileBioElement = document.querySelector(".profile__info__bio");

// Dados do perfil (substitua por sua fonte de dados)
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
  popup.classList.add("popup_opened");
});

// Fechar a pop-up ao clicar no botão de fechar
closePopupButton.addEventListener("click", () => {
  // Remove a classe para esconder a pop-up
  popup.classList.remove("popup_opened");

  console.log("Fechando pop-up e exibindo botão de editar");
  // Reexibir o botão de abrir a pop-up
  openPopupButton.style.display = "inline-block";
});

// Fechar a pop-up ao clicar fora do conteúdo da pop-up
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.classList.remove("popup_opened");
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
  let profileNameElement = document.querySelector(".profile__info__title");
  let profileBioElement = document.querySelector(".profile__info__bio");

  // Insira novos valores usando a propriedade textContent
  profileNameElement.nodeValue = nameValue;
  profileBioElement.textContent = bioValue;

  // Fechar a pop-up após salvar as alterações
  popup.classList.remove("popup_opened");
}

// Conecte o handler ao formulário: ele vai observar o evento de submit
let formElement = document.querySelector(".popup__container form");
formElement.addEventListener("submit", handleProfileFormSubmit);
