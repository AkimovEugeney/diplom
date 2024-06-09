import { createContactItem } from './createContact.js';
import { svgSpinnerLoad } from './svg.js';

export function createModalForms() {
  const title = document.createElement('h2');
  const close = document.createElement('button');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const labelName = document.createElement('label');
  const inputSurname = document.createElement('input');
  const labelSurname = document.createElement('label');
  const inputLastname = document.createElement('input');
  const labelLastname = document.createElement('label');
  const requiredName = document.createElement('span');
  const requiredSurname = document.createElement('span');
  const addContactBtn = document.createElement('button');
  const saveBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');
  const contactsBlock = document.createElement('div');
  const contactsInner = document.createElement('div');
  const formFloatingName = document.createElement('div');
  const formFloatingSurname = document.createElement('div');
  const formFloatingLastname = document.createElement('div');
  const svgSpinner = document.createElement('span');

  const errorBlock = document.createElement('p');
  const unacceptabletLetter = document.createElement('span');
  const writeName = document.createElement('span');
  const writeSurname = document.createElement('span');
  const writeLastname = document.createElement('span');
  const requredValue = document.createElement('span');
  const requredContacts = document.createElement('span');

  contactsInner.classList.add('contacts__inner');
  svgSpinner.classList.add('modal__spinner');
  title.classList.add('modal__title');
  close.classList.add('modal__close', 'btn-reset');
  form.classList.add('modal__form');
  formFloatingName.classList.add('form-floating');
  formFloatingSurname.classList.add('form-floating');
  formFloatingLastname.classList.add('form-floating');
  inputName.classList.add('modal__input');
  inputSurname.classList.add('modal__input');
  inputLastname.classList.add('modal__input');
  labelName.classList.add('modal__label');
  labelSurname.classList.add('modal__label');
  labelLastname.classList.add('modal__label');
  requiredName.classList.add('modal__label');
  requiredSurname.classList.add('modal__label');
  addContactBtn.classList.add(
    'modal__btn-contact',
    'modal__btn-contact_active'
  );
  saveBtn.classList.add('modal__btn-save', 'btn-reset');
  cancelBtn.classList.add('modal__btn-cancel', 'btn-reset');
  close.classList.add('modal__close');
  contactsBlock.classList.add('modal__contact');

  labelName.for = 'floatingName';
  labelSurname.for = 'floatingSurname';
  labelLastname.for = 'floatingLastnname';
  inputName.id = 'floatingName';
  inputSurname.id = 'floatingSurname';
  inputLastname.id = 'floatingLastname';
  inputName.type = 'text';
  inputSurname.type = 'text';
  inputLastname.type = 'text';
  inputName.placeholder = 'Имя';
  inputSurname.placeholder = 'Фамилия';
  inputLastname.placeholder = 'Отчество';

  errorBlock.classList.add('modal__error');
  unacceptabletLetter.id = 'unacceptabletLetter';
  writeName.id = 'writeName';
  writeSurname.id = 'writeSurname';
  writeLastname.id = 'writeLastname';
  requredValue.id = 'requredValue';
  requredContacts.id = 'requredContacts';

  svgSpinner.innerHTML = svgSpinnerLoad;
  title.textContent = 'Новый клиент';
  labelName.textContent = 'Имя';
  labelSurname.textContent = 'Фамилия';
  labelLastname.textContent = 'Отчество';
  addContactBtn.textContent = 'Добавить контакт';
  saveBtn.textContent = 'Сохранить';
  cancelBtn.textContent = 'Отмена';
  requiredName.textContent = '*';
  requiredSurname.textContent = '*';

  labelName.append(requiredName);
  saveBtn.append(svgSpinner);
  labelSurname.append(requiredSurname);
  formFloatingName.append(inputName, labelName);
  formFloatingSurname.append(inputSurname, labelSurname);
  formFloatingLastname.append(inputLastname, labelLastname);
  contactsBlock.append(addContactBtn);
  errorBlock.append(
    writeName,
    writeSurname,
    writeLastname,
    requredValue,
    requredContacts,
    unacceptabletLetter
  );
  form.append(
    formFloatingName,
    formFloatingSurname,
    formFloatingLastname,
    contactsBlock,
    errorBlock,
    saveBtn,
    cancelBtn
  );

  addContactBtn.addEventListener('click', e => {
    e.preventDefault();

    if (!contactsBlock.contains(contactsInner)) {
      contactsBlock.prepend(contactsInner);
      addContactBtn.style.paddingTop = '15px';
    }

    const contactsItems = document.getElementsByClassName('contact');

    if (contactsItems.length < 9) {
      const contactItem = createContactItem();
      contactsInner.append(contactItem.contact);
      contactsBlock.style.backgroundColor = 'rgb(200, 197, 209, 0.2)';
      if (contactsItems.length >= 5) {
        contactsInner.style.overflowY = 'auto';
        contactsInner.style.overflowX = 'hidden';
        contactsInner.style.maxHeight = '248px';
        contactsInner.style.paddingRight = '4px';

        let afterContact = contactsItems[contactsItems.length - 1];
        let afterContactType = afterContact.children[0];

        afterContactType.children[1].style.top = '-142px';

        afterContact = contactsItems[contactsItems.length - 2];
        afterContactType = afterContact.children[0];
        afterContactType.children[1].style.top = '-142px';

        afterContact = contactsItems[contactsItems.length - 3];
        afterContactType = afterContact.children[0];
        afterContactType.children[1].style.top = '36px';

        if (window.innerHeight <= 750) {
          document.querySelector('.site-modal__content').style.top = '20%';
        }
        if (window.innerHeight <= 653) {
          document.querySelector('.site-modal__content').style.top = '30%';
        }
      } else {
        document.querySelector('.site-modal__content').style.top = '0%';
      }
    } else {
      const contactItem = createContactItem();
      contactsInner.append(contactItem.contact);
      addContactBtn.classList.remove('modal__btn-contact_active');
    }

    if (contactsItems.length == 10) {
      let afterContact = contactsItems[contactsItems.length - 1];
      let afterContactType = afterContact.children[0];
      afterContactType.children[1].style.top = '-142px';
  
      afterContact = contactsItems[contactsItems.length - 2];
      afterContactType = afterContact.children[0];
      afterContactType.children[1].style.top = '-142px';
  
      afterContact = contactsItems[contactsItems.length - 3];
      afterContactType = afterContact.children[0];
      afterContactType.children[1].style.top = '36px';
    }
  });

  return {
    form,
    close,
    title,
    cancelBtn,
    inputName,
    inputSurname,
    inputLastname,
    labelName,
    labelSurname,
    labelLastname,
    contactsBlock,
    addContactBtn,
  };
}
