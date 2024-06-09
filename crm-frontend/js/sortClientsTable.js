export function sortTable() {
  const table = document.querySelector('.table');
  const headers = table.querySelectorAll('th');
  const tbody = table.querySelector('tbody');

  const directions = Array.from(headers).map(() => '');

  function transform(type, content) {
    switch (type) {
      case 'id':
        return content;
      case 'create':
      case 'update':
        return content.split('.').join('-');
      case 'text':
      default:
        return content;
    }
  }

  function sortColumn(index) {
    const type = headers[index].getAttribute('data-type');
    const rows = tbody.querySelectorAll('tr');
    const direction = directions[index] || 'sortUp';
    const multiply = direction == 'sortUp' ? 1 : -1;
    const newRows = Array.from(rows);

    newRows.sort((row1, row2) => {
      const cellA = row1.querySelectorAll('td')[index].textContent;
      const cellB = row2.querySelectorAll('td')[index].textContent;

      const a = transform(type, cellA);
      const b = transform(type, cellB);

      switch (true) {
        case a > b:
          return 1 * multiply;
        case a < b:
          return -1 * multiply;
        case a === b:
          return 0;
        default:
          break;
      }
    });

    newRows.forEach.call(rows, row => {
      tbody.removeChild(row);
    });

    directions[index] = direction == 'sortUp' ? 'sortDown' : 'sortUp';

    newRows.forEach(newRows => {
      tbody.appendChild(newRows);
    });
  }

  [].forEach.call(headers, (header, index) => {
    if (index === 4) {
      return;
    }
    header.addEventListener('click', () => {
      header.classList.toggle('table__head-rev');
      sortColumn(index);
    });
  });
}
