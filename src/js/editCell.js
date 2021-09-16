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

  editImg.src = '../../assets/edit.svg';
  doneImg.src = '../../assets/checked.svg';
  editBtn.classList.add('table__btn');
  doneBtn.classList.add('table__btn', 'hide');

  editBtn.appendChild(editImg);
  doneBtn.appendChild(doneImg);
  row.appendChild(editBtn);
  row.appendChild(doneBtn);

  editBtn.addEventListener('click', event => {
    let currentRowChildren = event.currentTarget.parentElement.children;
    let currentRow = event.currentTarget.parentElement;

    for (let i = 0; i < currentRowChildren.length - 1; i++) {
      if (currentRowChildren[i].tagName !== 'BUTTON') {
        currentRowChildren[i].setAttribute('contentEditable', true);
        currentRow.classList.add('edit__border');
      }
      if (currentRowChildren[i].className === 'about__col') {
        currentRowChildren[i].style.minHeight = '250px';
      }
    }
    editBtn.classList.add('hide');
    doneBtn.classList.remove('hide');
    doneBtn.classList.add('show');
  });

  doneBtn.addEventListener('click', event => {
    let currentRowChildren = event.currentTarget.parentElement.children;
    let currentRow = event.currentTarget.parentElement;

    for (let i = 0; i < currentRowChildren.length - 1; i++) {
      if (currentRowChildren[i].tagName !== 'BUTTON') {
        currentRowChildren[i].removeAttribute('contentEditable');
        currentRowChildren[i].classList.remove('edit__border');
        currentRow.classList.remove('edit__border');
      }
      if (currentRowChildren[i].className === 'about__col') {
        currentRowChildren[i].style.minHeight = 'unset';
      }
    }
    editBtn.classList.remove('hide');
    doneBtn.classList.add('hide');
  });
};

export default generateEditBtn;
