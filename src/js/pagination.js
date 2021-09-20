export const initPagination = ({ data, rowsPerPage, currentPage, hiddenColumns }, callback) => {
  const paginationElement = document.getElementById('pagination');

  let pageCount = Math.ceil(data.length / rowsPerPage);

  for (let i = 1; i < pageCount + 1; i++) {
    let btn = paginationButton(i, data, rowsPerPage, currentPage, hiddenColumns, callback);
    paginationElement.appendChild(btn);
  }

  return paginationElement;
};

const paginationButton = (page, data, rowsPerPage, currentPage, hiddenColumns, callback) => {
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

    callback({ data, rowsPerPage, currentPage, hiddenColumns });
  });

  return pageBtn;
};
