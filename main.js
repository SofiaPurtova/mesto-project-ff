(()=>{"use strict";var e=".popup__input",t=".popup__button",n="button_inactive",o="form__input_type_error",r="form__input-error_active",c=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o),n.textContent=" ",n.classList.remove(r)};function a(n){var a=Array.from(n.querySelectorAll(e)),u=n.querySelector(t);i(a,u),a.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),console.log(t.validationMessage),t.validity.valid?c(e,t):function(e,t,n){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage)}(e,t)}(n,e),i(a,u)}))}))}var u=function(e){return e.some((function(e){return!e.validity.valid}))};function i(e,t){u(e)?(t.classList.add(n),t.setAttribute("disabled","")):(t.classList.remove(n),t.removeAttribute("disabled",""))}var l=function(n){var o=Array.from(n.querySelectorAll(e)),r=n.querySelector(t);o.forEach((function(e){c(n,e)})),i(o,r)},s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-29",headers:{authorization:"f9e240a7-ecbe-4c3b-ad2a-e207beb70d7e","Content-Type":"application/json"}};function d(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var p=document.querySelector("#card-template").content;function f(e,t,n,o,r){var c=p.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__title"),i=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".button-like-count");return a.src=e.link,a.alt=e.name,u.textContent=e.name,s.textContent=e.likes.length,e.likes.some((function(e){return e._id===t._id}))&&l.classList.add("card__like-button_is-active"),e.owner._id===t._id?(i.style.display="block",i.addEventListener("click",(function(t){n(t,e._id)}))):i.style.display="none",l.addEventListener("click",(function(t){o(t,e._id,e.likes,c)})),a.addEventListener("click",(function(){r(e.link,e.name)})),c}function _(e,t){var n,o=e.target.closest(".places__item");o&&(n=t,fetch("".concat(s.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:s.headers}).then(d)).then((function(){o.remove()})).catch((function(e){console.log("Ошибка ".concat(e))}))}function y(e,t,n,o){var r,c;e.target.classList.toggle("card__like-button_is-active")?(c=t,r=fetch("".concat(s.baseUrl,"/cards/likes/").concat(c),{method:"PUT",headers:s.headers}).then(d)):r=function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:s.headers}).then(d)}(t),r.then((function(e){o.querySelector(".button-like-count").textContent=e.likes.length,e.likes})).catch((function(e){return console.error(e)}))}function m(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",h)}function v(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",h)}function h(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&v(t)}}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var S=document.querySelector(".places__list"),q=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_edit-avatar"),k=document.querySelector(".popup_type_new-card"),E=document.querySelector(".popup_type_image"),L=document.querySelectorAll(".popup__close"),A=document.querySelector(".popup__input_type_card-name"),C=document.querySelector(".popup__input_type_url"),x=document.querySelector(".popup__input_type_url-avatar"),U=q.querySelector(".popup__input_type_name"),T=q.querySelector(".popup__input_type_description"),w=document.querySelector(".profile__image"),j=document.querySelector(".profile__title"),O=document.querySelector(".profile__description"),D=document.querySelectorAll(".popup");D.forEach((function(e){e.classList.add("popup_is-animated")})),D.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&v(e)}))})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),Array.from(e.querySelectorAll(".form__set")).forEach((function(e){a(e)}))}));var P=null;function M(e,t){var n=E.querySelector(".popup__image"),o=E.querySelector(".popup__caption");n.src=e,n.alt=t,o.textContent=t,m(E)}function I(e,t){e.target.querySelector(".popup__button").textContent=t}Promise.all([fetch("".concat(s.baseUrl,"/users/me"),{method:"GET",headers:{authorization:s.headers.authorization}}).then(d),fetch("".concat(s.baseUrl,"/cards"),{method:"GET",headers:s.headers}).then(d)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];P=r,j.textContent=r.name,O.textContent=r.about,w.style="background-image: url('".concat(r.avatar,"')"),function(e){e.forEach((function(e){var t=f(e,P,_,y,M);S.append(t)}))}(c)})).catch((function(e){console.log("Ошибка ".concat(e))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){U.value=j.textContent,T.value=O.textContent,l(q),m(q)})),q.querySelector(".popup__form").addEventListener("submit",(function(e){var t,n;e.preventDefault(),I(e,"Сохранение..."),l(q),(t=U.value,n=T.value,fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:t,about:n})}).then(d)).then((function(e){j.textContent=e.name,O.textContent=e.about,v(q)})).catch((function(e){console.log("Ошибка при обновлении информации о пользователе: ".concat(e.status))})).finally((function(){I(e,"Сохранить")}))})),L.forEach((function(e){e.addEventListener("click",(function(){v(e.closest(".popup"))}))})),w.addEventListener("click",(function(){x.value=getComputedStyle(w).backgroundImage.slice(5,-2),m(g),l(g)})),g.querySelector(".popup__form").addEventListener("submit",(function(e){e.preventDefault(),I(e,"Сохранение..."),l(g);var t,n=x.value;console.log("Новый аватар:",n),(t=n,fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:t})}).then(d)).then((function(e){v(g),w.style="background-image: url('".concat(e.avatar,"')")})).catch((function(e){console.log("Ошибка при обновлении аватара пользователя: ".concat(e.status))})).finally((function(){I(e,"Сохранить")}))})),document.querySelector(".profile__add-button").addEventListener("click",(function(){l(k),m(k),A.value="",C.value=""})),k.querySelector(".popup__form").addEventListener("submit",(function(e){e.preventDefault(),I(e,"Создание..."),l(k);var t,n,o={name:A.value,link:C.value};(t=o.name,n=o.link,fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({name:t,link:n})}).then(d)).then((function(e){v(k);var t=f(e,P,_,y,M);S.prepend(t),console.log(e.link)})).catch((function(e){console.log("Ошибка при добавлении новой карточки: ".concat(e.status))})).finally((function(){I(e,"Создать")}))}))})();
//# sourceMappingURL=main.js.map