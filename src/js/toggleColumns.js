/**
 *
 * @param {*} param0 hiddenColumns - массив в который будут помещаться ключи с скрытыми колнками
 * @param {*} callback функция которая обновляет всю таблицу в завсимости от того, какие колонки есть в hiddenColumns
 *
 * Массив hiddenColumns копируется и проверяется на наличие определенного столбца,
 * если есть совпадения, то название колонки помещяется в массив newHiddenColumns,
 * если нет, то newHiddenColumns фильтруется и остаются только те столбцы, которые уже есть в массиве
 *
 * Далее мы передаем новый массив в колбэк который отрисовывает новую таблицу
 */
export const initToggleColumns = ({ hiddenColumns }, callback) => {
  const checkboxElements = document.querySelectorAll('#toggleColumns .check_box');
  let newHiddenColumns = [...hiddenColumns];

  Array.from(checkboxElements).forEach(checkboxElement => {
    checkboxElement.addEventListener('change', () => {
      const columnName = checkboxElement.getAttribute('data-name');

      if (newHiddenColumns.includes(columnName)) {
        newHiddenColumns = newHiddenColumns.filter(column => column !== columnName);
      } else {
        newHiddenColumns.push(columnName);
      }
      callback(newHiddenColumns);
    });
  });
};
