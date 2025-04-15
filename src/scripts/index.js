import '../pages/index.css';
import {createCard, deleteCard, likeCard} from '../components/card.js';
import {initialCards} from './cards.js';
import {addEventListenersToModal, closeModal, openModal} from '../components/modal.js';
import {clearValidation, enableValidation} from "../components/validation";

const cardsContainer = document.querySelector('.places__list');

const profile = document.querySelector('.profile');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileDescription = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileTitle = profile.querySelector('.profile__title');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const formList = document.forms;
/** @type HTMLFormElement */
const formEditProfile = formList['edit-profile'];
/** @type HTMLFormElement */
const formNewPlace = formList['new-place'];

initialCards.forEach(cardData => {
    const card = createCard(cardData, deleteCard, likeCard, openModalTypeImage);
    cardsContainer.append(card);
});

profileAddButton.addEventListener('click', () => {
    clearValidation(formNewPlace, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorMessageClass: 'popup__input-error_visible'
    });
    openModal(popupTypeNewCard);
});
profileEditButton.addEventListener('click', () => {
    formEditProfile.elements['name'].value = profileTitle.textContent;
    formEditProfile.elements['description'].value = profileDescription.textContent;
    clearValidation(formEditProfile, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorMessageClass: 'popup__input-error_visible'
    });
    openModal(popupTypeEdit);
});

addEventListenersToModal(popupTypeEdit);
addEventListenersToModal(popupTypeImage);
addEventListenersToModal(popupTypeNewCard);

/**
 * @description Обрабатывает отправку формы редактирования профиля.
 * Обновляет данные профиля на основе введённых значений и закрывает модальное окно.
 * @param {Event} event - Событие отправки формы.
 * @returns {void} - Функция ничего не возвращает.
 */
function handleEditProfileFormSubmit(event) {
    event.preventDefault();

    profileTitle.textContent = formEditProfile.elements['name'].value;
    profileDescription.textContent = formEditProfile.elements['description'].value;

    closeModal(popupTypeEdit);
}

/**
 * @description Открывает модальное окно с изображением и подписью.
 * Устанавливает текст подписи, атрибуты `alt` и `src` для изображения,
 * а затем открывает модальное окно.
 * @param {string} link - Ссылка на изображение.
 * @param {string} name - Название изображения, используемое как подпись и значение атрибута `alt`.
 * @returns {void} - Функция ничего не возвращает.
 */
function openModalTypeImage(link, name) {
    const popupCaption = popupTypeImage.querySelector('.popup__caption');
    popupCaption.textContent = name;

    const popupImage = popupTypeImage.querySelector('.popup__image');
    popupImage.alt = name;
    popupImage.src = link;

    openModal(popupTypeImage);
}

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formNewPlace.addEventListener('submit', event => {
    event.preventDefault();

    const cardData = {
        link: formNewPlace.elements['link'].value,
        name: formNewPlace.elements['place-name'].value
    };
    const card = createCard(cardData, deleteCard, likeCard, openModalTypeImage);
    cardsContainer.prepend(card);

    formNewPlace.reset();
    closeModal(popupTypeNewCard);
});

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorMessageClass: 'popup__input-error_visible'
});
