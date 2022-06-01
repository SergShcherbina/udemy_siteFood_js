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
    const deadline = '2022-05-30';                                  //время до которого должны дойти

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

        //let setModal = setTimeout(showModal, 5000 );              //модальное окно открывается через заданное время

        function showModal() {                                      //вынесли повторяющийся код в отдельную функцию
            modal.classList.toggle("show");
            document.body.style.overflow = 'hidden';                //отключаем прокрутку при открытом модальном окне
        }

        function closeModal() {                                     //вынесли повторяющийся код в отдельную функцию
            modal.classList.toggle("show");
            document.body.style.overflow = '';                      // восстанавливаем функционал прокрутки при закрытии модального окна
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
                this.parent.append(element);                             //помещаем верстку(element) относительно динамического parent в HTML
            }
        }

        let fitnessCard = new MenuCard(                                  //новая кпия класса, передаем в нее аргумены
            'img/tabs/vegy.jpg',
            'vegy',
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            9,                                    
            '.menu .container',
            'menu__item'
        );
        fitnessCard.render();                                            //вызываем метод render по добавлению верстки

        let elitCard = new MenuCard(
            'img/tabs/elite.jpg',
            'elite',
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            15,
            '.menu .container',
            'menu__item'
        );
        elitCard.render();

        let postCard = new MenuCard(
            'img/tabs/post.jpg',
            'post',
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
            10,
            '.menu .container',
            'menu__item'
        );
        postCard.render();


}); 


