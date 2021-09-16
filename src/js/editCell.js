/**
 *
 * @param {*} row Текущая строка
 *
 * Создаю 2 кнопки (1 скрываю)
 *
 * в переменную currentRowChildren присваиваю td нашей строки
 *
 * Далее по клику добавляю элемент contentEditable и меняб кнопки местами
 * делаю тоже самое с другой кнопкой, только уже убираю атрибут contentEditable
 */
const generateEditBtn = row => {
  const editBtn = document.createElement('button');
  const doneBtn = document.createElement('button');
  const editImg = document.createElement('img');
  const doneImg = document.createElement('img');

  editImg.src = '../../public/edit.svg';
  doneImg.src = '../../public/checked.svg';
  editBtn.classList.add('table__btn');
  doneBtn.classList.add('table__btn', 'hide');

  editBtn.appendChild(editImg);
  doneBtn.appendChild(doneImg);
  row.appendChild(editBtn);
  row.appendChild(doneBtn);

  editCell(editBtn, doneBtn);
  submitCell(editBtn, doneBtn);
};

const editCell = (editBtn, doneBtn) => {
  editBtn.addEventListener('click', e => {
    let currentRowChildren = e.currentTarget.parentElement.children;
    for (let i = 0; i < currentRowChildren.length - 1; i++) {
      if (currentRowChildren[i].tagName !== 'BUTTON') {
        currentRowChildren[i].setAttribute('contentEditable', true);
      }
      if (currentRowChildren[i].className === 'about__col') {
        currentRowChildren[i].style.display = 'block';
      }
    }
    editBtn.classList.add('hide');
    doneBtn.classList.remove('hide');
    doneBtn.classList.add('show');
  });
};

const submitCell = (editBtn, doneBtn) => {
  doneBtn.addEventListener('click', e => {
    let currentRowChildren = e.currentTarget.parentElement.children;
    for (let i = 0; i < currentRowChildren.length - 1; i++) {
      if (currentRowChildren[i].tagName !== 'BUTTON') {
        currentRowChildren[i].removeAttribute('contentEditable');
      }
      if (currentRowChildren[i].className === 'about__col') {
        currentRowChildren[i].style.display = '-webkit-box';
      }
    }
    editBtn.classList.remove('hide');
    doneBtn.classList.add('hide');
  });
};

export default generateEditBtn;
