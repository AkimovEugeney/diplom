import { sendClientData } from './clientsApi.js';
import { createClientItem } from './createClientsItem.js';
import { createModalForms } from './createModal.js';
import { validateClientContact } from './validateContact.js';
import { validationClientForm } from './validationForm.js';

export function addClientModal() {
  const createForm = createModalForms();
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');

  modal.classList.add('modal', 'site-modal', 'modal_active');
  modalContent.classList.add(
    'modal__content',
    'site-modal__content',
    'modal_active'
  );
  createForm.form.classList.add('add-client');

  modalContent.append(createForm.close, createForm.title, createForm.form);
  modal.append(modalContent);

  createForm.form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validationClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contacts = [];
    let clientObj = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    clientObj.name = createForm.inputName.value;
    clientObj.surname = createForm.inputSurname.value;
    clientObj.lastName = createForm.inputLastname.value;
    clientObj.contacts = contacts;

    const spinner = document.querySelector('.modal__spinner');
    try {
      spinner.style.display = 'block';
      const data = await sendClientData(clientObj, 'POST');
      setTimeout(() => {
        document.querySelector('.table__body').append(createClientItem(data));
        document.querySelector('.modal').remove();
      }, 1000);
    } catch (error) {
      alert(error);
    } finally {
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 1000);
    }
  });

  createForm.cancelBtn.addEventListener('click', () => {
    modal.remove();
  });

  createForm.close.addEventListener('click', () => {
    modal.remove();
  });

  document.addEventListener('click', e => {
    if (e.target == modal) {
      modal.remove();
    }
  });

  return modal;
}
