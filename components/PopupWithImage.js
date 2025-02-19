import { Popup } from "./Popup.js";
// export class PopupWithImage extends Popup {
//   open({ name, link }) {
//     const imageElement = this._popup.querySelector(".popup__image");
//     const captionElement = this._popup.querySelector(".popup__caption");

//     imageElement.src = link;
//     imageElement.alt = name;
//     captionElement.textContent = name;

//     super.open();
//   }
// }

export class PopupWithImage extends Popup {
  constructor({ title, link }, popupSelector) {
    super(popupSelector);
    this._title = title;
    this._link = link;
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    super.open();

    super.setEventListeners();
    this._popupElement.querySelector(".popup-image-content").src = this._link;
    this._popupElement.querySelector(".popup-image-content").alt = this._title;
    this._popupElement.querySelector(".popup__caption").textContent =
      this._title;
  }
}
