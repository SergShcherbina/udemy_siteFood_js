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


    
        

}); 