/**
 * Функция срывает или показыват выбранную колонку
 *
 * циклом проходимся по чекбоксам и вешаем обработку события клика на каждый чекбокс,
 *
 * Если в полях фильтрации было введено значение, то при переключении обнуляю его
 * (inputsValue[i].value = '')
 *
 *
 * Далее, если значение инпута == hide, то получаю нужные ячейки по классам и скрваю их помощью класса hide
 * если нет, то убираю класс hide
 */
const toggleColumns = () => {
  const checkboxes = document.querySelectorAll('.check_box input');
  const inputsValue = document.querySelectorAll('.tbody__inputTd input');
  const HIDE = 'hide';

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', event => {
      const headElems = document.getElementsByClassName(`${event.target.id}_head`)[0];
      const inputElems = document.getElementsByClassName(`${event.target.id}_input`)[0];

      for (let i = 0; i < inputsValue.length; i++) {
        inputsValue[i].value = '';
      }

      const peopleTd = document.getElementsByClassName(event.target.id);

      if (checkboxes[i].value === HIDE) {
        for (let i = 0; i < peopleTd.length; i++) {
          peopleTd[i].classList.add(HIDE);
        }
        headElems.classList.add(HIDE);
        inputElems.classList.add(HIDE);
        checkboxes[i].value = 'show';
      } else {
        for (let i = 0; i < peopleTd.length; i++) {
          peopleTd[i].classList.remove(HIDE);
        }
        headElems.classList.remove(HIDE);
        inputElems.classList.remove(HIDE);
        checkboxes[i].value = HIDE;
      }
    });
  }
};

export default toggleColumns;
