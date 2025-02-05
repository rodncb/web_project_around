export class Card {
  constructor({ title, link, handleCardClick }, templateSelector) {
    this._title = title;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._template = document
      .querySelector(templateSelector)
      .content.cloneNode(true);
  }

  _setEventListeners() {
    // Like button
    this._element
      .querySelector(".card__icon")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__icon-liked");
      });

    // Delete button
    this._element
      .querySelector(".card__erase")
      .addEventListener("click", (evt) => {
        evt.target.closest(".card").remove();
      });

    // Image click
    this._element
      .querySelector(".card__image")
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt, this._title, this._link);
      });
  }

  generateCard() {
    this._element = this._template.querySelector(".card").cloneNode(true);

    // Preencha os elementos do template
    this._element.querySelector(".card__title").textContent = this._title;
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._title;

    this._setEventListeners();

    return this._element;
  }
}
