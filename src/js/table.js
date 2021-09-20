import { generateFilter } from './filter.js';

/**
 *
 * @param {*} param0 data - Массив данных, hiddenColumns - скрытые колонки
 * @param {*} tableElement Таблица
 * @returns шапку таблицы
 *
 * Прохожусь по ключам первого объекта массива и отрисовываю шапку с нужными названиями
 *
 * key.charAt(0).toUpperCase() + key.slice(1) - делает 1 букву заглавной
 */
const generateThead = ({ data, hiddenColumns }, tableElement) => {
  const thead = tableElement.createTHead();
  const row = thead.insertRow();

  Object.keys(data[0])
    .slice(1)
    .map(key => {
      if (hiddenColumns.includes(key)) {
        return;
      }
      const th = document.createElement('th');
      const text = document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1));
      th.appendChild(text);
      th.classList.add(`${key}__col_head`);
      row.appendChild(th);
    });

  return thead;
};

/**
 *
 * @param {*} param0 Деструктурированный объект state
 * @param {*} tableElement Таблица
 * @returns тело таблицы
 *
 * Создаю тег table
 * currentPage-- для правильного постраничного вывода
 *
 * Далее отпределяю начальный и конечный элементы текущей страницы и удаляю ненужные
 * Прохожу циклом по новому массиву из 10 объектов и вызываю функцию отрисовки строк
 */
export const generateTbody = ({ data, rowsPerPage, currentPage, hiddenColumns }, tableElement) => {
  const tbody = tableElement.createTBody();

  currentPage--;

  let start = rowsPerPage * currentPage;
  let end = start + rowsPerPage;
  let paginatedData = data.slice(start, end);

  paginatedData.map(rowData => {
    tbody.appendChild(generateRow(rowData, hiddenColumns));
  });

  return tbody;
};

/**
 *
 * @param {*} rowData Строки текущей страницы (объекты)
 * @param {*} hiddenColumns Скрытые колонки
 * @returns Строку
 *
 * Создаю строку
 *
 * Object.entries получает массив с ключами и значениями
 *
 * Далее проверяю на наличие ключа в массиве скрытых колонок, если есть совпадения,
 * то дальше ничего не происходит
 *
 * В ином случае идет создание ячеек
 */
const generateRow = (rowData, hiddenColumns) => {
  const row = document.createElement('tr');
  row.setAttribute('id', rowData.id);
  row.classList.add('tbody__row');

  Object.entries(rowData)
    .slice(1)
    .forEach(personArray => {
      let value = personArray[1];
      const key = personArray[0];

      if (hiddenColumns.includes(key)) {
        return;
      }
      const cell = row.insertCell();
      if (key === 'name') {
        const firstName = document.createTextNode(value.firstName);
        const lastName = document.createTextNode(value.lastName);

        value = `${firstName.textContent} ${lastName.textContent}`;
      }
      if (key === 'eyeColor') {
        cell.style.borderRight = `1px solid ${value}`;
      }

      cell.innerText = value;
      cell.classList.add(`${key}__col`);
      cell.setAttribute('data-name', key);
    });

  return row;
};

/**
 *
 * @param {*} row Текущая строка
 * @param {*} data Текущая строка (объект)
 * @param {*} hiddenColumns Массив скрытых колонок
 *
 * Функция обновляет строку после ее редаетирования с помощью replaceChildren
 *
 * В newRow снова вызывается отрисовка строк, но уже с обновленными данными,
 * а replaceChildren меняет отредактированную строку
 */
export const updateRow = (row, data, hiddenColumns) => {
  const newRow = generateRow(data, hiddenColumns);

  row.replaceChildren(...newRow.children);
};

export const generateTable = ({ data, currentPage, rowsPerPage, hiddenColumns }) => {
  const tableElement = document.createElement('table');

  const thead = generateThead({ data, hiddenColumns }, tableElement);
  const filters = generateFilter({ data, hiddenColumns }, tableElement);
  const tbody = generateTbody({ data, rowsPerPage, currentPage, hiddenColumns }, tableElement);

  tableElement.appendChild(thead);
  tableElement.appendChild(filters);
  tableElement.appendChild(tbody);

  return tableElement;
};
