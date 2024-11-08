// @todo: Темплейт карточки +

// @todo: DOM узлы +

// @todo: Функция создания карточки +

// @todo: Функция удаления карточки +

// @todo: Вывести карточки на страницу +

// Копируем шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// Функция для создания карточки
function createCard(cardData, onCardDelete) {
    const cardElement = cardTemplate.cloneNode(true);                                           // Клонируем шаблон карточки

    // Устанавливаем значения имени и ссылки на изображение
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;                                                       // Устанавливаем источник изображения
    cardImage.alt = cardData.name;                                                      // Устанавливаем альт-текст
    cardTitle.textContent = cardData.name;                                             // Устанавливаем название

    // Добавляем обработчик клика для удаления карточки
    //deleteButton.addEventListener('click', handleCardDelete);                     // - тоже работает..
    deleteButton.addEventListener('click', (event) => { onCardDelete (event)});

    return cardElement; // Возвращаем готовый элемент карточки
}

// Функция для удаления карточки
function handleCardDelete(event) {
    const cardElement = event.target.closest('.places__item');              // Находим ближайший элемент карточки
    if (cardElement) {
        cardElement.remove();
    }
}

// Функция для отображения всех карточек
function renderCards(cards) {                                        // Передаю в функцию массив, который надо вывести
    cards.forEach(card => {
        const cardElement = createCard(card, handleCardDelete);    // Создаем карточку
        placesList.append(cardElement);                           // Добавляем карточку в список
    });
}

// Вызываем функцию для рендеринга карточек
renderCards(initialCards);