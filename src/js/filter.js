/**
 *
 * @param {*} param0 Массив данных, скрытые колонки
 * @param {*} tableElement Таблица
 * @returns элемент фильтрации
 *
 * Создаю тело аблиц и помещаю туда строку и ячейки с инпутами,
 * пройдясь по массиву ключей первого обекта
 */
export const generateFilter = ({ data, hiddenColumns }, tableElement) => {
  const filterElement = tableElement.createTBody();
  const row = filterElement.insertRow();

  Object.keys(data[0])
    .slice(1)
    .forEach(key => {
      if (hiddenColumns.includes(key)) {
        return;
      }
      const input = document.createElement('input');
      input.placeholder = key;
      input.classList.add('filter__input');
      input.setAttribute('type', key === 'phone' ? 'number' : 'text');

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
 * При вводе запускается цикл с проверкой на наличие введенных символов в тексте ячейки,
 * если совпадения найдены то остальным элементам присваивается класс 'hide' и элементы скрываются,
 * в обратном случае класс удаляется
 */
export const initFilters = () => {
  const filterInputs = document.getElementsByClassName('filter__input');
  const rows = document.getElementsByClassName('tbody__row');

  Array.from(filterInputs).forEach(input => {
    input.addEventListener('input', e =>
      setTimeout(() => {
        {
          input.setAttribute('value', e.target.value);
          const name = filterInputs[0].value;
          const phone = filterInputs[1].value;
          const about = filterInputs[2].value;
          const eyeColor = filterInputs[3].value;
          Array.from(rows).forEach(row => {
            if (
              row.cells[0].innerHTML.indexOf(name) == -1 ||
              row.cells[1].innerHTML.indexOf(phone) == -1 ||
              row.cells[2].innerHTML.indexOf(about) == -1 ||
              row.cells[3].innerHTML.indexOf(eyeColor) == -1
            ) {
              row.classList.add('hide');
            } else {
              row.classList.remove('hide');
            }
          });
        }
      }, 1000),
    );
  });
};
