/**
 *
 * @param {*} table Наша таблица прописанная в html файле
 * @param {*} data Ключи объектов в массиве данных (const data = Object.keys(people[0]))
 *
 * Функция рендерит шапку таблицы
 *
 * const thead = table.createTHead()
 * const row = thead.insertRow();
 *
 * создают теги thead и tr
 *
 * Далее циклом пробегаюсь по массиву ключей и записываю элементы в тег th
 */
const generateThead = (table, data) => {
  const thead = table.createTHead();
  const row = thead.insertRow();

  data.map(key => {
    const th = document.createElement('th');
    const text = document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1));
    th.appendChild(text);
    th.classList.add(`${key}__head`);
    row.appendChild(th);
  });
};

export default generateThead;
