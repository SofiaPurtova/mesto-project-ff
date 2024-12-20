


/*
// Получаем элементы формы и кнопки
const editProfileForm = document.querySelector('.popup_type_edit');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const submitButton = editProfileForm.querySelector('.popup__button');
const nameError = document.createElement('p');
// nameError.classList.add('name__input-error');
const descriptionError = document.createElement('p');
// descriptionError.classList.add('description__input-error');

// Добавляем текст ошибки ниже каждого поля

descriptionError.className = 'error-message';

descriptionInput.parentNode.insertBefore(descriptionError, descriptionInput.nextSibling);

// Регулярные выражения для валидации
const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]{2,40}$/;
const descriptionRegex = /^[A-Za-zА-Яа-яЁё\s\-]{2,200}$/;

function validateForm() {
    // Очистить предыдущие ошибки
    nameError.textContent = '';
    descriptionError.textContent = '';
    let valid = true;

    // Валидация имени
    if (!nameRegex.test(nameInput.value)) {
        nameError.textContent = 'Имя должно содержать от 2 до 40 символов и допускаются только буквы, дефисы и пробелы.';
        valid = false;
        nameError.className = 'error-message';
        nameInput.parentNode.insertBefore(nameError, nameInput.nextSibling);
    }

    // Валидация описания
    if (!descriptionRegex.test(descriptionInput.value)) {
        descriptionError.textContent = 'Описание должно содержать от 2 до 200 символов и допускаются только буквы, дефисы и пробелы.';
        valid = false;
    }

    // Установить состояние кнопки "Сохранить"
    submitButton.disabled = !valid;
}

editProfileForm.addEventListener('input', validateForm);

// Сброс ошибок при закрытии модального окна
function clearValidationErrors() {
    nameError.textContent = '';
    descriptionError.textContent = '';
    submitButton.disabled = true; // Деактивировать по умолчанию
}

document.querySelector('.popup_type_edit .popup__close').addEventListener('click', clearValidationErrors);

// Опционально, можно вызвать эту функцию при открытии окна
export function openEditProfilePopup() {
    clearValidationErrors();
    //nameInput.value = 'Жак-Ив Кусто'; // Пример валидных данных
    //descriptionInput.value = 'Исследователь океана'; // Пример валидных данных
    validateForm(); // Перепроверяем валидность при открытии
}*/

const cfg = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};


const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(cfg.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(cfg.errorClass);
}

const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(cfg.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(cfg.errorClass);
}

const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    console.log(inputElement.validationMessage);
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }
}

const checkInputValidity = (formElement, inputElement) => {
    isValid(formElement, inputElement);
    /*if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }*/
}

function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
    const buttonElement = formElement.querySelector(cfg.submitButtonSelector);
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement);
      });
    });
}

export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(cfg.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
      //setEventListeners(formElement);
    });
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(cfg.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(cfg.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  } 
}

export const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
    const buttonElement = formElement.querySelector(cfg.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement);
    });

    toggleButtonState(inputList, buttonElement);
}