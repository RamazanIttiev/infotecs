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
 * Далее циклом прохожу по массиву и создаю строки с классом 'tbody__row',
 *
 * в переменную values помещаю копию массива всех значений каждого объекта и
 * удаляю первыц элемент (id)
 *
 * Дальше идет цикл, который создает ячейки и проверка на вложенные объекты
 * (имя и фамилия)
 *
 * После всего вызываю функцию отрисовки кнопки редактирования строки
 */
const generateTbody = (table, data) => {
  const tbody = document.createElement('tbody');

  table.appendChild(tbody);

  data.map(person => {
    const row = tbody.insertRow();
    row.setAttribute('id', person.id);
    row.classList.add('tbody__row');

    const values = Object.assign(Object.values(person), []).slice(1);
    const keys = Object.keys(person).slice(1);

    values.map((value, index) => {
      const cell = row.insertCell();
      if (typeof value !== 'object') {
        const text = document.createTextNode(value);

        generateCellColor();
        cell.appendChild(text);
      } else {
        const firstName = document.createTextNode(value.firstName);
        const lastName = document.createTextNode(value.lastName);

        const name = `${firstName.textContent} ${lastName.textContent}`;

        cell.innerHTML = name;
      }
      cell.classList.add(`${keys[index]}__col`);
    });
    generateEditBtn(row);
  });
};

/**
 * Функция задает цвет соответствующий значению ячейки
 */
const generateCellColor = () => {
  const eyeColor = document.getElementsByClassName('eyeColor__col');

  for (let i = 0; i < eyeColor.length; i++) {
    eyeColor[i].style.color = eyeColor[i].innerText;
  }
};

export default generateTbody;
