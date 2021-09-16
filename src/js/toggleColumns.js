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
  const inputsValue = document.querySelectorAll('tbody__inputTd');

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', e => {
      for (let i = 0; i < inputsValue.length; i++) {
        inputsValue[i].value = '';
      }

      const peopleTd = document.getElementsByClassName(e.target.id);

      if (checkboxes[i].value === 'hide') {
        for (let z = 0; z < peopleTd.length; z++) {
          peopleTd[z].classList.add('hide');
        }
        document.getElementsByClassName(`${e.target.id}_head`)[0].classList.add('hide');
        document.getElementsByClassName(`${e.target.id}_input`)[0].classList.add('hide');
        checkboxes[i].value = 'show';
      } else {
        for (let z = 0; z < peopleTd.length; z++) {
          peopleTd[z].classList.remove('hide');
        }
        document.getElementsByClassName(`${e.target.id}_head`)[0].classList.remove('hide');
        document.getElementsByClassName(`${e.target.id}_input`)[0].classList.remove('hide');
        checkboxes[i].value = 'hide';
      }
    });
  }
};

export default toggleColumns;
