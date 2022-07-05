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

export default modal;
export {closeModal};
export {showModal};
