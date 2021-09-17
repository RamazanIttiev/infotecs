import generateFilter from './filter.js';
import generateTbody from './tbody.js';
import generateThead from './thead.js';

/**
 *
 * @param {*} people Массив с данными пользователей
 * @param {*} rowsPerPage Количество строк на странице
 * @param {*} currentPage Исходная страница
 *
 * В переменную pageCount кладу округленное в большую сторону значение
 * всех возможных страниц
 *
 * С помощью цикла прохожу по страницам и вызываю функцию, которая
 * отрисовывает кнопки пагинации
 */
const setupPagination = (people, rowsPerPage, currentPage, personKeys) => {
  const pagination = document.getElementById('pagination');

  let pageCount = Math.ceil(people.length / rowsPerPage);

  for (let i = 1; i < pageCount + 1; i++) {
    let btn = paginationButton(i, people, rowsPerPage, currentPage, personKeys);
    pagination.appendChild(btn);
  }
};

/**
 *
 * @param {*} page Текущая страница
 * @param {*} people Массив с данными пользователей
 * @param {*} rowsPerPage Количество строк на странице
 * @param {*} currentPage Исходная страница
 * @returns кнопки пагинации
 *
 * Сощдаю кнопку, она отрисовывается в цикле в функции setupPagination
 *
 * Далее, если текущая страница равна исходной, то присваиваю ей активный класс
 *
 * Если в полях фильтрации было введено значение, то при переключении обнуляю его
 * (inputsValue[i].value = '')
 *
 * После чего исходной странице присваиваю значение текущей и задаю правильные классы
 */
const paginationButton = (page, people, rowsPerPage, currentPage, personKeys) => {
  const inputsValue = document.querySelectorAll('.tbody__inputTd input');
  const checkboxes = document.querySelectorAll('.check_box input');

  const pageBtn = document.createElement('button');
  pageBtn.classList.add('pageBtn');

  if (currentPage == page) pageBtn.classList.add('activePage');

  pageBtn.innerText = page;
  pagination.appendChild(pageBtn);

  // переход по страницам по клику

  pageBtn.addEventListener('click', () => {
    for (let i = 0; i < inputsValue.length; i++) {
      inputsValue[i].value = '';
    }
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      checkboxes[i].value = 'hide';
    }

    currentPage = page;
    generateThead(personKeys);
    generateFilter(personKeys);
    generateTbody(people, rowsPerPage, currentPage);

    let currentPageBtn = document.querySelector('#pagination button.activePage');
    currentPageBtn.classList.remove('activePage');

    pageBtn.classList.add('activePage');
  });

  return pageBtn;
};

export default setupPagination;
