import { toggleCardLike } from './api';

const cardTemplate = document.querySelector('#card-template').content;

export const handleLikeCard = (cardId, cardLikeButton, cardLikeCounter) => {
  const hasLike = cardLikeButton.classList.contains(
    'card__like-button_is-active',
  );

  toggleCardLike(cardId, hasLike)
    .then(cardData => {
      cardLikeButton.classList.toggle('card__like-button_is-active');
      cardLikeCounter.textContent = cardData['likes'].length;
    })
    .catch(err => console.log(err));
};

export const createCardElement = (
  data,
  { handleDeleteCard, handleLikeCard, handlePreviewCard },
  userId,
) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  if (data['owner']['_id'] === userId && handleDeleteCard) {
    cardDeleteButton.addEventListener('click', () => {
      handleDeleteCard(data['_id'], cardElement);
    });
  } else {
    cardDeleteButton.remove();
  }

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.alt = data.name;
  cardImage.src = data.link;
  if (handlePreviewCard) {
    cardImage.addEventListener('click', handlePreviewCard.bind(null, data));
  }

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  if (data['likes'].some(like => like['_id'] === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  } else {
    cardLikeButton.classList.remove('card__like-button_is-active');
  }

  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  cardLikeCounter.textContent = data['likes'].length;

  if (handleLikeCard) {
    cardLikeButton.addEventListener('click', () => {
      handleLikeCard(data['_id'], cardLikeButton, cardLikeCounter);
    });
  }

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = data.name;

  return cardElement;
};
