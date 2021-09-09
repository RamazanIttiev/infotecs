import generateEditBtn from './editBtn.js';

/**
 * 
 * @param {*} table Наша таблица прописанная в html файле
 * @param {*} data Массив с данными пользователей
 * 
 * Функция рендерит тело таблицы
 * 
 * создается тег tbody (const tbody = document.createElement('tbody'))
 * и помещается в таблицу
 * 
 * Далее циклом прохожу по массиву и снова проверяю на айдишник, а также
 * на то, является ли ключ объектом, если нет, то записываю значение в ячейку,
 * а если да, то получаю значение этого объекта 'name' 
 * (const firstName = document.createTextNode(element[key].firstName);
    const lastName = document.createTextNode(element[key].lastName);
    const name = `${firstName.textContent} ${lastName.textContent}`;)
    
    и записываю его в ячейку с помощью innerHTML
 */
const generateTbody = (table, data) => {
  const tbody = document.createElement('tbody');

  table.appendChild(tbody);

  data.map(element => {
    const row = tbody.insertRow();

    const keys = Object.assign(Object.values(element), []).slice(1);

    keys.map(key => {
      if (typeof key !== 'object') {
        const cell = row.insertCell();
        const text = document.createTextNode(key);
        cell.appendChild(text);
      } else {
        const cell = row.insertCell();
        const firstName = document.createTextNode(key.firstName);
        const lastName = document.createTextNode(key.lastName);

        const name = `${firstName.textContent} ${lastName.textContent}`;

        cell.innerHTML = name;
      }
    });
    generateEditBtn(row);
  });
};

export default generateTbody;
