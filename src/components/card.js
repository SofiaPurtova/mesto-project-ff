const cardTemplate = document.querySelector('#card-template').content; 

// Функция для создания карточки 
export function createCard(cardData, onCardDelete, onCardLike, onLargeImage) { 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);                                           // Клонируем шаблон карточки 

  // Устанавливаем значения имени и ссылки на изображение 
  const cardImage = cardElement.querySelector('.card__image'); 
  const cardTitle = cardElement.querySelector('.card__title'); 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button'); 

  cardImage.src = cardData.link;                                                       // Устанавливаем источник изображения 
  cardImage.alt = cardData.name;                                                      // Устанавливаем альт-текст 
  cardTitle.textContent = cardData.name;                                             // Устанавливаем название 

  // Добавляем обработчик клика для удаления карточки 
  //deleteButton.addEventListener('click', handleCardDelete);                     // - тоже работает.. 
  deleteButton.addEventListener('click', (event) => { onCardDelete (event)});

  // Добавляем обработчик клика для лайка
  likeButton.addEventListener('click', (event) => { onCardLike(event);});
  
  // Добавляем обработчик клика по изображению
  cardImage.addEventListener('click', () => {
    onLargeImage(cardData.link, cardData.name); // Открываем попап с изображением
  });

  return cardElement; // Возвращаем готовый элемент карточки 
}

// Функция для удаления карточки 
export function handleCardDelete(event) { 
  const cardElement = event.target.closest('.places__item');              // Находим ближайший элемент карточки 
  if (cardElement) { 
      cardElement.remove(); 
  } 
}

// Функция для лайка карточки 
export function handleCardLike(event) {
  const likeButton = event.target; // Получаем элемент, на который нажали
  likeButton.classList.toggle('card__like-button_is-active'); // Переключаем класс активности
}

 