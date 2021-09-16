/**
 * Функция задает цвет соответствующий значению ячейки
 */
const generateCellColor = () => {
  const eyeColor = document.getElementsByClassName('eyeColor__col');

  const colorDiv = document.createElement('div');
  colorDiv.classList.add('eye__color');

  for (let i = 0; i < eyeColor.length; i++) {
    eyeColor[i].style.borderRight = `1px solid ${eyeColor[i].innerText}`;
  }
};

export default generateCellColor;
