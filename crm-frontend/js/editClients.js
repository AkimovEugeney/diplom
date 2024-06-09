import { sendClientData } from './clientsApi.js';
import { createClientItem } from './createClientsItem.js';
import { createContactItem } from './createContact.js';
import { createModalForms } from './createModal.js';
import { deleteClientModal } from './deleteModal.js';
import { validateClientContact } from './validateContact.js';
import { validationClientForm } from './validationForm.js';

export function editClientModal(data) {
  const editModal = document.createElement('div');
  const editModalContent = document.createElement('div');
  const createForm = createModalForms();
  const titleId = document.createElement('span');

  titleId.classList.add('modal__id');
  editModal.classList.add('modal_edit', 'site-modal', 'modal_active');
  editModalContent.classList.add(
    'edit-modal__content',
    'site-modal__content',
    'modal_active'
  );

  titleId.textContent = 'ID: ' + data.id.substr(0, 6);
  createForm.title.textContent = 'Изменить данные';
  createForm.cancelBtn.textContent = 'Удалить клиента';

  createForm.cancelBtn.addEventListener('click', e => {
    e.preventDefault();

    editModal.classList.remove('modal_active');
    editModalContent.classList.remove('modal_active');

    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.deleteModal);

    import('./clientsApi.js').then(({ deleteClientItem }) => {
      deleteModal.deleteModalDelete.addEventListener('click', () => {
        deleteClientItem(data.id);
        document.getElementById(data.id).remove();
        deleteModal.deleteModal.remove();
        editModal.remove();
      });
    });
  });

  createForm.title.append(titleId);
  editModalContent.append(createForm.close, createForm.title, createForm.form);
  editModal.append(editModalContent);

  createForm.close.addEventListener('click', () => {
    editModal.remove();
  });

  createForm.inputName.value = data.name;
  createForm.inputSurname.value = data.surname;
  createForm.inputLastname.value = data.lastName;

  for (const contact of data.contacts) {
    const createContact = createContactItem();
    createContact.contactName.textContent = contact.type;
    createContact.contactInput.value = contact.value;

    createForm.contactsBlock.prepend(createContact.contact);
    createForm.contactsBlock.style.backgroundColor = 'rgba(200, 197, 209, 0.2)';
  }

  if (data.contacts.length === 10) {
    createForm.addContactBtn.classList.remove('modal__btn-contact_active');
  }

  createForm.form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validationClientForm()) {
      return;
    }

    const contactsTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contacts = [];
    let client = {};

    for (let i = 0; i < contactsTypes.length; i++) {
      if (!validateClientContact(contactsTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactsTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    client.name = createForm.inputName.value;
    client.surname = createForm.inputSurname.value;
    client.lastName = createForm.inputLastname.value;
    client.contacts = contacts;

    const spinner = document.querySelector('.modal__spinner');
    try {
      spinner.style.display = 'block';
      const editedData = await sendClientData(client, 'PATCH', data.id);
      setTimeout(() => {
        document.getElementById(editedData.id).remove();
        document
          .querySelector('.table__body')
          .append(createClientItem(editedData));
        document.querySelector('.modal_edit').remove();
      }, 1000);
    } catch (error) {
      alert(error);
    } finally {
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 1000);
    }
  });

  document.addEventListener('click', e => {
    if (e.target == editModal) {
      editModal.remove();
    }
  });

  return {
    editModal,
    editModalContent,
  };
}
