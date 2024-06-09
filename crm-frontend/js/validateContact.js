export function validateClientContact(contactType, contactInput) {
  const writeValue = document.getElementById('writeName');
  const onlyNumbers = /[0-9]+$/g;
  const onlyEmail = /[^a-zA-Z|@|.]+$/g;

  function onInputValue(input) {
    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--color-gray)';
      writeValue.textContent = '';
    });

    input.oncut =
      input.oncopy =
      input.onpaste =
        () => {
          input.style.borderColor = 'var(--color-gray)';
          input.style.borderColor = 'var(--color-gray)';
          writeValue.textContent = '';
        };
  }

  function showErrorMessage(message, block, input) {
    block.textContent = message;
    input.style.borderColor = 'var(--color-gray)';
  }

  onInputValue(contactInput);

  if (!contactInput.value) {
    showErrorMessage('Заполните все поля контактов!', writeValue, contactInput);
    return false;
  }

  switch (contactType.innerHTML) {
    case 'Телефон':
      if (onlyNumbers.test(onInputValue)) {
        showErrorMessage('Неверный телефон', writeValue, contactInput);
        return false;
      } else if (contactInput.value.length !== 11) {
        showErrorMessage('Неверный телефон', writeValue, contactInput);
        return false;
      }
      return true;
    case 'Доп. телефон':
      if (onlyNumbers.test(onInputValue)) {
        showErrorMessage('Неверный телефон', writeValue, contactInput);
        return false;
      } else if (contactInput.value.length !== 11) {
        showErrorMessage('Неверный телефон', writeValue, contactInput);
        return false;
      }
      return true;
    case 'Email':
      if (onlyEmail.test(contactInput.value)) {
        showErrorMessage('Неверный email', writeValue, contactInput);
        return false;
      }
      return true;
    default:
      return true;
  }
}
