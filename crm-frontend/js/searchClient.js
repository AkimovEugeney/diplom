import { findClient } from './clientsApi.js';
import { createClientItem } from './createClientsItem.js';

export function searchClients(clients) {
  const findList = document.getElementById('findList');
  const input = document.getElementById('inputSearch');

  async function serchInTable(str) {
    const res = await findClient(str);
    const tbody = document.querySelector('.table__body');
    tbody.innerHTML = '';
    findList.innerHTML = '';

    for (const client of res) {
      const findItem = document.createElement('li');
      const findLink = document.createElement('a');

      findItem.classList.add('find-list__item');
      findLink.classList.add('find-list__link');

      findLink.textContent = `${client.name} ${client.surname} ${client.lastName}`;
      findLink.href = '#!';

      findItem.append(findLink);
      findList.append(findItem);
      tbody.append(createClientItem(client));
    }
  }

  input.addEventListener('input', async () => {
    const value = input.value.trim();
    const findItems = document.querySelectorAll('.find-list__item');

    if (value != '') {
      await serchInTable(value);
      const findLinks = document.querySelectorAll('.find-list__link');
      findLinks.forEach(link => {
        if (!link.innerText.includes(value)) {
          link.classList.add('hide');
          link.innerHTML = link.innerText;
        } else {
          link.classList.remove('hide');
          findList.classList.remove('hide');
          const str = link.innerText;
          link.innerHTML = insertMark(str, str.indexOf(value), value.length);
        }
      });
    } else if (value == '') {
      findItems.forEach(item => {
        const tbody = document.querySelector('.table__body');
        tbody.innerHTML = '';
        clients.forEach(client => tbody.append(createClientItem(client)));

        item.remove();
        findList.classList.add('hide');
      });
    }
  });

  function insertMark(str, pos, len) {
    return (
      str.slice(0, pos) +
      '<mark>' +
      str.slice(pos, pos + len) +
      '</mark>' +
      str.slice(pos + len)
    );
  }
}
