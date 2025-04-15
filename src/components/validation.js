/**
 * @description Показывает сообщение об ошибке для указанного поля ввода.
 * @param {HTMLInputElement} inputElement - Поле ввода, для которого нужно отобразить сообщение об ошибке.
 * @param {string} errorMessage - Текст сообщения об ошибке.
 * @param {Object} validationConfig - Объект конфигурации для валидации.
 * @param {string} validationConfig.inputErrorClass - CSS-класс для стилизации невалидных полей ввода.
 * @param {string} validationConfig.errorMessageClass - CSS-класс для отображения сообщений об ошибках.
 * @returns {void} - Функция ничего не возвращает.
 */
function showInputError(inputElement, errorMessage, validationConfig) {
    const inputErrorElement = inputElement.nextElementSibling;

    inputElement.classList.add(validationConfig.inputErrorClass);

    inputErrorElement.textContent = errorMessage;
    inputErrorElement.classList.add(validationConfig.errorMessageClass);
}

/**
 * @description Скрывает сообщение об ошибке для указанного поля ввода.
 * @param {HTMLInputElement} inputElement - Поле ввода, для которого нужно скрыть сообщение об ошибке.
 * @param {Object} validationConfig - Объект конфигурации для валидации.
 * @param {string} validationConfig.inputErrorClass - CSS-класс для стилизации невалидных полей ввода.
 * @param {string} validationConfig.errorMessageClass - CSS-класс для отображения сообщений об ошибках.
 * @returns {void} - Функция ничего не возвращает.
 */
function hideInputError(inputElement, validationConfig) {
    const inputErrorElement = inputElement.nextElementSibling;

    inputElement.classList.remove(validationConfig.inputErrorClass);

    inputErrorElement.textContent = '';
    inputErrorElement.classList.remove(validationConfig.errorMessageClass);
}

/**
 * @description Проверяет валидность поля ввода и отображает или скрывает сообщение об ошибке.
 * @param {HTMLInputElement} inputElement - Поле ввода, которое нужно проверить.
 * @param {Object} validationConfig - Объект конфигурации для валидации.
 * @param {string} validationConfig.inputErrorClass - CSS-класс для стилизации невалидных полей ввода.
 * @param {string} validationConfig.errorMessageClass - CSS-класс для отображения сообщений об ошибках.
 * @returns {void} - Функция ничего не возвращает.
 */
function isValid(inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(inputElement, validationConfig);
    }
}

/**
 * @description Проверяет, есть ли хотя бы одно невалидное поле ввода в списке.
 * @param {HTMLInputElement[]} inputList - Массив полей ввода формы.
 * @returns {boolean} - Возвращает `true`, если хотя бы одно поле невалидно, иначе `false`.
 */
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

/**
 * @description Переключает состояние кнопки отправки формы в зависимости от валидности полей ввода.
 * Если хотя бы одно поле невалидно, кнопка становится неактивной.
 * @param {HTMLInputElement[]} inputList - Массив полей ввода формы.
 * @param {HTMLButtonElement} buttonElement - Кнопка отправки формы.
 * @param {Object} validationConfig - Объект конфигурации для валидации.
 * @param {string} validationConfig.inactiveButtonClass - CSS-класс для отключения кнопки отправки.
 * @returns {void} - Функция ничего не возвращает.
 */
function toggleButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'true');
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

/**
 * @description Устанавливает обработчики событий для полей ввода и кнопки отправки формы.
 * Обеспечивает валидацию полей ввода и управление состоянием кнопки отправки.
 * @param {HTMLFormElement} formElement - Форма, для которой нужно установить обработчики.
 * @param {Object} validationConfig - Объект конфигурации для валидации.
 * @param {string} validationConfig.inputSelector - Селектор полей ввода внутри формы.
 * @param {string} validationConfig.submitButtonSelector - Селектор кнопки отправки формы.
 * @param {string} validationConfig.inactiveButtonClass - CSS-класс для отключения кнопки отправки.
 * @param {string} validationConfig.inputErrorClass - CSS-класс для стилизации невалидных полей ввода.
 * @param {string} validationConfig.errorMessageClass - CSS-класс для отображения сообщений об ошибках.
 * @returns {void} - Функция ничего не возвращает.
 */
function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
           isValid(inputElement, validationConfig);
           toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
}

/**
 * @description Включает валидацию для всех форм на странице.
 * Устанавливает обработчики событий для полей ввода и кнопок отправки форм.
 * @param {Object} validationConfig - Объект конфигурации для валидации.
 * @param {string} validationConfig.formSelector - Селектор форм, для которых нужно включить валидацию.
 * @param {string} validationConfig.inputSelector - Селектор полей ввода внутри форм.
 * @param {string} validationConfig.submitButtonSelector - Селектор кнопок отправки форм.
 * @param {string} validationConfig.inactiveButtonClass - CSS-класс для отключения кнопок отправки.
 * @param {string} validationConfig.inputErrorClass - CSS-класс для стилизации невалидных полей ввода.
 * @param {string} validationConfig.errorMessageClass - CSS-класс для отображения сообщений об ошибках.
 * @returns {void} - Функция ничего не возвращает.
 */
export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach(formElement => {
       setEventListeners(formElement, validationConfig);
    });
}

/**
 * @description Очищает валидацию формы, сбрасывая состояния полей ввода и кнопки отправки.
 * Убирает сообщения об ошибках и отключает кнопку отправки, если это необходимо.
 * @param {HTMLFormElement} formElement - Форма, для которой нужно очистить валидацию.
 * @param {Object} validationConfig - Объект конфигурации для валидации.
 * @param {string} validationConfig.inputSelector - Селектор полей ввода внутри формы.
 * @param {string} validationConfig.submitButtonSelector - Селектор кнопки отправки формы.
 * @param {string} validationConfig.inactiveButtonClass - CSS-класс для отключения кнопки отправки.
 * @param {string} validationConfig.inputErrorClass - CSS-класс для стилизации невалидных полей ввода.
 * @param {string} validationConfig.errorMessageClass - CSS-класс для отображения сообщений об ошибках.
 * @returns {void} - Функция ничего не возвращает.
 */
export function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach(inputElement => {
        hideInputError(inputElement, validationConfig);
    });
}
