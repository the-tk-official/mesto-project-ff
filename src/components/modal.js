/**
 * @description Обрабатывает нажатие клавиши 'Escape' для закрытия открытого модального окна.
 * Если на странице есть модальное окно с классом 'popup_is-opened', оно будет закрыто.
 * @param {KeyboardEvent} event - Событие клавиатуры.
 * @returns {void} - Функция ничего не возвращает.
 */
function handleEscKeyDown(event) {
    if (event.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        closeModal(openedModal);
    }
}

/**
 * @description Открывает модальное окно, добавляя ему CSS-класс для отображения
 * и устанавливает обработчик нажатия клавиши 'Escape' для его закрытия.
 * @param {HTMLDivElement} modal - Модальное окно, которое нужно открыть.
 * @returns {void} - Функция ничего не возвращает.
 */
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyDown);
}

/**
 * @description Закрывает модальное окно, удаляя CSS-класс, отвечающий за его отображение,
 * и снимает обработчик нажатия клавиши 'Escape'.
 * @param {HTMLDivElement} modal - Модальное окно, которое нужно закрыть.
 * @returns {void} - Функция ничего не возвращает.
 */
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKeyDown);
}

/**
 * @description Добавляет обработчики событий для модального окна.
 * Обработчики включают:
 * - Закрытие модального окна при клике на кнопку закрытия.
 * - Закрытие модального окна при клике на область вне содержимого окна.
 * @param {HTMLDivElement} modal - Модальное окно, для которого нужно добавить обработчики.
 * @returns {void} - Функция ничего не возвращает.
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
