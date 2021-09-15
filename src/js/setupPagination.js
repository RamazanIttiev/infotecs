import generateTbody from './tbody.js';

const setupPagination = (people, rowsPerPage, currentPage) => {
  const pagination = document.getElementById('pagination');

  let pageCount = Math.ceil(people.length / rowsPerPage);

  for (let i = 1; i < pageCount + 1; i++) {
    let btn = paginationButton(i, people, rowsPerPage, currentPage);
    pagination.appendChild(btn);
  }
};

const paginationButton = (page, people, rowsPerPage, currentPage) => {
  const inputsValue = document.querySelectorAll('tbody__inputTd');

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

    currentPage = page;
    generateTbody(people, rowsPerPage, currentPage);

    let currentPageBtn = document.querySelector('#pagination button.activePage');
    currentPageBtn.classList.remove('activePage');

    pageBtn.classList.add('activePage');
  });

  return pageBtn;
};

export default setupPagination;
