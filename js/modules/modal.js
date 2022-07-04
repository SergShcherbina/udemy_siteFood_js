function modal() {

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
}

module.exports = modal;