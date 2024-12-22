import '../pages/index.css';
import { initialCards } from './cards.js';
import { enableValidation, clearValidation } from './validate.js';
import { createCard, handleCardDelete, handleCardLike } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { getProfileInfo, getInitialCards, patchProfileInfo, postCard, patchAvatar } from './api.js';

// Копируем шаблон карточки 
const placesList = document.querySelector('.places__list'); 
 
// Вызываем функцию для рендеринга карточек 
//renderCards(initialCards); 
 
// Переменные для модальных окон 
const editPopup = document.querySelector('.popup_type_edit');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const newCardPopup = document.querySelector('.popup_type_new-card'); 
const imagePopup = document.querySelector('.popup_type_image'); 
const closeButtons = document.querySelectorAll('.popup__close');  

const titleInput = document.querySelector('.popup__input_type_card-name');
const imageInput = document.querySelector('.popup__input_type_url'); // =avatarInput

const avatarInput = document.querySelector('.popup__input_type_url-avatar');

const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
// Получаем значения из профиля
const profileAvatar = document.querySelector('.profile__image');
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

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',   // мой класс
    errorClass: 'form__input-error_active'      // тоже мой класс 
};
  
enableValidation(settings);                   // включаю валидацию
  
Promise.all([getProfileInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        profileAvatar.style = `background-image: url('${userInfo.avatar}')`;
        renderCards(cards, userInfo);
    })
    .catch((err) => {
        console.log(`Ошибка ${err}`);
    })

// Функция для отображения всех карточек 
function renderCards(cards, userInfo) {                                                                        // Передаю в функцию массив, который надо вывести 
    cards.forEach(card => { 
        const cardElement = createCard(card, userInfo, handleCardDelete, handleCardLike, openImagePopup);    // Создаем карточку 
        placesList.append(cardElement);                                                           // Добавляем карточку в список 
    }); 
  }


// Открытие модального окна редактирования профиля  
document.querySelector('.profile__edit-button').addEventListener('click', () => { 
    // Заполняем поля ввода значениями из профиля
    nameInput.value = profileTitle.textContent;  
    descriptionInput.value = profileDescription.textContent;  
    clearValidation(editPopup);       // очищаем ошибки валидации формы и делаем кнопку неактивной 
    openPopup(editPopup);  
});

// Находим форму в DOM
const profileFormElement = editPopup.querySelector('.popup__form');  

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {  
    evt.preventDefault(); // Отменяем стандартную отправку формы.
    renderLoading(evt, 'Сохранение...');
    clearValidation(editPopup);
    // Получаем значение полей jobInput и nameInput из свойства value
    const newName = nameInput.value;  
    const newJob = descriptionInput.value;

    // Обновляем информацию о профиле через API
    patchProfileInfo(newName, newJob)
        .then((userInfo) => {
            profileTitle.textContent = userInfo.name;   
            profileDescription.textContent = userInfo.about;   
            closePopup(editPopup); 
        })
        .catch((err) => {
            console.log(`Ошибка при обновлении информации о пользователе: ${err.status}`); 
        })
        .finally(() => {
            renderLoading(evt, 'Сохранить');
        });
}

// Прикрепляем обработчик к форме
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

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

// Открытие модального окна редактирования аватара профиля
profileAvatar.addEventListener('click', () => {
    avatarInput.value = getComputedStyle(profileAvatar).backgroundImage.slice(5, -2);
    openPopup(editAvatarPopup);
    clearValidation(editAvatarPopup);
    
});

// Находим форму добавления аватара в DOM
const newAvatarElement = editAvatarPopup.querySelector('.popup__form');

// Обработчик «отправки» формы добавления аватара
function handleNewAvatarFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(evt, 'Сохранение...');
    clearValidation(editAvatarPopup);

    const newAvatar = avatarInput.value;
    console.log('Новый аватар:', newAvatar);

    // Обновляем информацию об аватаре через API
    patchAvatar(newAvatar)
    .then((userInfo) => {
        closePopup(editAvatarPopup);
        profileAvatar.style = `background-image: url('${userInfo.avatar}')`;
    })
    .catch((err) => {
        console.log(`Ошибка при обновлении аватара пользователя: ${err.status}`); 
    })
    .finally(() => {
        renderLoading(evt, 'Сохранить');
    });
}
// Прикрепляем обработчик к форме
newAvatarElement.addEventListener('submit',  handleNewAvatarFormSubmit);

// Открытие модального окна добавления новой карточки 
document.querySelector('.profile__add-button').addEventListener('click', () => {   
    clearValidation(newCardPopup);
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
    renderLoading(evt, 'Создание...');
    clearValidation(newCardPopup);

    const cardData = {
        name: titleInput.value,
        link: imageInput.value
    };

    postCard(cardData.name, cardData.link)
        .then((newCard) => {
            closePopup(newCardPopup);
            //renderCards([newCard], userInfo);
            const cardElement = createCard(newCard, userInfo, handleCardDelete, handleCardLike, openImagePopup);
            placesList.prepend(cardElement);
            console.log(newCard.link);
        })
        .catch((err) => {
            console.log(`Ошибка при добавлении новой карточки: ${err.status}`); 
        })
        .finally(() => {
            renderLoading(evt, 'Создать');
        });
}

// Прикрепляем обработчик к форме добавления карточки
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

// Отрисовка состояния загрузки
function renderLoading(evt, text) {
    const btn = evt.target.querySelector('.popup__button');
    btn.textContent = text;
  }