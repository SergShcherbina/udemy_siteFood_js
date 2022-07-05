import {getResours} from "../services/services";

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
    

}

export default cards; 