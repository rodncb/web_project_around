export class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    // Obtém o template do HTML para o card
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    // Define os eventos do card
    this._element.querySelector(".card__icon").addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._element
      .querySelector(".card__erase")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handleCardClick();
      });
  }

  _handleLikeIcon() {
    // Alterna o ícone de like
    const likeIcon = this._element.querySelector(".card__icon");
    likeIcon.classList.toggle("liked");
    likeIcon.src = likeIcon.classList.contains("liked")
      ? "./src/images/Liked.png" // Ajuste o caminho da imagem para a pasta correta
      : "./src/images/heart-icon.png"; // Ajuste o caminho da imagem para a pasta correta
  }

  _handleDeleteCard() {
    // Remove o card
    this._element.remove();
  }

  handleCardClick() {
    // Abre a imagem em um popup
    const imagePopup = document.getElementById("popupImage");
    const popupImageElement = imagePopup.querySelector(".popup-image-content");
    const popupCaptionElement = imagePopup.querySelector(".popup__caption");

    popupImageElement.src = this._link;
    popupImageElement.alt = this._name;
    popupCaptionElement.textContent = this._name;

    imagePopup.classList.add("popup-image-opened");
  }

  generateCard() {
    // Gera o card com base no template
    this._element = this._getTemplate();

    // Define os dados do card
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    // Define os eventos
    this._setEventListeners();

    return this._element;
  }
}
