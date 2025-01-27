const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

/**
 * @description Функция создания карточки
 * @param cardData { Object } - Данные для заполнения карточки
 * @param deleteCard { function } - Функция удаления карточки
 * @return { Node } - Возвращает созданную каточку
 */
function createCard(cardData, deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    const cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', (event) => {
        deleteCard(event.target.parentElement);
    })

    const cardTitle = card.querySelector('.card__title');
    cardTitle.textContent = cardData.name;

    return card;
}

/**
 * @description Функция удаления карточки
 * @param card { Object } - Удаляемая карта
 * @return { void } - Ничего не возвращает
*/
function deleteCard(card) {
    card.remove();
}

initialCards.forEach((cardData) => {
    const card = createCard(cardData, deleteCard);
    cardsContainer.append(card);
})
