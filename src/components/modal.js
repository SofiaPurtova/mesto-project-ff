import { editPopup, newCardPopup, imagePopup, closeButtons } from './index.js'

// Функция для открытия модального окна 
export function openPopup(popup) { 
    popup.style.display = 'block'; 
    popup.style.alignSelf = 'center'; 
    popup.style.justifySelf = 'center'; 
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.addEventListener('keydown', handleEscapeClose); 
 
    // Добавляем обработчик клика на оверлей  
    const overlay = popup.querySelector('.popup__content');  
    overlay.addEventListener('click', (event) => {  
        const isInput = event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA'; // Проверка на поля ввода
        if (!isInput && event.target !== overlay) {  
            closePopup(popup); // Закрываем попап при клике на оверлей, но не на поля ввода  
        }  
    });
}
 
// Функция для закрытия модального окна 
export function closePopup(popup) { 
    popup.classList.add('popup_is-animated');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscapeClose);  
}

/*export function closePopup () { 
    const popups = document.querySelectorAll('.popup');
    popups.forEach (popup => popup.classList.remove('popup_is-opened')); 
}*/

// Обработчик события клавиши Esc 
function handleEscapeClose(event) { 
    if (event.key === 'Escape') { 
        const openedPopup = document.querySelector('.popup_opened'); 
        if (openedPopup) { 
            closePopup(openedPopup); 
        } 
    } 
} 

/*// Закрытие модальных окон по клику вне содержимого 
document.addEventListener('click', (event) => { 
    const isPopup = event.target.closest('.popup_is-opened');
    const isPopupContent = event.target.closest('.popup__content'); 
 
    // Проверка, был ли клик вне содержимого попапа 
    if (!isPopupContent) {
        console.log("Клик по оверлею"); 
        closePopup(isPopup); // Закрываем попап 
    } 
});*/

document.addEventListener ('click', e => {
    if (e.currentTarget.classList.contains('.popup')) {
        e.stopPropagation();
        closePopup();
    }
});