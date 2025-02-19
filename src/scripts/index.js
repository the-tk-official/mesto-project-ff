import '../pages/index.css';
import {createCard, deleteCard, likeCard} from '../components/card.js';
import {initialCards} from './cards.js';
import {addEventListenersToModal, closeModal, openModal} from '../components/modal.js';

const cardsContainer = document.querySelector('.places__list');

const profile = document.querySelector('.profile');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileDescription = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileTitle = profile.querySelector('.profile__title');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const forms = document.forms;
/** @type HTMLFormElement */
const formEditProfile = forms['edit-profile'];
/** @type HTMLFormElement */
const formNewPlace = forms['new-place'];

initialCards.forEach(cardData => {
    const card = createCard(cardData, deleteCard, likeCard, openModalTypeImage);
    cardsContainer.append(card);
});

profileAddButton.addEventListener('click', openModal.bind(null, popupTypeNewCard));
profileEditButton.addEventListener('click', () => {
    formEditProfile.elements['name'].value = profileTitle.textContent;
    formEditProfile.elements['description'].value = profileDescription.textContent;
    openModal(popupTypeEdit);
});

addEventListenersToModal(popupTypeEdit);
addEventListenersToModal(popupTypeImage);
addEventListenersToModal(popupTypeNewCard);

/**
 * @description Обрабатывает отправку формы редактирования профиля
 * @param event { Event } - Событие отправки формы
 * @return { void } - Ничего не возвращает
 */
function handleEditProfileFormSubmit(event) {
    event.preventDefault();

    profileTitle.textContent = formEditProfile.elements['name'].value;
    profileDescription.textContent = formEditProfile.elements['description'].value;

    closeModal(popupTypeEdit);
}

/**
 * @description Открывает модальное окно с изображением и подписью
 * @param link { string } - Ссылка на изображение
 * @param name { string } - Название изображения
 * @return { void } - Ничего не возвращает
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
