import '../pages/index.css';

import { createCardElement, handleLikeCard } from '../components/card';
import {
  addEventListenersToModal,
  closeModal,
  openModal,
} from '../components/modal';
import { clearValidation, enableValidation } from '../components/validation';
import {
  addCard,
  deleteCard,
  getCards,
  getProfile,
  updateAvatar,
  updateProfile,
} from '../components/api';

let cardForDelete;
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorMessageClass: 'popup__input-error-message_visible',
};
let userId;

const cardsContainer = document.querySelector('.places__list');

const formList = document.forms;
const formDeleteCard = formList['delete-card'];
const formEditAvatar = formList['edit-avatar'];
const formEditProfile = formList['edit-profile'];
const formNewCard = formList['new-place'];

const profile = document.querySelector('.profile');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileDescription = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileImage = profile.querySelector('.profile__image');
const profileTitle = profile.querySelector('.profile__title');

const popupTypeDeleteCard = document.querySelector('.popup_type_delete-card');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupImagePreview = popupTypeImage.querySelector('.popup__image');

profileAddButton.addEventListener('click', () => {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openModal(popupTypeNewCard);
});

profileEditButton.addEventListener('click', () => {
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupTypeEditProfile);
});

profileImage.addEventListener('click', () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupTypeEditAvatar);
});

addEventListenersToModal(popupTypeDeleteCard);
addEventListenersToModal(popupTypeEditAvatar);
addEventListenersToModal(popupTypeEditProfile);
addEventListenersToModal(popupTypeImage);
addEventListenersToModal(popupTypeNewCard);

enableValidation(validationConfig);

const handleDeleteCard = (cardId, cardElement) => {
  cardForDelete = { cardId, cardElement };
  openModal(popupTypeDeleteCard);
};

const handlePreviewCard = ({ name, link }) => {
  popupImageCaption.textContent = name;
  popupImagePreview.alt = name;
  popupImagePreview.src = link;

  openModal(popupTypeImage);
};

formDeleteCard.addEventListener('submit', evt => {
  evt.preventDefault();

  const button = formDeleteCard.querySelector(
    validationConfig.submitButtonSelector,
  );
  button.textContent = 'Удаление...';

  if (!cardForDelete) {
    closeModal(popupTypeDeleteCard);
    return;
  }

  deleteCard(cardForDelete.cardId)
    .then(() => {
      cardForDelete.cardElement.remove();
      cardForDelete = null;
      closeModal(popupTypeDeleteCard);
    })
    .catch(err => console.error(err))
    .finally(() => {
      button.textContent = 'Да';
    });
});

formEditAvatar.addEventListener('submit', evt => {
  evt.preventDefault();

  const button = formEditAvatar.querySelector(
    validationConfig.submitButtonSelector,
  );
  button.textContent = 'Сохранение...';

  updateAvatar(formEditAvatar.elements.avatar.value)
    .then(userData => {
      profileImage.src = userData.avatar;
      closeModal(popupTypeEditAvatar);
    })
    .catch(err => console.error(err))
    .finally(() => {
      button.textContent = 'Сохранить';
    });
});

formEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();

  const button = formEditProfile.querySelector(
    validationConfig.submitButtonSelector,
  );
  button.textContent = 'Сохранение...';

  updateProfile({
    name: formEditProfile.elements.name.value,
    about: formEditProfile.elements.description.value,
  })
    .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.alt = userData.name;
      closeModal(popupTypeEditProfile);
    })
    .catch(err => console.log(err))
    .finally(() => {
      button.textContent = 'Сохранить';
    });
});

formNewCard.addEventListener('submit', evt => {
  evt.preventDefault();

  const button = formNewCard.querySelector(
    validationConfig.submitButtonSelector,
  );
  button.textContent = 'Создание...';

  addCard({
    name: formNewCard.elements['place-name'].value,
    link: formNewCard.elements.link.value,
  })
    .then(cardData => {
      const cardElement = createCardElement(
        cardData,
        {
          handleDeleteCard,
          handleLikeCard,
          handlePreviewCard,
        },
        userId,
      );
      cardsContainer.prepend(cardElement);
      closeModal(popupTypeNewCard);
    })
    .catch(err => console.log(err))
    .finally(() => {
      button.textContent = 'Создать';
    });
});

Promise.all([getCards(), getProfile()])
  .then(([cardsData, userData]) => {
    userId = userData['_id'];

    cardsData.forEach(cardData => {
      const cardElement = createCardElement(
        cardData,
        {
          handleDeleteCard,
          handleLikeCard,
          handlePreviewCard,
        },
        userId,
      );
      cardsContainer.append(cardElement);
    });

    profileDescription.textContent = userData['about'];
    profileImage.alt = userData['name'];
    profileImage.src = userData['avatar'];
    profileTitle.textContent = userData['name'];
  })
  .catch(err => console.log(err));
