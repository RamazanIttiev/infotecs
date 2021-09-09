import { people } from './mock.js';
import generateThead from './thead.js';
import generateTbody from './tbody.js';

const table = document.querySelector('table');
const data = Object.keys(people[0]);
generateThead(table, data);
generateTbody(table, people);
