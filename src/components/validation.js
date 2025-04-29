const showInputError = (inputElement, errorMessage, config) => {
  const inputErrorMessageElement = inputElement.nextElementSibling;
  inputErrorMessageElement.textContent = errorMessage;
  inputErrorMessageElement.classList.add(config.inputErrorMessageClass);

  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (inputElement, config) => {
  const inputErrorMessageElement = inputElement.nextElementSibling;
  inputErrorMessageElement.textContent = '';
  inputErrorMessageElement.classList.remove(config.inputErrorMessageClass);

  inputElement.setCustomValidity('');
  inputElement.classList.remove(config.inputErrorClass);
};

const isValid = (inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => setEventListeners(formElement, config));
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
};
