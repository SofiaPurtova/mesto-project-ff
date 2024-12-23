import { deleteCard, putLike, deleteLike } from './api.js';

const likeCount = (cardLikeCount, likes) => {
  cardLikeCount.textContent = likes.length
}

const cardTemplate = document.querySelector('#card-template').content; 

// Функция для создания карточки 
export function createCard(cardData, userInfo, onCardDelete, onCardLike, onLargeImage) { 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);                                           // Клонируем шаблон карточки 

  // Устанавливаем значения имени и ссылки на изображение 
  const cardImage = cardElement.querySelector('.card__image'); 
  const cardTitle = cardElement.querySelector('.card__title'); 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.button-like-count');

  cardImage.src = cardData.link;                                                       // Устанавливаем источник изображения 
  cardImage.alt = cardData.name;                                                      // Устанавливаем альт-текст 
  cardTitle.textContent = cardData.name;                                             // Устанавливаем название 
  cardLikeCount.textContent = cardData.likes.length; // likeCount(cardLikeCount, cardData.likes);

  // Устанавливаем состояние кнопки лайка
  if (cardData.likes.some(like => like._id === userInfo._id)) {
    likeButton.classList.add('card__like-button_is-active'); // Если пользователь уже лайкнул, добавляем класс
  }

  // Добавляем обработчик клика для удаления карточки 
  //deleteButton.addEventListener('click', handleCardDelete);
  if (cardData.owner._id === userInfo._id) {
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', (event) => { 
      onCardDelete(event, cardData._id);
    });
  } else {
    deleteButton.style.display = 'none';
  }                    
  
  // Добавляем обработчик клика для лайка
  likeButton.addEventListener('click', (event) => { 
    onCardLike(event, cardData._id, cardData.likes, cardElement);
  });
  
  // Добавляем обработчик клика по изображению
  cardImage.addEventListener('click', () => {
    onLargeImage(cardData.link, cardData.name); // Открываем попап с изображением
  });
  

  return cardElement; // Возвращаем готовый элемент карточки 
}

// Функция для удаления карточки 
export function handleCardDelete(event, cardId) { 
  const cardElement = event.target.closest('.places__item');              // Находим ближайший элемент карточки 
  if (cardElement) {
    deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });     
  } 
}

// Функция для лайка карточки 
export function handleCardLike(event, cardId, likes, card) {
    const likeButton = event.target; 
    const isLiked = likeButton.classList.contains("card__like-button_is-active"); 
  
    let request; 
    if (!isLiked) {
      request = putLike(cardId);
    } else {
      request = deleteLike(cardId);
    }
  
    request
    .then((updatedCardData) => {
      const cardLikeCount = card.querySelector('.button-like-count');
      cardLikeCount.textContent = updatedCardData.likes.length;
      likes = updatedCardData.likes;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error(err));
}

 