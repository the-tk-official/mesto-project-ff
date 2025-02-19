/**
 * @description Обрабатывает нажатие клавиши 'Escape' для закрытия любого открытого модального окна
 * @param event { KeyboardEvent } - Событие клавиатуры
 * @return { void } - Ничего не возвращает
 */
function handleEscKeyDown(event) {
    if (event.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        closeModal(openedModal);
    }
}

/**
 * @description Открывает модальное окно
 * @param modal { HTMLDivElement } - Модальное окно
 * @return { void } - Ничего не возвращает
 */
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyDown);
}

/**
 * @description Закрывает модальное окно
 * @param modal { HTMLDivElement } - Модальное окно
 * @return { void } - Ничего не возвращает
 */
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKeyDown);
}

/**
 * @description Добавляет обработчики событий для модального окна
 * @param modal { HTMLDivElement } - Модальное окно
 * @return { void } - Ничего не возвращает
 */
export function addEventListenersToModal(modal) {
    const closeButton = modal.querySelector('.popup__close');
    closeButton.addEventListener('click', closeModal.bind(null, modal));

    modal.addEventListener('mousedown', event => {
        if (event.target.classList.contains('popup')) {
            closeModal(modal);
        }
    });
}
