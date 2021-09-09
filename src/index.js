let people = [
  {
    id: '5c2286fb23e87be312d55d9a',
    name: {
      firstName: 'Brooks',
      lastName: 'Stone',
    },
    phone: '+7 (843) 431-2190',
    about:
      'Qui aliquip esse occaecat voluptate cillum laborum do adipisicing ea. Lorem dolor pariatur exercitation et Lorem voluptate reprehenderit. Culpa nisi sunt laborum culpa eu et nulla aute aliqua commodo cupidatat culpa. Eu laboris dolor enim officia mollit labore proident proident tempor ex minim magna dolor. Ipsum cillum officia irure amet enim voluptate consequat deserunt laborum nulla excepteur pariatur voluptate incididunt. In excepteur adipisicing dolor ea occaecat elit. Irure dolor quis cillum minim voluptate.',
    eyeColor: 'blue',
  },
  {
    id: '5c2286fb7f4c26c63eff1b66',
    name: {
      firstName: 'Johnston',
      lastName: 'Tate',
    },
    phone: '+7 (939) 409-2841',
    about:
      'Eu ipsum est in exercitation voluptate occaecat fugiat fugiat ea elit ad veniam adipisicing ullamco. Laboris consectetur enim dolore amet exercitation sit non do reprehenderit non. Proident consequat anim non voluptate non culpa sit occaecat adipisicing. Reprehenderit dolor cillum laboris incididunt exercitation quis esse in ad ut voluptate commodo in. Exercitation veniam adipisicing irure ut qui nulla.',
    eyeColor: 'brown',
  },
];

/**
 *
 * @param {*} table Наша таблица прописанная в html файле
 * @param {*} data Ключи объектов в массиве данных (let data = Object.keys(people[0]))
 *
 * Функция рендерит шапку таблицы
 *
 * const thead = table.createTHead()
 * const row = thead.insertRow();
 *
 * создают теги thead и tr
 *
 * Далее циклом пробегаюсь по массиву ключей и проверяю, является ли элемент 'id',
 * если нет то записываю элементы в тег th
 */
const generateThead = (table, data) => {
  const thead = table.createTHead();
  const row = thead.insertRow();

  for (const key of data) {
    if (key !== 'id') {
      const th = document.createElement('th');
      const text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
};

/**
 * 
 * @param {*} table Наша таблица прописанная в html файле
 * @param {*} data Массив с данными пользователей
 * 
 * Функция рендерит тело таблицы
 * 
 * создается тег tbody (const tbody = document.createElement('tbody'))
 * и помещается в таблицу
 * 
 * Далее циклом прохожу по массиву и снова проверяю на айдишник, а также
 * на то, является ли ключ объектом, если нет, то записываю значение в ячейку,
 * а если да, то получаю значение этого объекта 'name' 
 * (const firstName = document.createTextNode(element[key].firstName);
    const lastName = document.createTextNode(element[key].lastName);
    const name = `${firstName.textContent} ${lastName.textContent}`;)
    
    и записываю его в ячейку с помощью innerHTML
 */
const generateTbody = (table, data) => {
  const tbody = document.createElement('tbody');

  table.appendChild(tbody);

  for (let element of data) {
    const row = tbody.insertRow();

    for (key in element) {
      if (key !== 'id' && typeof element[key] !== 'object') {
        const cell = row.insertCell();
        const text = document.createTextNode(element[key]);
        cell.appendChild(text);
      } else if (key !== 'id') {
        const cell = row.insertCell();
        const firstName = document.createTextNode(element[key].firstName);
        const lastName = document.createTextNode(element[key].lastName);

        const name = `${firstName.textContent} ${lastName.textContent}`;

        cell.innerHTML = name;
      }
    }

    const edit = document.createElement('img');

    edit.src = '../public/edit.svg';
    edit.classList.add('edit__icon');
    row.appendChild(edit);
  }
};

let table = document.querySelector('table');
let data = Object.keys(people[0]);
generateThead(table, data);
generateTbody(table, people);
