/**
 *
 * @param {*} param0 state
 * @param {*} callback
 * @returns элемент пагинации
 *
 * pageCount определяет количество кнопок пагинации (окргление в большую сторону)
 *
 * Прохожусь по количеству кнопок и вызываю функцию для отрисовки отдельной кнопки (paginationButton)
 *
 *
 */
export const initPagination = ({ data, rowsPerPage, currentPage, hiddenColumns }, callback) => {
  const paginationElement = document.getElementById('pagination');

  let pageCount = Math.ceil(data.length / rowsPerPage);

  for (let i = 1; i < pageCount + 1; i++) {
    let btn = paginationButton(i, currentPage, callback);
    paginationElement.appendChild(btn);
  }

  return paginationElement;
};

/**
 *
 * @param {*} page Номер страницы
 * @param {*} data Массив данных (mock)
 * @param {*} rowsPerPage Строк на 1 страницу
 * @param {*} currentPage Исходная страница
 * @param {*} hiddenColumns Скрытые колонки
 * @param {*} callback
 * @returns Кнопку
 *
 * Создается кнопка
 *
 * Далее идет проверка, есил текущая страница совпадает с исходной, то кнопке добовляется активный класс
 *
 * При клике на кнопку очищаем чекбоксы
 * Присваиваем значение текущей страницы исходной
 *
 * Меняем класс активности при клике на другую кнопку
 *
 * И вызываем колбэк, который генерирует новую таблицу с обновленными строками
 */
const paginationButton = (page, currentPage, callback) => {
  const checkboxes = document.querySelectorAll('.check_box input');

  const pageBtn = document.createElement('button');
  pageBtn.classList.add('pageBtn');

  if (currentPage === page) pageBtn.classList.add('activePage');

  pageBtn.innerText = page;

  pageBtn.addEventListener('click', () => {
    Array.from(checkboxes).forEach(checkbox => {
      checkbox.checked = false;
    });

    currentPage = page;

    let currentPageBtn = document.querySelector('button.activePage');

    currentPageBtn.classList.remove('activePage');
    pageBtn.classList.add('activePage');

    callback(currentPage);
  });

  return pageBtn;
};
