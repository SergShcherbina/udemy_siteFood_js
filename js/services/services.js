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


export {postData};
export {getResours};