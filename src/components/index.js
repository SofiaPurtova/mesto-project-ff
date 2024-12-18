import '../pages/index.css';
import { initialCards } from './cards.js'
import { createCard, handleCardDelete, handleCardLike } from './card.js'
import { openPopup, closePopup } from './modal.js'

// Копируем шаблон карточки 
const placesList = document.querySelector('.places__list'); 
 
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
const editPopup = document.querySelector('.popup_type_edit'); 
const newCardPopup = document.querySelector('.popup_type_new-card'); 
const imagePopup = document.querySelector('.popup_type_image'); 
const closeButtons = document.querySelectorAll('.popup__close');  

const titleInput = document.querySelector('.popup__input_type_card-name');
const imageInput = document.querySelector('.popup__input_type_url');
 
const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
// Получаем значения из профиля
const profileTitle = document.querySelector('.profile__title');  
const profileDescription = document.querySelector('.profile__description');


// Получаем все попапы 
const popups = document.querySelectorAll('.popup'); 

// Добавляем класс 'popup_is-animated' ко всем попапам 
popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

// Добавляем обработчик клика по оверлею
popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup")) {
            closePopup(popup);
        }
    });
}); 

 
// Открытие модального окна редактирования профиля  
document.querySelector('.profile__edit-button').addEventListener('click', () => { 

    // Заполняем поля ввода значениями из профиля
    nameInput.value = profileTitle.textContent;  
    descriptionInput.value = profileDescription.textContent;  

    openPopup(editPopup);  
});

// Находим форму в DOM
const profileFormElement = editPopup.querySelector('.popup__form');  

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {  
    evt.preventDefault(); // Отменяем стандартную отправку формы.

    // Получаем значение полей jobInput и nameInput из свойства value
    const newName = nameInput.value;  
    const newJob = descriptionInput.value;

    // Вставляем новые значения с помощью textContent
    profileTitle.textContent = newName;  
    profileDescription.textContent = newJob;  

    closePopup(editPopup); // Закрываем попап после сохранения изменений
}

// Прикрепляем обработчик к форме
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
 
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
    // Обнуляем поля формы
    titleInput.value = '';
    imageInput.value = '';
});  

// Находим форму добавления карточки в DOM 
const newCardFormElement = newCardPopup.querySelector('.popup__form'); 

// Обработчик «отправки» формы добавления карточки 
function handleNewCardFormSubmit(evt) {   
    evt.preventDefault(); // Отменяем стандартную отправку формы. 
    
    // Получаем значения из полей ввода (например, заголовок и описание карточки)
    /*const titleInput = newCardPopup.querySelector('.popup__input_type_card-name');
    const imageInput = newCardPopup.querySelector('.popup__input_type_url'); // предположим, что это поле для ссылки на изображение*/

    const cardData = {
        name: titleInput.value,
        link: imageInput.value
    };

    // Создаем новую карточку
    const newCard = createCard(cardData, handleCardDelete, handleCardLike, openImagePopup);

    // Добавляем карточку на страницу
    const cardsContainer = document.querySelector('.places__list'); // Контейнер для карточек
    cardsContainer.prepend(newCard);

    closePopup(newCardPopup); // Закрываем попап после добавления карточки

    // Сбрасываем поля ввода
    titleInput.value = '';
    imageInput.value = '';
}

// Прикрепляем обработчик к форме добавления карточки
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

