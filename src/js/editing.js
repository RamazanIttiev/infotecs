/**
 *
 * @param {*} row Все строки в виде html элементов
 * @param {*} data Все строки в виде объектов
 * @param {*} hiddenColumns Скрытые столбцы (для повторной отрисовки после редактирования)
 * @param {*} callback Функция обновляющая строку
 *
 * Создаю 2 кнопки (1 скрываю)
 *
 * В каждом обработчике получаю и в переменную cellElements ячейки текущей строки
 *
 * Далее по клику добавляю элемент contentEditable и меняю кнопки местами
 * делаю тоже самое с другой кнопкой, только уже убираю атрибут contentEditable
 *
 * Во 2 обработчике в константу newData кладу копию редактируемой строки (объект)
 * В cellElements помещаю ячейки текущей строки
 *
 * Переменной cellName присваиваю имя каждой ячекйи по атрибуту data-name
 *
 * После проверки меняю измененные значения в newData и передаю их в callback,
 * который вызывает метод updateRow в файле table.js
 *
 * Так как updataRow возврощяет нам строку только с ячейками, нам надо повторно отрисовать кнопки
 * и поменять их местами для повторного редактирования
 */
const generateEditBtn = (row, data, hiddenColumns, callback) => {
  const editBtn = document.createElement('button');
  const doneBtn = document.createElement('button');
  const editImg = document.createElement('img');
  const doneImg = document.createElement('img');

  editImg.src = '../../assets/edit.svg';
  doneImg.src = '../../assets/checked.svg';
  editBtn.classList.add('edit__btn');
  doneBtn.classList.add('edit__btn', 'hide');

  editBtn.appendChild(editImg);
  doneBtn.appendChild(doneImg);
  row.appendChild(editBtn);
  row.appendChild(doneBtn);

  editBtn.addEventListener('click', e => {
    const cellElements = e.currentTarget.parentElement.children;

    Array.from(cellElements).forEach(cellElement => {
      if (cellElement.tagName !== 'BUTTON') {
        cellElement.setAttribute('contentEditable', true);
      }
      if (cellElement.className === 'about__col') {
        cellElement.style.minHeight = '250px';
      }
    });

    editBtn.classList.add('hide');
    doneBtn.classList.remove('hide');
  });

  doneBtn.addEventListener('click', e => {
    const newData = { ...data };

    const cellElements = e.currentTarget.parentElement.children;

    Array.from(cellElements).forEach(cellElement => {
      const cellName = cellElement.getAttribute('data-name');

      if (cellElement.tagName !== 'BUTTON') {
        cellElement.removeAttribute('contentEditable');
      }
      if (cellElement.className === 'about__col') {
        cellElement.style.minHeight = 'unset';
      }
      if (cellName !== 'name' && cellElement.tagName !== 'BUTTON') {
        newData[cellName] = cellElement.innerText;
      }
      if (cellName === 'name') {
        const nameArr = cellElement.innerText.split(' ');
        newData[cellName].firstName = nameArr[0];
        newData[cellName].lastName = nameArr[1];
      }
    });

    callback(row, newData, hiddenColumns);

    row.appendChild(editBtn);
    row.appendChild(doneBtn);

    editBtn.classList.remove('hide');
    doneBtn.classList.add('hide');
  });
};

/**
 *
 * @param {*} state Настройки приложения
 * @param {*} callback Функция обновляющая строку
 *
 * Функция отрисовыввает кнопки и передает необходимые параметры для дальнейшей работы
 */
export const initEditing = (state, callback) => {
  const rows = state.containerElement.querySelectorAll('.tbody__row');

  Array.from(rows).forEach((row, index) => {
    if (row.children.length !== 0) {
      generateEditBtn(row, state.data[index], state.hiddenColumns, callback);
    }
  });
};
