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
import { Api } from "../utils/api.js";

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

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "c7f63039-8b71-44db-a92f-c8a344c34746",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__info-title",
  jobSelector: ".profile__info-bio",
});

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.about,
    });
  })
  .catch((err) => console.log(err));

const popupProfile = new PopupWithForm(
  "#popup",
  {
    handleFormSubmit: ({ name, job }) => {
      api
        .updateUserInfo(name, job)
        .then((updateData) => {
          userInfo.setUserInfo({ name, job: updateData.about });
          console.log(name, job);
          popupProfile.close();
        })
        .catch((err) => console.error(err));
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

let cardSection;

api
  .getIncitalCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            {
              title: item.name,
              link: item.link,
              handleDeleteCard: () => {
                api.deleteCard(item._id);
              },
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
          cardSection.addItem(card.generateCard());
        },
      },
      ".gallery"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error(err));

formValidator.enableValidation();

openPopupButtonForm.addEventListener("click", () => {
  popupAddCard.open();
});

const popupAddCard = new PopupWithForm("#popupForm", {
  handleFormSubmit: (data) => {
    api
      .createCard(data.nameAdd, data.linkAdd)
      .then((newCard) => {
        const card = new Card(
          {
            title: newCard.name,
            link: newCard.link,
            handleDeleteCard: () => {
              api.deleteCard(newCard._id);
            },
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

        cardSection.addItem(card.generateCard());
        popupAddCard.close();
      })
      .catch((err) => console.error(err));
  },
});

popupAddCard.setEventListeners();

export { formValidator };
