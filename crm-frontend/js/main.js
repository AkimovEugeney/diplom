import { addClientModal } from './addClient.js';
import { getClients } from './clientsApi.js';
import { createClientItem } from './createClientsItem.js';
import { createHeaderForm } from './createHeaderForm.js';
import { createPreload } from './preloader.js';
import { searchClients } from './searchClient.js';
import { sortTable } from './sortClientsTable.js';
(() => {
  const tbody = document.querySelector('.table__body');
  const preloader = createPreload();
  tbody.append(preloader);

  async function createApp() {
    const btnAddClients = document.getElementById('btn__add-clients');

    btnAddClients.addEventListener('click', () => {
      document.body.append(addClientModal());
      document.body.classList.add('modal-open');
    });
    createHeaderForm();

    try {
      const clients = await getClients();
      searchClients(clients);
      setTimeout(() => {
        for (const client of clients) {
          tbody.append(createClientItem(client));
        }
      }, 1000);
    } catch (error) {
      alert(error);
    } finally {
      setTimeout(() => preloader.remove(), 1000);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    createApp();
    sortTable();
  });
})();
