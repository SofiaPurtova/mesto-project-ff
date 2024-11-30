// Функция для открытия модального окна 
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscapeClose);
}
 
// Функция для закрытия модального окна 
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscapeClose);  
}

// Обработчик события клавиши Esc 
function handleEscapeClose(event) { 
    if (event.key === 'Escape') { 
        const openedPopup = document.querySelector('.popup_is-opened'); 
        if (openedPopup) { 
            closePopup(openedPopup); 
        } 
    } 
}