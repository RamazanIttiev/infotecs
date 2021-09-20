import { initEditing } from './editing.js';
import { initFilters } from './filter.js';
import { people } from './mock.js';
import { generateTable, updateRow } from './table.js';
import { initToggleColumns } from './toggleColumns.js';

const initApp = ({ currentPage = 1, rowsPerPage = 10, data, containerElement }) => {
  const state = {
    hiddenColumns: [],
    filteredTable: [],
    currentPage,
    rowsPerPage,
    data: [...data],
    containerElement,
  };

  state.containerElement.appendChild(generateTable({ ...state }));

  initToggleColumns(state, hiddenColumns => {
    state.hiddenColumns = hiddenColumns;
    state.containerElement.innerHTML = '';

    state.containerElement.appendChild(generateTable({ ...state }));
    initEditing(state, (row, data) => {
      updateRow(row, data, hiddenColumns);
    });
  });

  initFilters({ ...state }, row => {
    updateTbody(row);
  });

  initEditing(state, (row, data, hiddenColumns) => {
    updateRow(row, data, hiddenColumns);
  });

  initPagination(state, ({ data, rowsPerPage, currentPage, hiddenColumns }) => {
    state.containerElement.innerHTML = '';

    state.containerElement.appendChild(
      generateTable({ data, rowsPerPage, currentPage, hiddenColumns }),
    );
    initEditing(state, (row, data) => {
      updateRow(row, data, hiddenColumns);
    });
  });
};

initApp({
  data: people,
  containerElement: document.querySelector('#container'),
});
