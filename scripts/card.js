export class Card {
  constructor(
    {
      title,
      link,
      isLiked,
      handleDeleteCard,
      handleCardClick,
      handleLikeClick,
    },
    templateSelector
  ) {
    this._title = title;
    this._link = link;
    this._isLiked = isLiked;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._template = document
      .querySelector(templateSelector)
      .content.cloneNode(true);
    this._element = this._template.querySelector(".card").cloneNode(true);
    this._likeButton = this._element.querySelector(".card__icon");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._element
      .querySelector(".card__erase")
      .addEventListener("click", (evt) => {
        this._handleDeleteCard();
        evt.target.closest(".card").remove();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt, this._title, this._link);
      });
  }

  isLiked() {
    return this._isLiked;
  }

  setLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._renderLike(); //
  }

  _renderLike() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__icon-liked");
    } else {
      this._likeButton.classList.remove("card__icon-liked");
    }
  }

  generateCard() {
    this._element.querySelector(".card__title").textContent = this._title;
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._title;
    this._renderLike();

    this._setEventListeners();

    return this._element;
  }
}
