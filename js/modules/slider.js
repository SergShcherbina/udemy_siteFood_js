import {getZiro} from './timer';

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
    currentSlide.textContent = getZiro(`${slideIndex}`);                     //93 в нумерацию слайдов прописываем индекс и ставим ноль перед цифрой
    totalSlide.textContent = getZiro(slides.length);                         //93 показываем общее количесво слайдов в нумерации


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

        currentSlide.textContent = getZiro(`${slideIndex}`);                     //в нумерацию слайдов прописываем индекс и ставим ноль перед цифрой
        totalSlide.textContent = getZiro(slides.length);                         //показываем общее количесво слайдов в нумерации

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

        currentSlide.textContent = getZiro(`${slideIndex}`);                     //в нумерацию слайдов прописываем индекс и ставим ноль перед цифрой
        totalSlide.textContent = getZiro(slides.length);                         //показываем общее количесво слайдов в нумерации

        dots.forEach(dot => dot.style.opacity = '0.5');                          //94 всем дотсам прозрачность 50%
        dots[slideIndex - 1].style.opacity = 1;                                  //94 дотс с нужным индексом прозрачность 1
    });
    
    dots.forEach( dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');              //94 записываем в переменную номер дотса на котор. событие 

            slideIndex = slideTo;                                                //94 меняем индек относительно номера дотса(slideTo)
            offset = stringToNumber(width) * (slideTo - 1);                      //94 отступ относительно slideTo

            slideField.style.transform = `translateX(-${offset}px)`;             //94 перемещаем слайд на новый отсуп

            currentSlide.textContent = getZiro(`${slideIndex}`);                 //в нумерацию слайдов прописываем индекс и ставим ноль перед цифрой
            totalSlide.textContent = getZiro(slides.length);                     //показываем общее количесво слайдов в нумерации

            dots.forEach(dot => dot.style.opacity = '0.5');                      //94 всем дотсам прозрачность 50%
            dots[slideIndex - 1].style.opacity = 1;                              //94 дотс с нужным индексом прозрачность 1
        });
    });
}


export default slider;