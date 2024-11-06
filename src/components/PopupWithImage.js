import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open({ name, link }) {
    const imageElement = this._popup.querySelector(".popup__image");
    const captionElement = this._popup.querySelector(".popup__caption");

    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;

    super.open();
  }
}

export default PopupWithImage;
