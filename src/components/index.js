// @todo: Темплейт карточки +

// @todo: DOM узлы +

// @todo: Функция создания карточки +

// @todo: Функция удаления карточки +

// @todo: Вывести карточки на страницу +

import '../pages/index.css';
import { initialCards } from './cards.js'
import { createCard, handleCardDelete, handleCardLike } from './card.js'
import { openPopup, closePopup } from './modal.js'

// Копируем шаблон карточки 
export const cardTemplate = document.querySelector('#card-template').content; 
export const placesList = document.querySelector('.places__list'); 
 
// Функция для отображения всех карточек 
function renderCards(cards) {                                        // Передаю в функцию массив, который надо вывести 
    cards.forEach(card => { 
        const cardElement = createCard(card, handleCardDelete, handleCardLike, openImagePopup);    // Создаем карточку 
        placesList.append(cardElement);                           // Добавляем карточку в список 
    }); 
  }

// Вызываем функцию для рендеринга карточек 
renderCards(initialCards); 
 
// Переменные для модальных окон 
export const editPopup = document.querySelector('.popup_type_edit'); 
export const newCardPopup = document.querySelector('.popup_type_new-card'); 
export const imagePopup = document.querySelector('.popup_type_image'); 
export const closeButtons = document.querySelectorAll('.popup__close');  
 

 
// Открытие модального окна редактирования профиля  
document.querySelector('.profile__edit-button').addEventListener('click', () => {  
    const nameInput = editPopup.querySelector('.popup__input_type_name');  
    const descriptionInput = editPopup.querySelector('.popup__input_type_description');  

    // Получаем значения из профиля
    const profileTitle = document.querySelector('.profile__title').textContent;  
    const profileDescription = document.querySelector('.profile__description').textContent;  

    // Заполняем поля ввода значениями из профиля
    nameInput.value = profileTitle;  
    descriptionInput.value = profileDescription;  

    openPopup(editPopup);  
});

// Находим форму в DOM
const formElement = editPopup.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = editPopup.querySelector('.popup__input_type_name');  
const jobInput = editPopup.querySelector('.popup__input_type_description');  

// Обработчик «отправки» формы
function handleFormSubmit(evt) {  
    evt.preventDefault(); // Отменяем стандартную отправку формы.

    // Получаем значение полей jobInput и nameInput из свойства value
    const newName = nameInput.value;  
    const newJob = jobInput.value;

    // Выбираем элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');  
    const profileDescription = document.querySelector('.profile__description');  

    // Вставляем новые значения с помощью textContent
    profileTitle.textContent = newName;  
    profileDescription.textContent = newJob;  

    closePopup(editPopup); // Закрываем попап после сохранения изменений
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);
 
// Открытие модального окна добавления новой карточки
document.querySelector('.profile__add-button').addEventListener('click', () => {  
    openPopup(newCardPopup);  
});

// Функция для открытия попапа с изображением 
export function openImagePopup(link, name) {  
    const popupImage = imagePopup.querySelector('.popup__image');  
    const popupCaption = imagePopup.querySelector('.popup__caption');  
 
    popupImage.src = link;  
    popupImage.alt = name;  
    popupCaption.textContent = name;  
 
    openPopup(imagePopup);  
}

// Закрытие модальных окон 
closeButtons.forEach(button => { 
    button.addEventListener('click', () => { 
        const popup = button.closest('.popup'); 
        closePopup(popup); 
    }); 
});



// Открытие модального окна добавления новой карточки 
document.querySelector('.profile__add-button').addEventListener('click', () => {   
    openPopup(newCardPopup);   
    // Обнуляем поля формы, если вы хотите начать с чистого листа 
    newCardPopup.querySelector('.popup__input_type_card-name').value = '';
    newCardPopup.querySelector('.popup__input_type_url').value = '';
});  

// Находим форму добавления карточки в DOM 
const newCardFormElement = newCardPopup.querySelector('.popup__form'); 

// Обработчик «отправки» формы добавления карточки 
function handleNewCardFormSubmit(evt) {   
    evt.preventDefault(); // Отменяем стандартную отправку формы. 
    
    // Получаем значения из полей ввода (например, заголовок и описание карточки)
    const titleInput = newCardPopup.querySelector('.popup__input_type_card-name');
    const imageInput = newCardPopup.querySelector('.popup__input_type_url'); // предположим, что это поле для ссылки на изображение

    const cardData = {
        name: titleInput.value,
        link: imageInput.value
    };

    // Создаем новую карточку
    const newCard = createCard(cardData, handleCardDelete, handleCardLike, openImagePopup);

    // Добавляем карточку на страницу
    const cardsContainer = document.querySelector('.places__list'); // Контейнер для карточек
    cardsContainer.append(newCard); // Или append, в зависимости от желаемого поведения

    closePopup(newCardPopup); // Закрываем попап после добавления карточки

    // Сбрасываем поля ввода
    titleInput.value = '';
    imageInput.value = '';
}

// Прикрепляем обработчик к форме добавления карточки
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

