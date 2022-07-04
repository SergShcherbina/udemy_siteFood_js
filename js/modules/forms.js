function forms() {

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
     
}

module.exports = forms;