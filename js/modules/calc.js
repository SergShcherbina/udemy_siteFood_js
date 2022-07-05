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

export default calc;