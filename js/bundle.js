/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

    //№97 №98 Calc
    const result = document.querySelector('.calculating__result span');              //элемент куда записываем результат

    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {                                                //98 если получаем значения sex из памяти браузера 
        sex = localStorage.getItem('sex');                                           //98 записываем в переменную
    } else {                                                                         //98 если данные не записаны в памяти LocalStorage
        sex = 'female';                                                              //98 по умолчанию ставим эти
        localStorage.setItem('sex', 'female');                                       //98 и записываем в память
    }

    if(localStorage.getItem('ratio')) {                                              //98 если получаем значения ratio из памяти браузера 
        ratio = localStorage.getItem('ratio');                                       //98 записываем в переменную
    } else {                                                                         //98 если данные не записаны в памяти LocalStorage
        ratio = '1.375';                                                             //98 по умолчанию ставим эти
        localStorage.setItem('ratio', '1.375');                                      //98 и записываем в память
    }

    function initLocalStorage(selector, activeClass){                                //98 ф-я по добавлению класса активности элем из localStorage 
        const elements = document.querySelectorAll(selector);                        

        elements.forEach(elem => {                                                   //98 перебираем массив полученныей по селектору
            elem.classList.remove(activeClass);                                      //98 у каждго элемента удаляем клас активности
            if (elem.getAttribute('id') === localStorage.getItem('sex')){            //98 если значение атрибута id == значению в LocalStorage
                elem.classList.add(activeClass);                                     //98 данному элементу назначаем класс активности
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalStorage('#gender div', 'calculating__choose-item_active');
    initLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() {                                                           //занимается подсчетами
        if (!sex || !height || !weight || !age || !ratio) {                          //если хоть одно из полей не заполнено
            result.textContent = '____';                                             //подсчеты не производятсяб записываем ____
            return;                                                                  //и прирываем функцию
        }

        if(sex === 'famale'){                                                        //если пол женский 
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {                                                                     // если не женский пол)
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {                            //получение статических данных
        const elements = document.querySelectorAll(selector);                         //получаем массив элементов селектора 

        elements.forEach(item => {                                
            item.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')){                              //если элемент события имеет атрибут
                    ratio = +e.target.getAttribute('data-ratio');                     //записываем значение этого атрибука в переменную ratio
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')) //98 записываем в память браузера значения введенные пользователем
                } else {
                    sex = e.target.getAttribute('id');                                //если атрибут id ,записываем его значение 
                    localStorage.setItem('sex', e.target.getAttribute('id'));         //98 записываем в память браузера значения введенные пользователем
                } 

                elements.forEach( (elem) => {                                         //удаляем класс активности у всех элементов массива
                    elem.classList.remove(activeClass);
                });
                console.log(sex, ratio);
                
                e.target.classList.add(activeClass);                                  //элементу события класс активности добавляем

                calcTotal();                                                          //вызываем подсчеты при каждом изменении

            });
        });
    }
   
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {                                        //функция по динамическим инпутам
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){                                             //98 если ввели не число
                input.style.border = '1px solid red';                                 //98 добавляем красную окантовку
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {                                        //проверяем кажый инпут на полное совпадение атрибута 
                case 'height':                                                        //если атрибут heiht
                    height = +input.value;                                            //то в переменную height запиываем введеное в инпут значение 
                    break;                                                            //останавливаем итерацию 
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age': 
                    age = +input.value;
                    break;
            }

            calcTotal();                                                               //вызываем подсчеты при каждом изменении

        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {

    //Card
    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {      // rest-оператор в случае если будут добавляться классы
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);    //получаем место куда вствляем карту
            this.transfer = 27;                                      //предпологаемый курс валют
            this.changeToUAH();                                      //при  создании новой копии класса будет вызываться конвертор валют
        }
        changeToUAH() {
            this.price = this.price * this.transfer;                 //метод по конвертации валюты в гривни
        }
        render() {
            const element = document.createElement('div');           //добавляем div элемент и помещаем в него верстку карточки

            if(this.classes.length === 0) {                          //если не передано ни одного класса, то присвоим по умолчанию 
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className)); //перебираем все добавленные классы и добавляем к element
            }

            element.innerHTML = `
                <img src= ${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr"> ${this.descr} </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);                               //помещаем верстку(element) относительно динамического parent в HTML
        }
    }

    /* axios.get('http://localhost:3000/menu')                         //сделать запрос с помощью библиотеки axix, ф-я getResours не нужна !урок 91
        .then(data => {                                                
            data.data.forEach( ({img, alting, title, descr, price}) => {    
                new MenuCard(img, alting, title, descr, price, '.menu .container').render();   
            });
        }); */


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResours)('http://localhost:3000/menu')                           //запрс к серверу
        .then(data => {                                                //получаем промис с обычным массивом обьектов
            data.forEach( ({img, alting, title, descr, price}) => {    //через деструктуризацию передаем свойства полученного с сервера обьекта
                new MenuCard(img, alting, title, descr, price, '.menu .container').render();   //вызываем конструктор для карточек и вызываем метод по добавлению верстки
            });
        });

//////////////////////////////////////////// урок 90 в конце постройка на лету////////////////////////////////

        /* getResours('http://localhost:3000/menu')                     //постройка на лету если не нужна шаблонизация урок 90 в конце
            .then(data => createCard(data));                            //получаем данные и вызываем функцию, передаем аргумент

        function createCard(data) {
            data.forEach(({img, alting, title, descr, price}) => {
                const element =document.createElement('div');
  
                element.classList.add('menu__item');

                element.innerHTML = `
                    <img src= ${img} alt=${alting}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr"> ${descr} </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                    </div>
                `;
                document.querySelector('.menu .container').append(element);
            });

        } */
    

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards); 

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {

     //Form ///// Fetch API  /////////////////////////                      // -- через Fetch API
     const forms = document.querySelectorAll(formSelector);

     const messages = {                                                     //создаем обьект с различными сообщениями для пользователя
         loading: 'img/form/spinner.svg',
         success: 'Спасибо! Скоро мы с Вами свяжемся',
         failure: 'Что-то пошло не так...'
     };
 
     forms.forEach( item => {                                               //перебираем массив с формами
         bindPostData(item);                                                //вызываем функцию postData на каждой форме 
     }); 

     function bindPostData(form){                                           //фонкия отвечающая за привязку постинга данных на срвер
         form.addEventListener('submit', (e) => {
             e.preventDefault();
               
             const statusMessage = document.createElement('img');           //динамически добавляем элемент
             statusMessage.src = messages.loading;                          //путь к картинке
             statusMessage.style.cssText = `                              
                 display: block;
                 margin: 0 auto;
             `;               
             form.insertAdjacentElement('afterend', statusMessage);         //выгружаем в верстку после form
 
             const formData = new FormData(form);                           //создаем обект который собирает данные из формы, обязательно в верстке должны быть атрибуты name
             
             const json = JSON.stringify( Object.fromEntries( formData.entries())  ); // превращаем массив обьектов в массив массивов => в обычный обьект => в json формат
 
             (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)               //вызываем postData с передачей аргементов
             .then(data => {                                                //получаем промис с ответом
                 console.log(data);
                 showThanksModal(messages.success);
                 statusMessage.remove();
 
             }).catch(() => {                                               //при ошибке
                 showThanksModal(messages.failure);
 
             }).finally(() => {                                             //действие при любом ответе или ошибке
                 form.reset();   
             });
         });
     } 
 
 
     //красивое оповещение поле отправки формы
     function showThanksModal(message) {
         const prevModalDiolog = document.querySelector('.modal__dialog');
 
         prevModalDiolog.classList.add('hide');                                   //скрываем основную форму с инпутами 
         prevModalDiolog.classList.remove('show');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);
 
         const thanksModal = document.createElement('div');                         
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
             <div class="modal__content">
                 <form action="#">
                     <div data-close class="modal__close">&times;</div>
                     <div class="modal__title">${message}</div>
                 </form>
             </div>
             `;
         document.querySelector('.modal').append(thanksModal);
 
         setTimeout( () => {                                                     
             thanksModal.remove();                                                //удаляем форму благодарности
             prevModalDiolog.classList.remove('hide');                            //восстанавливаем видимость основнойформы
             prevModalDiolog.classList.add('show');
             (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');                                                        //закрываем окно формы
         }, 4000 );
     }
     
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function showModal(modalSelector, modalTimerId) {                                             //вынесли повторяющийся код в отдельную функцию
    const modal = document.querySelector(modalSelector);
    //modal.classList.toggle("show");
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';                                    //отключаем прокрутку при открытом модальном окне

    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {                                            //вынесли повторяющийся код в отдельную функцию
    const modal = document.querySelector(modalSelector);
    //modal.classList.toggle("show");
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';                                          // восстанавливаем функционал прокрутки при закрытии модального окна
}

function modal(triggerSelector, modalSelector, modalTimerId) {

     //Modal 
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach( (btn) => {
        btn.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    });
    
    modal.addEventListener('click', (e) => {
        if(e.target && e.target == modal || e.target.classList.contains('modal__close')){   //если клик по затемнению или крестику
            closeModal(modalSelector);
            clearInterval(modalTimerId);                                 //удаляем интервал если окно было закрыто
        } 
    });

    document.addEventListener('keydown', (e) => {                      //вешаем обработчик событий на кноаку Esc
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
            clearInterval(modalTimerId);
        }
    });

    function showModalByScroll(){                                 
        if(window.pageYOffset + document.documentElement.clientHeight  //если прокрученная часть окна + сама высота видимой части сайта 
            >= document.documentElement.scrollHeight ) {               // >= полной высоте страницы сайта

            showModal(modalSelector, modalTimerId);                                               //окрываем модальное окно
            window.removeEventListener('scroll', showModalByScroll);   //удаляем оброботчик событий с прокруткиб чтобы сработало только 1 раз
        }
    }

    window.addEventListener('scroll', showModalByScroll);              //назначаем обработчик событий на скрол
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    // Slider --- простой слайдер урок №92 / слайдер с горизонтальной прокруткой №93
    const slides = document.querySelectorAll(slide ),
          slider = document.querySelector(container),                     //94 получаем весь слайдер 
          currentSlide = document.getElementById(currentCounter),
          totalSlide = document.getElementById(totalCounter ),
          next = document.querySelector(nextArrow),
          prev = document.querySelector(prevArrow),
          slideWrapper = document.querySelector(wrapper),
          slideField = document.querySelector(field),
          width = window.getComputedStyle(slideWrapper).width;                   //93 получаем ширину переменной slideWrapper из применненных к ней стилей

    let slideIndex = 1;                                                      //93 задаем индекс для текущегослайда
    let offset = 0;                                                          //93 переменная для контроля отступаб так как слайдер горизонтальный

    //инициализация слайдера       
    currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZiro)(`${slideIndex}`);                     //93 в нумерацию слайдов прописываем индекс и ставим ноль перед цифрой
    totalSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZiro)(slides.length);                         //93 показываем общее количесво слайдов в нумерации


    slideField.style.width = 100 * slides.length + '%';                      //93 задаем ширину всего поля слайдера в ширину в %
    slideField.style.display = 'flex';                                       //93 чтобы слайды выстроились по горизонтали
    slideField.style.transition = '0.5s all';                                //93 плавность переключения
    slideWrapper.style.overflow = 'hidden';                                  //93 скрываем все за пределами основной обертки слайдера
    

    slides.forEach(slide => {  
                                                     
        slide.style.width = width;                                           //93 задаем каждому сайду из массива ширину равную width
    });

    slider.style.position = 'relative';                                      //94 для позицианирования дотсов

    const indicators = document.createElement('ol');                         //94 добавляем ордерлист для дотсов
    let dots = [];                                                           //94 создаем массив для дотсов

    indicators.classList.add('carousel-indicators');                         //94 применяем к нему класс из css
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){                                  //94 цикл по созданию дотсов 
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);                            //94 каждому дотсу добавляем атрибук

        if(i == 0) {                                                         //94 если первый слайдер, то и первый дотс с прозрачностью 1
            dot.style.opacity = 1;
        }

        indicators.append(dot);                                              //94 апендим в indicators
        dots.push(dot);                                                      //94 пушим дотсы в массив
    }

    function stringToNumber (str) {                                           //96 убирает все буквы и приводит к числовому значению
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        //if(offset == +width.slice(0, width.length-2) * (slides.length - 1)){  //93 если отступ(offset) == ширина слайда * кол-во сл -1 
        if(offset == stringToNumber(width) * (slides.length - 1)){              //96 тоже что и на верхней, только НЕ числа заменяем на ''
            offset = 0;                                                         //93 то возвращаем к первому слайду, отступ = 0
        } else {
            offset += stringToNumber(width);                                    //93 slice вырезает две буквы 'px' из приходяцей width
        }
        
        slideField.style.transform = `translateX(-${offset}px)`;                //93 перемещаем влево на ширину offset

        if(slideIndex == slides.length) {                                       //93 условие по отображению номера(индекса) слайда
            slideIndex = 1;
        }else {
            slideIndex ++;
        }

        currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZiro)(`${slideIndex}`);                     //в нумерацию слайдов прописываем индекс и ставим ноль перед цифрой
        totalSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZiro)(slides.length);                         //показываем общее количесво слайдов в нумерации

        dots.forEach(dot => dot.style.opacity = '0.5');                          //94 всем дотсам прозрачность 50%
        dots[slideIndex - 1].style.opacity = 1;                                  //94 дотс с нужным индексом прозрачность 1

    });

    prev.addEventListener('click', () => {                                       //93 все тоже только в обратную сторону
        if(offset == 0) {         
            offset = stringToNumber(width) * (slides.length - 1);
        } else {
            offset -= stringToNumber(width);                       
        }
        
        slideField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        }else {
            slideIndex --;
        }

        currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZiro)(`${slideIndex}`);                     //в нумерацию слайдов прописываем индекс и ставим ноль перед цифрой
        totalSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZiro)(slides.length);                         //показываем общее количесво слайдов в нумерации

        dots.forEach(dot => dot.style.opacity = '0.5');                          //94 всем дотсам прозрачность 50%
        dots[slideIndex - 1].style.opacity = 1;                                  //94 дотс с нужным индексом прозрачность 1
    });
    
    dots.forEach( dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');              //94 записываем в переменную номер дотса на котор. событие 

            slideIndex = slideTo;                                                //94 меняем индек относительно номера дотса(slideTo)
            offset = stringToNumber(width) * (slideTo - 1);                      //94 отступ относительно slideTo

            slideField.style.transform = `translateX(-${offset}px)`;             //94 перемещаем слайд на новый отсуп

            currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZiro)(`${slideIndex}`);                 //в нумерацию слайдов прописываем индекс и ставим ноль перед цифрой
            totalSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZiro)(slides.length);                     //показываем общее количесво слайдов в нумерации

            dots.forEach(dot => dot.style.opacity = '0.5');                      //94 всем дотсам прозрачность 50%
            dots[slideIndex - 1].style.opacity = 1;                              //94 дотс с нужным индексом прозрачность 1
        });
    });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParantSelector, activeClass) {

     //Tabs
    let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParant = document.querySelector(tabsParantSelector);

    function hideTabContent() {                                    //перебираем цыклом для того чтобы скрыть все табы
        tabsContent.forEach( (item) => {
            item.classList.remove('fade');                          //удаляем анимацию fade 
            item.classList.add('hide');                             //присваиваем им класс hide
        });

        tabs.forEach( (item) => {
            item.classList.remove(activeClass);        //удаляем класс активности
        });
    }

    function showTabContent(i = 0) {                                //если не передано никакого аргемента тогда i=0
        tabsContent[i].classList.add('fade');                       //добавляем анимацию fade
        tabsContent[i].classList.remove('hide');                    //удаляем arr[0] класс hide
        tabs[i].classList.add(activeClass);       //присваиваем arr[0] класс акивности
        
    }

    hideTabContent();
    showTabContent();

    tabsParant.addEventListener('click', (e) => {                   //вешаем обработчик событий на родителя списка
        
        if(e.target && e.target.classList.contains(tabsSelector.slice(1))) {   //проверяем на то что кликнули именно в элемент списка
            tabs.forEach( (item, i) => {                       //перебираем все элементы списка

                if(e.target == item) {                              //если элемент по которому кликнути и элемент списка совпадают 
                    hideTabContent();                            
                    showTabContent(i);                              //передаем номер эл в списке как аргумент 
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);  //экспортируем модуль

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZiro": () => (/* binding */ getZiro)
/* harmony export */ });
function getZiro(num) {                                        //ф-я по добавлению нуля перед цифрой
    if(num >= 0 && num < 10){                                  //если число из аргумента > 0 и < 10 
        return `0${num}`;                                      //возвращаем 0 + это число
    } else {
        return num;
    }
}

function timer(id, deadline  ) {

    //Timer
    //const deadline = new Date()  /* '2022-05-30' */;                //время до которого должны дойти

    //deadline.setDate(deadline.getDate() + 1);                       // остается всегда 1 день

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - Date.parse(new Date());     //кол-во времени до которого должно дойти - настоящее время 
            
            if(t <= 0) {                                            //если время чтетчика <= 0, то все значения 0
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24)),       //кол-во дней
                hours = Math.floor((t / (1000 * 60 * 60)) % 24 ),   //кол-во часов 
                minutes = Math.floor((t / 1000 / 60) % 60 ),        //кол-во минут
                seconds = Math.floor((t / 1000) % 60);              //кол-во секунд
            }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),             //получаем все значения 
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);        //вызываем updateClock каждую секунду
        updateClock();                                              //вызываем один раз без счетчикаб чтобы значения отображались сразу а не через сек

        function updateClock() {
            const t = getTimeRemaining(endtime);                    //записываем результат функции в перемкнную t

            days.innerHTML = getZiro(t.days);                       //записываем в верстку значения полученные из getTimeRemaining(endtime) и записанные в переменную t
            hours.innerHTML = getZiro(t.hours);
            minutes.innerHTML = getZiro(t.minutes);
            seconds.innerHTML = getZiro(t.seconds);

            if(t.total <= 0){                                       //если счетчик прошел свое время, 
                clearInterval(timeInterval);                        //сбрасываем вызов функции updateClock
            }
        }
    }
    setClock(id, deadline); 

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);
 

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResours": () => (/* binding */ getResours),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {                                  //создаем функцию по общению  с сервером, постинг данных !!!УРОК № 90
    const res = await fetch(url, {                                       //настраиваем постинг данных json, ответ записываем в переменную res
        method: 'POST',                                            
        headers: {
            'Content-type': 'application/json'                           //в заголовках между типом ставим : 
        },
        body: data   
    });
    return await res.json();        //получаем ответ о статусе прохождении постинга в виде промиса => конвертируем в обычный обьект => возвращаем из фунции  
};


async function getResours(url) {                                         //создаем функцию по получению данных ссервера !!!УРОК № 90
    let res = await fetch(url);

    if(!res.ok){                                                         //если статус запроса не окей(не 200)
       throw new Error(`Could not fetch ${url}, status: ${res.status}`); // выкидывает в консоль ошибку с адресом и статусом ошибки
    }

    return await res.json();                                             //транформируем данные из json формата в обычный обьект
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");


;








document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 300000 );                     //модальное окно открывается через заданное время

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: 'total',
        currentCounter: 'current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-07-11');  

}); 

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map