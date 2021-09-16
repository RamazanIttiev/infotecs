import { people } from './mock.js';
import generateThead from './thead.js';
import generateFilter from './filter.js';
import toggleColumns from './toggleColumns.js';
import generateTbody from './tbody.js';
import setupPagination from './setupPagination.js';

const personKeys = Object.keys(people[0]).slice(1);

const initPagination = (currentPage, rowsPerPage) => {
  generateThead(personKeys);
  generateFilter(personKeys);
  generateTbody(people, rowsPerPage, currentPage);
  setupPagination(people, rowsPerPage, currentPage);
  toggleColumns();
};

initPagination(1, 10);
