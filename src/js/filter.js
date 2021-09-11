const generateFilter = (table, data) => {
  const tbody = table.createTBody();
  const row = tbody.insertRow();

  data.map(key => {
    const input = document.createElement('input');
    input.placeholder = key;
    input.classList.add('td__input');
    input.setAttribute('type', key === 'phone' ? 'number' : 'text');

    const cell = row.insertCell();
    cell.classList.add('tbody__inputTd');
    cell.classList.add(`${key}__col_input`);

    cell.appendChild(input);

    filter(input);
  });
};

const filter = input => {
  const rows = document.getElementsByClassName('tbody__row');
  const inputs = document.getElementsByClassName('td__input');

  input.addEventListener('input', e => {
    input.setAttribute('value', e.target.value);

    // Прописать болле локаничным способом
    const name = inputs[0].value;
    const phone = inputs[1].value;
    const about = inputs[2].value;
    const eyeColor = inputs[3].value;

    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].cells[0].innerHTML.indexOf(name) == -1 ||
        rows[i].cells[1].innerHTML.indexOf(phone) == -1 ||
        rows[i].cells[2].innerHTML.indexOf(about) == -1 ||
        rows[i].cells[3].innerHTML.indexOf(eyeColor) == -1
      ) {
        rows[i].classList.add('hide');
      } else rows[i].classList.remove('hide');
    }
  });
};
export default generateFilter;
