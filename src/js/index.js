import { initEditing } from './editing.js';
import { initFilters } from './filter.js';
import { people } from './mock.js';
import { generatePagination } from './pagination.js';
import { generateTable, updateRow } from './table.js';
import { initToggleColumns } from './toggleColumns.js';

const initApp = ({
  currentPage = 1,
  rowsPerPage = 10,
  data,
  toggleColumns,
  edit,
  containerElement,
  filters,
}) => {
  const state = {
    hiddenColumns: [],
    currentPage,
    rowsPerPage,
    toggleColumns: {
      selector: '',
      enabled: false,
    },
    filters: filters,
    data: [...data],
    containerElement,
  };

  state.containerElement.appendChild(generateTable({ ...state }));

  if (toggleColumns.enabled) {
    initToggleColumns(state, hiddenColumns => {
      state.hiddenColumns = hiddenColumns;
      state.containerElement.innerHTML = '';

      state.containerElement.appendChild(generateTable({ ...state }));
      if (edit.enabled) {
        initEditing(state, (row, data) => {
          updateRow(row, data, hiddenColumns);
        });
      }
    });
  }

  if (filters.enabled) {
    initFilters();
  }

  if (edit.enabled) {
    initEditing(state, (row, data, hiddenColumns) => {
      updateRow(row, data, hiddenColumns);
    });
  }

  generatePagination(state, ({ data, rowsPerPage, currentPage, hiddenColumns }) => {
    state.containerElement.innerHTML = '';

    state.containerElement.appendChild(
      generateTable({ data, rowsPerPage, currentPage, hiddenColumns }),
    );
    if (edit.enabled) {
      initEditing(state, (row, data) => {
        updateRow(row, data, hiddenColumns);
      });
    }
  });
};

initApp({
  data: people,
  toggleColumns: {
    enabled: true,
    selector: '#toggleColumns',
  },
  filters: {
    enabled: true,
    values: {
      name: null,
      phone: null,
      about: null,
      color: null,
    },
  },
  edit: {
    enabled: true,
  },
  containerElement: document.querySelector('#container'),
});
