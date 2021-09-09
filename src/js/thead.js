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

  data.map(key => {
    if (key !== 'id') {
      const th = document.createElement('th');
      const text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  });
};

export default generateThead;
