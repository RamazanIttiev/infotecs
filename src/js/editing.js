/**
 *
 * @param {*} row Текущая строка
 *
 * Создаю 2 кнопки (1 скрываю)
 *
 * в переменную cellElements присваиваю td нашей строки
 *
 * Далее по клику добавляю элемент contentEditable и меняб кнопки местами
 * делаю тоже самое с другой кнопкой, только уже убираю атрибут contentEditable
 */
const generateEditBtn = (row, data, callback) => {
  Array.from(row.querySelectorAll('.table__btn')).forEach(button => button.remove());

  const editBtn = document.createElement('button');
  const doneBtn = document.createElement('button');
  const editImg = document.createElement('img');
  const doneImg = document.createElement('img');

  editImg.src = '../../assets/edit.svg';
  doneImg.src = '../../assets/checked.svg';
  editBtn.classList.add('table__btn');
  doneBtn.classList.add('table__btn', 'hide');

  editBtn.appendChild(editImg);
  doneBtn.appendChild(doneImg);
  row.appendChild(editBtn);
  row.appendChild(doneBtn);

  editBtn.addEventListener('click', e => {
    let cellElements = e.currentTarget.parentElement.children;
    for (let i = 0; i < cellElements.length - 1; i++) {
      if (cellElements[i].tagName !== 'BUTTON') {
        cellElements[i].setAttribute('contentEditable', true);
      }
      if (cellElements[i].className === 'about__col') {
        cellElements[i].style.display = 'block';
      }
    }
    editBtn.classList.add('hide');
    doneBtn.classList.remove('hide');
    doneBtn.classList.add('show');
  });

  doneBtn.addEventListener('click', e => {
    const newData = { ...data };
    let cellElements = e.currentTarget.parentElement.children;
    for (let i = 0; i < cellElements.length - 1; i++) {
      const name = cellElements[i].getAttribute('data-name');

      if (cellElements[i].tagName !== 'BUTTON') {
        cellElements[i].removeAttribute('contentEditable');
      }
      if (cellElements[i].className === 'about__col') {
        cellElements[i].style.display = '-webkit-box';
      }
      // add else
      if (name !== 'name' && cellElements[i].tagName !== 'BUTTON') {
        newData[name] = cellElements[i].innerText;
      } else {
      }
    }
    editBtn.classList.remove('hide');
    doneBtn.classList.add('hide');

    callback(row, newData);
    row.appendChild(editBtn);
    row.appendChild(doneBtn);
  });
};

export const initEditing = (state, callback) => {
  const rows = state.containerElement.querySelectorAll('.tbody__row');

  Array.from(rows).forEach((row, index) => {
    generateEditBtn(row, state.data[index], callback);
  });
};
