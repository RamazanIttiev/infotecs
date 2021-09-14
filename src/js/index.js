import { people } from './mock.js';
import generateThead from './thead.js';
import generateFilter from './filter.js';
import toggleColumns from './toggleColumns.js';
import generateTbody from './tbody.js';
import setupPagination from './setupPagination.js';

const data = Object.keys(people[0]).slice(1);

let currentPage = 1;
let rowsPerPage = 10;

generateThead(data);
generateFilter(data);
generateTbody(people, rowsPerPage, currentPage);
setupPagination(people, rowsPerPage, currentPage);
toggleColumns();
