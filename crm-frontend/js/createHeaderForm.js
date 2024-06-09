export function createHeaderForm() {
  const container = document.getElementById('container_header');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const inner = document.createElement('inner');
  const findList = document.createElement('ul');

  findList.classList.add('find-list', 'hide');
  form.classList.add('header__form');
  input.classList.add('header__search');
  inner.classList.add('header__inner');
  input.id = 'inputSearch';
  input.type = 'text';
  input.placeholder = 'Введите запрос';
  findList.id = 'findList';

  inner.append(input, findList);
  form.append(inner);
  container.append(form);
}
