const showError = (formElement, inputElement, errorMessage, cfg) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(cfg.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(cfg.errorClass);
}

const hideError = (formElement, inputElement, cfg) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(cfg.inputErrorClass);
    errorElement.textContent = " ";
    errorElement.classList.remove(cfg.errorClass);
    inputElement.setCustomValidity("");
}

const isValid = (formElement, inputElement, cfg) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    console.log(inputElement.validationMessage);
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, cfg);
    } else {
        hideError(formElement, inputElement, cfg);
    }
}

const checkInputValidity = (formElement, inputElement, cfg) => {
    isValid(formElement, inputElement, cfg);s
}

function setEventListeners (formElement, cfg) {
    const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
    const buttonElement = formElement.querySelector(cfg.submitButtonSelector);
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement,  cfg);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, cfg);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement, cfg);
      });
    });
}

export const enableValidation = (cfg) => {
    const formList = Array.from(document.querySelectorAll(cfg.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, cfg);
        });
      //setEventListeners(formElement);
    });
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement, cfg) {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(cfg.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(cfg.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  } 
}

export const clearValidation = (formElement, cfg) => {
    const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
    const buttonElement = formElement.querySelector(cfg.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement, cfg);
    });

    toggleButtonState(inputList, buttonElement, cfg);
}