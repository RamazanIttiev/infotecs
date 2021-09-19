import { initEditing } from './editing.js';
import { people } from './mock.js';
import { generateTable, updateRow } from './table.js';
import { initToggleColumns } from './toggleColumns.js';

const initApp = ({
  currentPage = 1,
  rowsPerPage = 10,
  data,
  toggleColumns,
  edit,
  containerElement,
}) => {
  const state = {
    hiddenColumns: [],
    currentPage,
    rowsPerPage,
    toggleColumns: {
      selector: '',
      enabled: false,
    },
    // filters: filters,
    data: [...data],
    containerElement,
  };

  state.containerElement.appendChild(generateTable({ ...state }));

  if (toggleColumns.enabled) {
    initToggleColumns(state, hiddenColumns => {
      state.hiddenColumns = hiddenColumns;
      state.containerElement.innerHTML = '';

      state.containerElement.appendChild(generateTable({ ...state }));
      // if (edit.enabled) {
      //   initEditing(state, (row, data) => {
      //     state.data = data;
      //     console.log(hiddenColumns);

      //     updateRow(row, data);
      //   });
      // }
    });
  }

  // if (filters.enabled) {
  //   initFilters(toggleColumns, filters => {
  //     state.filters = filters;

  //     containerElement.appendChild(generateTable({ ...state }));
  //   });
  // }

  if (edit.enabled) {
    initEditing(state, (row, data) => {
      state.data = data;
      updateRow(row, data);
    });
  }
};

initApp({
  data: people,
  toggleColumns: {
    enabled: true,
    selector: '#toggleColumns',
  },
  // filters: {
  //   enabled: true,
  //   values: {
  //     name: null,
  //     phone: null,
  //     about: null,
  //     color: null,
  //   },
  // },
  edit: {
    enabled: true,
  },
  containerElement: document.querySelector('#container'),
});
