"use strict"

document.addEventListener('DOMContentLoaded', () => {


    //Tabs
    let tabsContent = document.querySelectorAll('.tabcontent'),
        tabHeader = document.querySelectorAll('.tabheader__item'),
        tabsParant = document.querySelector('.tabheader__items');
    
    function hideTabContent() {                                    //перебираем цыклом для того чтобы скрыть все табы
        tabsContent.forEach( (item) => {
            item.classList.remove('fade');                          //удаляем анимацию fade 
            item.classList.add('hide');                             //присваиваем им класс hide
        });

        tabHeader.forEach( (item) => {
            item.classList.remove('tabheader__item_active');        //удаляем класс активности
        });
    }

    function showTabContent(i = 0) {                                //если не передано никакого аргемента тогда i=0
        tabsContent[i].classList.add('fade');                       //добавляем анимацию fade
        tabsContent[i].classList.remove('hide');                    //удаляем arr[0] класс hide
        tabHeader[i].classList.add('tabheader__item_active');       //присваиваем arr[0] класс акивности
        
    }

    hideTabContent();
    showTabContent();

    tabsParant.addEventListener('click', (e) => {                   //вешаем обработчик событий на родителя списка
            
        if(e.target && e.target.classList.contains('tabheader__item')) {   //проверяем на то что кликнули именно в элемент списка
            tabHeader.forEach( (item, i) => {                       //перебираем все элементы списка

                if(e.target == item) {                              //если элемент по которому кликнути и элемент списка совпадают 
                    hideTabContent();                            
                    showTabContent(i);                              //передаем номер эл в списке как аргумент 
                }
            });
        }
    });


    //Timer
    const deadline = new Date()  /* '2022-05-30' */;                //время до которого должны дойти

    deadline.setDate(deadline.getDate() + 1);                       // остается всегда 1 день

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

    function getZiro(num) {                                        //ф-я по добавлению нуля перед цифрой
        if(num >= 0 && num < 10){                                  //если число из аргумента > 0 и < 10 
            return `0${num}`;                                      //возвращаем 0 + это число
        } else {
            return num;
        }
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
    setClock('.timer', deadline); 


    //Modal 
    const btnModal = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

        btnModal.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                showModal();
            });
        });

        //let setModal = setTimeout(showModal, 5000 );                     //модальное окно открывается через заданное время

        function showModal() {                                             //вынесли повторяющийся код в отдельную функцию
            modal.classList.toggle("show");
            //modal.classList.add('show');
            //modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';                       //отключаем прокрутку при открытом модальном окне
        }

        function closeModal() {                                            //вынесли повторяющийся код в отдельную функцию
            modal.classList.toggle("show");
            //modal.classList.add('hide');
            //modal.classList.remove('show');
            document.body.style.overflow = '';                             // восстанавливаем функционал прокрутки при закрытии модального окна
        }
        
        modal.addEventListener('click', (e) => {
            if(e.target && e.target == modal || e.target.classList.contains('modal__close')){   //если клик по затемнению или крестику
                closeModal();
                //clearInterval(setModal);                                 //удаляем интервал если окно было закрыто
            } 
        });

        document.addEventListener('keydown', (e) => {                      //вешаем обработчик событий на кноаку Esc
            if(e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
                //clearInterval(setModal);
            }
        });

        function showModalByScroll(){                                 
            if(window.pageYOffset + document.documentElement.clientHeight  //если прокрученная часть окна + сама высота видимой части сайта 
                >= document.documentElement.scrollHeight ) {               // >= полной высоте страницы сайта

                showModal();                                               //окрываем модальное окно
                window.removeEventListener('scroll', showModalByScroll);   //удаляем оброботчик событий с прокруткиб чтобы сработало только 1 раз
            }
        }

        window.addEventListener('scroll', showModalByScroll);              //назначаем обработчик событий на скрол
     
        
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

    const getResours = async (url) => {                                //создаем функцию по получению данных ссервера !!!УРОК № 90
        const res = await fetch(url);

        if(!res.ok){                                                         //если статус запроса не окей(не 200)
           throw new Error(`Could not fetch ${url}, status: ${res.status}`); // выкидывает в консоль ошибку с адресом и статусом ошибки
        }

        return await res.json();                                       //транформируем данные из json формата в обычный обьект
    };

    /* axios.get('http://localhost:3000/menu')                         //сделать запрос с помощью библиотеки axix, ф-я getResours не нужна !урок 91
        .then(data => {                                                
            data.data.forEach( ({img, alting, title, descr, price}) => {    
                new MenuCard(img, alting, title, descr, price, '.menu .container').render();   
            });
        }); */


    getResours('http://localhost:3000/menu')                           //запрс к серверу
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
    

    //Form ///// Fetch API  /////////////////////////                      // -- через Fetch API
    const forms = document.querySelectorAll('form');

    const messages = {                                                     //создаем обьект с различными сообщениями для пользователя
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach( item => {                                               //перебираем массив с формами
        bindPostData(item);                                                //вызываем функцию postData на каждой форме 
    }); 

    const postData = async (url, data) => {                                //создаем функцию по общению  с сервером, постинг данных !!!УРОК № 90
        const res = await fetch(url, {                                     //настраиваем постинг данных json, ответ записываем в переменную res
            method: 'POST',                                            
            headers: {
                'Content-type': 'application/json'                         //в заголовках между типом ставим : 
            },
            body: data   
        });
        return await res.json();        //получаем ответ о статусе прохождении постинга в виде промиса => конвертируем в обычный обьект => возвращаем из фунции  
    };

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

            postData('http://localhost:3000/requests', json)               //вызываем postData с передачей аргементов
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
        //showModal();

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
            closeModal();                                                        //закрываем окно формы
        }, 4000 );
    }
    

    // Slider --- простой слайдер урок №92 / слайдер с горизонтальной прокруткой №93
    const slides = document.querySelectorAll('.offer__slide'),
          currentSlide = document.getElementById('current'),
          totalSlide = document.getElementById('total'),
          next = document.querySelector('.offer__slider-next'),
          prev = document.querySelector('.offer__slider-prev'),
          slideWrapper = document.querySelector('.offer__slider-wrapper'),
          slideField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slideWrapper).width;                   //93 получаем ширину переменной slideWrapper из применненных к ней стилей

        let slideIndex = 1;                                                      //93 задаем индекс для текущегослайда
        let offset = 0;                                                          //93 переменная для контроля отступаб так как слайдер горизонтальный
    
        if(slides.length < 10) {
            totalSlide.textContent = `0${slides.length}`; 
            currentSlide.textContent =`0${slideIndex}`
        } else {
            totalSlide.textContent = slides.length;
            currentSlide.textContent = slideIndex;
        }
       

        slideField.style.width = 100 * slides.length + '%';                      //93 задаем ширину всего поля слайдера в ширину в %
        slideField.style.display = 'flex';                                       //93 чтобы слайды выстроились по горизонтали
        slideField.style.transition = '0.5s all';                                //93 плавность переключения
        slideWrapper.style.overflow = 'hidden';                                  //93 скрываем все за пределами основной обертки слайдера

        slides.forEach(slide => {  
                                                         
            slide.style.width = width;                                           //задаем каждому сайду из массива ширину width
        });


        next.addEventListener('click', () => {
            if(offset == +width.slice(0, width.length-2) * (slides.length - 1)){        //93 если отступ(offset) == ширина слайда * кол-во сл -1 
                offset = 0;                                                           //93 то возвращаем к первому слайду, отступ = 0
            } else {
                offset += +width.slice(0, width.length-2);                       //93 slice вырезает две буквы 'px' из приходяцей width
            }
            
            slideField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == slides.length) {
                slideIndex = 1;
            }else {
                slideIndex ++;
            }

            if(slides.length < 10) {
                currentSlide.textContent = `0${slideIndex}`;
            } else {
                currentSlide.textContent = slideIndex;
            }

        });

        prev.addEventListener('click', () => {
            if(offset == 0) {        
                offset = +width.slice(0, width.length-2) * (slides.length - 1);
            } else {
                offset -= +width.slice(0, width.length-2);                       
            }
            
            slideField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == 1) {
                slideIndex = slides.length;
            }else {
                slideIndex --;
            }

            if(slides.length < 10) {
                currentSlide.textContent = `0${slideIndex}`;
            } else {
                currentSlide.textContent = slideIndex;
            }
        });
        


  /*   let slideIndex = 1;                                                          //задаем индекс для текущегослайда
    showSlides(slideIndex);                                                      //инициализация слайда

    next.addEventListener('click', e => {                                        
        showSlides(slideIndex += 1);                                             //при нажатии увеличиваем индекс на 1
        });

    prev.addEventListener('click', e => {
        showSlides(slideIndex -= 1);                                         
    });

    function showSlides(n){

        slides.forEach((e) => {
            e.classList.add('hide');                                             //с помощью цкла скрываем все слайды
        });
       
        if(n > slides.length){                                                   //условие в случае когда слайды законатся перекинуть на первый
            slideIndex = 1;
        }
        if(n < 1){                                                               // в случае листинга в обратную сторону перекинуть на последний
            slideIndex = slides.length;
        }

        slides[slideIndex - 1].classList.toggle('hide');                         //показываем слайд с нулевым индексом(первый)

        currentSlide.textContent = getZiro(`${slideIndex}`);                     //в нумерацию слайдов прописываем индекс и ставим ноль перед цифрой
        totalSlide.textContent = getZiro(slides.length);                         //показываем общее количесво слайдов в нумерации
    }  */                                                                           //!при выводе нумерации нельзя slideIndex заменить на аргумент n

}); 


