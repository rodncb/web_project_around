export class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this.element.querySelector(".card__icon").addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this.element.querySelector(".card__erase").addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this.element.querySelector(".card__image").addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleLikeIcon() {
    const likeIcon = this._element.querySelector(".card__icon");
    likeIcon.classList.toggle("liked");
    likeIcon.src = likeIcon.classList.contains("liked")
      ? "./images/Liked.png"
      : "./images/heart-icon.png";
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleImageClick() {
    const popupImageElement = document.querySelector(".popup-imagem-content");
    const popupCaptionElement = document.querySelector(".popup__caption");
    const imagePopup = document.querySelector("popupImage");

    popupImageElement.src = this._link;
    popupImageElement.alt = this._name;
    popupCaptionElement.textContent = this._name;
    imagePopup.classList.add("popup-imagem-content");
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector("card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
