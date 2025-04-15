const cardTemplate = document.querySelector('#card-template').content;

/**
 * @description Создаёт карточку с заданными данными, добавляет обработчики событий для удаления, лайка и открытия изображения.
 * @param {Object} cardData - Объект с данными для карточки.
 * @param {string} cardData.name - Название карточки.
 * @param {string} cardData.link - Ссылка на изображение карточки.
 * @param {Function} deleteCard - Функция для удаления карточки.
 * @param {Function} likeCard - Функция для обработки лайка карточки.
 * @param {Function} openModalTypeImage - Функция для открытия модального окна с изображением.
 * @returns {Node} - Возвращает созданный DOM-элемент карточки.
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
 * @description Удаляет указанную карточку из DOM.
 * @param {HTMLLIElement} card - Карточка, которую необходимо удалить.
 * @returns {void} - Функция ничего не возвращает.
 */
export function deleteCard(card) {
    card.remove();
}

/**
 * @description Обрабатывает нажатие на кнопку лайка, переключая её состояние.
 * Добавляет или удаляет CSS-класс, отвечающий за активное состояние кнопки.
 * @param {HTMLButtonElement} button - Кнопка лайка, на которую было совершено нажатие.
 * @returns {void} - Функция ничего не возвращает.
 */
export function likeCard(button) {
    button.classList.toggle('card__like-button_is-active')
}
