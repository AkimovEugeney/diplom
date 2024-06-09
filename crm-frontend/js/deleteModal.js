import { svgSpinnerLoad } from './svg.js';

export function deleteClientModal() {
  const deleteModal = document.createElement('div');
  const deleteModalContent = document.createElement('div');
  const title = document.createElement('h2');
  const close = document.createElement('button');
  const deleteModalDelete = document.createElement('button');
  const cancelBtn = document.createElement('button');
  const deleteModalText = document.createElement('p');
  const svgSpinner = document.createElement('span');

  svgSpinner.classList.add('modal__spinner');
  deleteModal.classList.add('modal_delete', 'site-modal', 'modal_active');
  deleteModalContent.classList.add(
    'delete-modal__content',
    'site-modal__content',
    'modal_active'
  );
  deleteModalDelete.classList.add('modal__btn-save', 'btn-reset');
  close.classList.add('modal__close', 'btn-reset');
  cancelBtn.classList.add('modal__btn-cancel', 'btn-reset');
  title.classList.add('modal__title', 'delete-modal__title');
  deleteModalText.classList.add('delete-modal__text');

  svgSpinner.innerHTML = svgSpinnerLoad;
  title.textContent = 'Удалить клиента';
  deleteModalDelete.textContent = 'Удалить';
  cancelBtn.textContent = 'Отмена';
  deleteModalText.textContent =
    'Вы действительно хотите удалить данного клиента?';

  function deleteModalEdit() {
    const modal = document.querySelector('.modal_edit');
    const content = document.querySelector('.edit-modal__content');
    if (modal) {
      modal.classList.add('modal_active');
      content.classList.add('modal_active');
    }
  }

  cancelBtn.addEventListener('click', () => {
    deleteModalEdit();
    deleteModal.remove();
  });

  close.addEventListener('click', () => {
    deleteModalEdit();
    deleteModal.remove();
  });

  document.addEventListener('click', e => {
    if (e.target == deleteModal) {
      deleteModalEdit();
      deleteModal.remove();
    }
  });

  deleteModalDelete.append(svgSpinner);
  deleteModalContent.append(
    title,
    close,
    deleteModalText,
    deleteModalDelete,
    cancelBtn
  );
  deleteModal.append(deleteModalContent);

  return {
    deleteModal,
    deleteModalDelete,
    svgSpinner,
  };
}
