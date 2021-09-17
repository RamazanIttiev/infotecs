import generateEditBtn from './editCell.js';
import generateCellColor from './setColor.js';

const tbody = document.getElementById('tbody');

/**
 *
 * @param {*} people Массив пользователей
 * @param {*} rowsPerPage Количество строк на странице
 * @param {*} currentPage Исходная страница
 *
 * Функция рендерит тело таблицы
 *
 * Сразу обнуляю таблицу для того чтобы во время переключения между страницами
 * строки не добавлялись к предыдущим (старые удаляются, новые добавляются)
 *
 * start - начальная позиция
 * end - конечная позиция
 * paginatedPeople - удаляем с позиции start до end и помещяем в переменную
 */
const generateTbody = (people, rowsPerPage, currentPage) => {
  tbody.innerHTML = '';
  currentPage--;

  let start = rowsPerPage * currentPage;
  let end = start + rowsPerPage;
  let paginatedPeople = people.slice(start, end);

  generatePaginatedTable(paginatedPeople);
};

/**
 * 
 * @param {*} paginatedPeople Разделенный постраничный список
 * 
 * Функция принимает массив разделенных пользователей и обертку
 * 
 * Далее циклом прохожу по массиву и создаю строки с классом 'tbody__row',
 *
 * в переменную values помещаю копию массива всех значений каждого объекта и
 * удаляю первыц элемент (id)
 *
 * С помощью метода Object.keys(person).slice(1); получаю ключи объекта и 
 * удаляю первый элемент (id) после чего присваиваю каждой строке свой класс с
 * ключем данной строки (cell.classList.add(`${keys[index]}__col`))

 * Дальше идет цикл, который создает ячейки и проверка на вложенные объекты
 * (имя и фамилия)
 *  
 * Как отрисовались все строки, присваиваю значение строки eyeColor 
 * как цвет последней ячейки 
 * 
 * После всего вызываю функцию отрисовки кнопки редактирования строки
 */
const generatePaginatedTable = paginatedPeople => {
  paginatedPeople.map(person => {
    const row = tbody.insertRow();
    row.setAttribute('id', person.id);
    row.classList.add('tbody__row');

    const values = Object.values(person, []).slice(1);
    const keys = Object.keys(person).slice(1);

    values.map((value, index) => {
      const cell = row.insertCell();
      if (typeof value !== 'object') {
        const text = document.createTextNode(value);

        cell.appendChild(text);
      } else {
        const firstName = document.createTextNode(value.firstName);
        const lastName = document.createTextNode(value.lastName);

        const name = `${firstName.textContent} ${lastName.textContent}`;

        cell.innerText = name;
      }
      cell.classList.add(`${keys[index]}__col`);
    });

    generateCellColor();

    generateEditBtn(row);
  });
};

export default generateTbody;
