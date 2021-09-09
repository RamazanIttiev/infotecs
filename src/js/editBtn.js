const generateEditBtn = row => {
  // Добавляю кнопку редактирования строки

  const editBtn = document.createElement('button');
  const editImg = document.createElement('img');

  editImg.src = '../public/edit.svg';
  editBtn.classList.add('edit__btn');
  editBtn.appendChild(editImg);
  row.appendChild(editBtn);
};

export default generateEditBtn;
