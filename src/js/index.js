import { people } from './mock.js';
import generateThead from './thead.js';
import generateTbody from './tbody.js';
import generateFilter from './filter.js';

const table = document.querySelector('table');
const data = Object.keys(people[0]).slice(1);
generateFilter(table, data);
generateThead(table, data);
generateTbody(table, people);
