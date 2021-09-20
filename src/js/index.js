import { initEditing } from './editing.js';
import { initFilters } from './filter.js';
import { people } from './mock.js';
import { initPagination } from './pagination.js';
import { generateTable, updateRow } from './table.js';
import { initToggleColumns } from './toggleColumns.js';

const initApp = ({ currentPage = 1, rowsPerPage = 10, data, containerElement }) => {
  const state = {
    hiddenColumns: [],
    filters: {},
    currentPage,
    rowsPerPage,
    data: [...data],
    containerElement,
  };

  state.containerElement.appendChild(generateTable({ ...state }));

  initToggleColumns(state, hiddenColumns => {
    state.hiddenColumns = hiddenColumns;
    state.containerElement.querySelector('table').remove();

    state.containerElement.appendChild(generateTable({ ...state }));
    initEditing(state, (row, data) => {
      updateRow(row, data, hiddenColumns);
    });
  });

  initFilters(state, data => {
    state.filters = data;
    state.containerElement.querySelector('table').remove();

    state.containerElement.appendChild(generateTable({ ...state }));
    initEditing(state, (row, data, hiddenColumns) => {
      updateRow(row, data, hiddenColumns);
    });
  });

  initEditing(state, (row, data, hiddenColumns) => {
    updateRow(row, data, hiddenColumns);
  });

  initPagination(state, currentPage => {
    state.currentPage = currentPage;
    state.containerElement.querySelector('table').remove();

    state.containerElement.appendChild(generateTable({ ...state }));
    initEditing(state, (row, data) => {
      updateRow(row, data, hiddenColumns);
    });
  });
};

initApp({
  data: people,
  containerElement: document.querySelector('#container'),
});
