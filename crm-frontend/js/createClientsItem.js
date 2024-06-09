import { deleteClientItem } from './clientsApi.js';
import { deleteClientModal } from './deleteModal.js';
import { editClientModal } from './editClients.js';
import { svgSpinnerLoad } from './svg.js';
import { createContactLink } from './utils.js';

export function createClientItem(data) {
  const clientTr = document.createElement('tr');
  const clientId = document.createElement('td');
  const clientFullName = document.createElement('td');
  const clientCreated = document.createElement('td');
  const clientChanged = document.createElement('td');
  const createdDate = document.createElement('span');
  const createdTime = document.createElement('span');
  const changedDate = document.createElement('span');
  const changedTime = document.createElement('span');
  const clientContacts = document.createElement('td');
  const clientContactsWrapp = document.createElement('div');
  const clientActions = document.createElement('td');
  const clientEdit = document.createElement('button');
  const clientDelete = document.createElement('button');
  const editSpinner = document.createElement('span');
  const deleteSpinner = document.createElement('span');
  const clientContactsBtn = document.createElement('button');
  const clientActionsWrapp = document.createElement('div');

  clientActionsWrapp.classList.add('client__actions-wrapp');
  clientContactsBtn.classList.add('client__contacts_btn');
  editSpinner.classList.add('actions__spinner', 'edit__spinner');
  deleteSpinner.classList.add('actions__spinner', 'delete__spinner');
  clientTr.classList.add('table__row');
  clientId.classList.add('client__id');
  clientFullName.classList.add('client__full-name');
  clientCreated.classList.add('client__created');
  createdDate.classList.add('created__date');
  createdTime.classList.add('created__time');
  clientChanged.classList.add('client__changed');
  changedDate.classList.add('changed__date');
  changedTime.classList.add('changed__time');
  clientContacts.classList.add('client_contacts');
  clientContactsWrapp.classList.add('client_contacts-wrapp');
  clientActions.classList.add('client_actions');
  clientEdit.classList.add('client__edit');
  clientDelete.classList.add('client__delete');

  clientEdit.addEventListener('click', () => {
    editSpinner.style.display = 'block';
    clientEdit.classList.add('action-wait');
    clientEdit.style.color = 'var(--color-violet)';
    setTimeout(() => {
      const editModal = editClientModal(data);
      document.body.append(editModal.editModal);
      clientEdit.style.color = 'var(--color-black)';
      editSpinner.style.display = 'none';
      clientEdit.classList.remove('action-wait');
    }, 1000);
  });

  clientDelete.addEventListener('click', () => {
    const deleteModal = deleteClientModal();
    deleteModal.deleteModalDelete.addEventListener('click', () => {
      try {
        deleteModal.svgSpinner.style.display = 'block';
        setTimeout(() => {
          deleteClientItem(data.id);
          document.getElementById(data.id).remove();
          deleteModal.deleteModal.remove();
        }, 1000);
      } catch (error) {
        alert(error);
      } finally {
        setTimeout(() => {
          deleteModal.svgSpinner.style.display = 'none';
        }, 1000);
      }
    });
    deleteSpinner.style.display = 'block';
    clientDelete.classList.add('action-wait');
    clientDelete.style.color = 'var(--color-red-errors)';
    setTimeout(() => {
      document.body.append(deleteModal.deleteModal);
      deleteSpinner.style.display = 'none';
      clientDelete.style.color = 'var(--color-black)';
      clientDelete.classList.remove('action-wait');
    }, 1000);
  });

  if (data.contacts.length > 5) {
    for (let i = 0; i < 4; i++) {
      let contact = data.contacts[i];
      createContactLink(contact.type, contact.value, clientContactsWrapp);
    }
    clientContactsWrapp.append(clientContactsBtn);
    clientContactsBtn.textContent = `+${data.contacts.length - 4}`;
  } else {
    for (const contact of data.contacts) {
      createContactLink(contact.type, contact.value, clientContactsWrapp);
    }
  }

  clientContactsBtn.addEventListener('click', () => {
    for (let i = 4; i < data.contacts.length; i++) {
      let contact = data.contacts[i];
      createContactLink(contact.type, contact.value, clientContactsWrapp);
    }
    clientContactsBtn.remove();
  });

  function formatDate(date) {
    const newDate = new Date(date);
    const normDate = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    return newDate.toLocaleString('ru', normDate);
  }

  function formatTime(date) {
    const newDate = new Date(date);
    const normDate = {
      hour: 'numeric',
      minute: 'numeric',
    };

    return newDate.toLocaleString('ru', normDate);
  }

  editSpinner.innerHTML = svgSpinnerLoad;
  deleteSpinner.innerHTML = svgSpinnerLoad;
  clientTr.id = data.id;
  clientId.textContent = data.id.substring(0, 6);
  clientFullName.textContent = `${data.surname} ${data.name} ${data.lastName}`;
  clientEdit.textContent = 'Изменить';
  clientDelete.textContent = 'Удалить';
  createdDate.textContent = formatDate(data.createdAt);
  createdTime.textContent = formatTime(data.createdAt);
  changedDate.textContent = formatDate(data.updatedAt);
  changedTime.textContent = formatTime(data.updatedAt);

  clientContacts.append(clientContactsWrapp);
  clientEdit.append(editSpinner);
  clientDelete.append(deleteSpinner);
  clientCreated.append(createdDate, createdTime);
  clientChanged.append(changedDate, changedTime);
  clientActionsWrapp.append(clientEdit, clientDelete);
  clientActions.append(clientActionsWrapp);
  clientTr.append(
    clientId,
    clientFullName,
    clientCreated,
    clientChanged,
    clientContacts,
    clientActions
  );

  return clientTr;
}
