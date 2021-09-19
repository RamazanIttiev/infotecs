/**
 *
 * @param {*} personKeys Ключи объектов в массиве данных (const data = Object.keys(people[0]))
 *
 * Функция рендерит шапку таблицы
 *
 * const thead = table.createTHead()
 * const row = thead.insertRow();
 *
 * создают теги thead и tr
 *
 * Далее циклом пробегаюсь по массиву ключей и записываю элементы в тег th
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
const generateTbody = ({ data, rowsPerPage, currentPage, hiddenColumns }, tableElement) => {
  const tbody = tableElement.createTBody();
  tbody.innerHTML = '';
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
 * После всего вызываю функцию отрисовки кнопки редактирования строки
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
      if (key == 'eyeColor') {
        cell.style.borderRight = `1px solid ${value}`;
      }

      cell.innerText = value;
      cell.classList.add(`${key}__col`);
      cell.setAttribute('data-name', key);
    });

  return row;
};

export const updateRow = (row, data, hiddenColumns) => {
  const newRow = generateRow(data, hiddenColumns);

  row.replaceChildren(...newRow.children);
};

export const generateTable = ({ data, currentPage, rowsPerPage, hiddenColumns }) => {
  const tableElement = document.createElement('table');
  const thead = generateThead({ data, hiddenColumns }, tableElement);
  // const filters = generateFilter(data);
  const tbody = generateTbody({ data, rowsPerPage, currentPage, hiddenColumns }, tableElement);
  // const pagination = generateRow(data, rowsPerPage, currentPage);

  tableElement.appendChild(thead);
  tableElement.appendChild(tbody);
  // tableElement.appendChild(filters);
  // tableElement.appendChild(pagination);

  return tableElement;
};
