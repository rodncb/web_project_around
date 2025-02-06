import {
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
} from "../utils/constants.js";

import { FormValidator } from "./FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Card } from "./card.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__info-title",
  jobSelector: ".profile__info-bio",
});

const formValidator = new FormValidator(
  {
    formSelector: ".form__popup",
    // fieldsetSeletor: ".popup__fieldset",
    inputSelector: ".form-input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error_active",
  },
  formElement
);
const popupProfile = new PopupWithForm(
  "#popup",
  {
    handleFormSubmit: ({ name, job }) => {
      userInfo.setUserInfo({ name, job });
      popupProfile.close();
    },
  },
  formValidator
);

popupProfile.setEventListeners();

openPopupButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();

  document.querySelector("#profileName").value = name;
  document.querySelector("#profileBio").value = job;

  formValidator.resetInputValidation();
  popupProfile.open();
});

const addInitialCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          title: item.name,
          link: item.link,
          handleCardClick: (evt, title, link) => {
            if (evt.target.classList.contains("card__icon")) {
              evt.target.classList.toggle("card__icon-liked");
            }
            if (evt.target.classList.contains("card__image")) {
              const imagePopup = new PopupWithImage(
                {
                  title,
                  link,
                },
                ".popup-image"
              );
              imagePopup.open();
            }
          },
        },
        "#cardTemplate"
      );

      addInitialCards.addItem(card.generateCard());
    },
  },
  ".gallery"
);

addInitialCards.renderItems();

formValidator.enableValidation();

const popupAddCard = new PopupWithForm(
  "#popupForm", // Seletor do popup de adicionar cards
  {
    handleFormSubmit: (data) => {
      // Cria um novo card com os dados do formulário
      const newCard = {
        name: data.nameAdd, // Nome do campo input titulo
        link: data.linkAdd, // Nome do campo input link
      };

      console.log(data); // Cria e adiciona o novo card
      const card = new Card(
        {
          title: newCard.name,
          link: newCard.link,
          handleCardClick: (evt) => {
            if (evt.target.classList.contains("card__icon")) {
              evt.target.classList.toggle("card__icon-liked");
            }
            if (evt.target.classList.contains("card__image")) {
              const imagePopup = new PopupWithImage(
                {
                  title: newCard.name,
                  link: newCard.link,
                },
                "#popupImage"
              );
              imagePopup.open();
            }
          },
        },
        "#cardTemplate"
      );
      console.log(card);

      addInitialCards.addItem(card.generateCard());
      popupAddCard.close();
    },
  }
);

popupAddCard.setEventListeners();

openPopupButtonForm.addEventListener("click", () => {
  popupAddCard.open();
});

export { formValidator };
