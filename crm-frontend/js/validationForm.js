export function validationClientForm() {
  const userName = document.getElementById('floatingName');
  const userSurname = document.getElementById('floatingSurname');
  const userLastname = document.getElementById('floatingLastname');
  const unacceptabletLetter = document.getElementById('unacceptabletLetter');
  const writeName = document.getElementById('writeName');
  const writeSurname = document.getElementById('writeSurname');
  const writeLastname = document.getElementById('writeLastname');
  const requredValue = document.getElementById('requredValue');
  const validateArray = [
    unacceptabletLetter,
    writeName,
    writeSurname,
    writeLastname,
    requredValue,
  ];
  const regexp = /[^а-яА-яёЁ]+$/g;

  function onInputValue(input) {
    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--color-gray)';
      for (const item of validateArray) {
        item.textContent = '';
      }
    });

    input.oncut =
      input.oncopy =
      input.onpaste =
        () => {
          input.style.borderColor = 'var(--color-gray)';
          for (const item of validateArray) {
            item.textContent = '';
          }
        };

    input.onChange = () => {
      input.style.borderColor = 'var(--color-gray)';

      if (userSurname.value && userName.value && userLastname.value) {
        for (const item of validateArray) {
          item.textContent = '';
        }
      }
    };
  }

  onInputValue(userName);
  onInputValue(userSurname);
  onInputValue(userLastname);

  function checkRequiredName(input, message, name) {
    if (!input.value) {
      input.style.borderColor = 'var(--color-red-errors)';
      message.textContent = `Ошибка: Введите ${name} клиента`;
      return false;
    } else {
      message.textContent = '';
      return true;
    }
  }

  function checkByRegexp(input, regexp) {
    if (regexp.test(input.value)) {
      input.style.borderColor = 'var(--color-red-errors)';
      unacceptabletLetter.textContent = 'Ошибка: Недопустимые символы!';
      return false;
    }
    return true;
  }

  if (!checkRequiredName(userSurname, writeSurname, 'Фамилию')) {
    return false;
  }
  if (!checkRequiredName(userName, writeName, 'Имя')) {
    return false;
  }
  if (!checkRequiredName(userLastname, writeLastname, 'Отчество')) {
    return false;
  }
  if (!checkByRegexp(userName, regexp)) {
    return false;
  }
  if (!checkByRegexp(userSurname, regexp)) {
    return false;
  }
  if (!checkByRegexp(userLastname, regexp)) {
    return false;
  }

  return true;
}
