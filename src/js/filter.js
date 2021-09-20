/**
 *
 * @param {*} param0 Массив данных, скрытые колонки
 * @param {*} tableElement Таблица
 * @returns элемент фильтрации
 *
 * Создаю тело аблиц и помещаю туда строку и ячейки с инпутами,
 * пройдясь по массиву ключей первого обекта
 */
export const generateFilter = ({ data }) => {
  const filterElement = document.createElement('tbody');
  const row = filterElement.insertRow();

  Object.keys(data[0])
    .slice(1)
    .forEach(key => {
      const input = document.createElement('input');
      input.placeholder = key;
      input.classList.add('filter__input');
      input.setAttribute('type', key === 'phone' ? 'number' : 'text');
      input.name = key;

      const cell = row.insertCell();
      cell.classList.add('filter__cell');
      cell.classList.add(`${key}__col_input`);

      cell.appendChild(input);
      row.appendChild(cell);
      filterElement.appendChild(row);
    });

  return filterElement;
};

/**
 *
 * @param {*} input текущий инпут
 *
 * Происходит генерация инпутов
 *
 * В newFilters записываю копию пустого объекта с будущими фильтрами
 *
 * Запускается цикл и при вводе задаю свойство объекта и присваиваю ему значение инпута
 *
 * Далее передаю этот объект в колбэк который отрисовывает новое тело таблицы
 *
 * Все это с небольшой задержкой
 */
export const initFilters = ({ data, filters }, callback) => {
  const filterElement = document.getElementById('filter');
  const filter = generateFilter({ data });
  filterElement.appendChild(filter);

  const filterInputs = document.getElementsByClassName('filter__input');

  const newFilters = { ...filters };

  Array.from(filterInputs).forEach(input => {
    input.addEventListener('input', event =>
      setTimeout(() => {
        newFilters[event.target.name] = event.target.value;
        callback(newFilters);
      }, 1000),
    );
  });
};
