const handleEscKeyDown = evt => {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
};

export const openModal = modal => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyDown);
};

export const closeModal = modal => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyDown);
};

export const addEventListenersToModal = modal => {
  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', closeModal.bind(null, modal));

  modal.addEventListener('mousedown', event => {
    if (event.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
};
