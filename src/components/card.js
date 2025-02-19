const cardTemplate = document.querySelector('#card-template').content;

/**
 * @description Создаёт карточку с заданными данными и добавляет обработчики событий
 * @param cardData { Object } - Данные для заполнения карточки
 * @param deleteCard { Function } - Функция для удаления карточки
 * @param likeCard { Function } - Функция для обработки лайка карточки
 * @param openModalTypeImage { function } - Функция для открытия модального окна с изображением
 * @return { Node } - Возвращает созданную каточку
 */
export function createCard(cardData, deleteCard, likeCard, openModalTypeImage) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => deleteCard(card));

    const cardImage = card.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardImage.addEventListener('click', openModalTypeImage.bind(null, cardData.link, cardData.name))


    const cardLikeButton = card.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));

    const cardTitle = card.querySelector('.card__title');
    cardTitle.textContent = cardData.name;

    return card;
}

/**
 * @description Функция удаления карточки
 * @param card { HTMLLIElement } - Удаляемая карта
 * @return { void } - Ничего не возвращает
 */
export function deleteCard(card) {
    card.remove();
}

/**
 * @description Обрабатывает нажатие на кнопку лайка, переключая её состояние
 * @param button { HTMLButtonElement } - Кнопка лайка
 * @return { void } - Ничего не возвращает
 */
export function likeCard(button) {
    button.classList.toggle('card__like-button_is-active')
}
