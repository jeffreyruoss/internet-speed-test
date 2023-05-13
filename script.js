fetch('results-clean.json')
  .then(response => response.json())
  .then(data => {
    const resultsTable = document.getElementById('resultsTable');

    data = data.reverse();

    for (const item of data) {
      const row = document.createElement('tr');
      row.classList.add('table-row');

      let cell = document.createElement('td');
      cell.textContent = new Date(item.timestamp).toLocaleString();
      cell.classList.add('timestamp-cell');
      row.appendChild(cell);

      cell = document.createElement('td');
      cell.textContent = (item.download / (1024 * 1024)).toFixed(2);
      cell.classList.add('download-cell');
      row.appendChild(cell);

      cell = document.createElement('td');
      cell.textContent = (item.upload / (1024 * 1024)).toFixed(2);
      cell.classList.add('upload-cell');
      row.appendChild(cell);

      cell = document.createElement('td');
      cell.textContent = item.ping.toFixed(2);
      cell.classList.add('ping-cell');
      row.appendChild(cell);

      cell = document.createElement('td');
      cell.textContent = `${item.server.name}, ${item.server.country}`;
      cell.classList.add('server-cell');
      row.appendChild(cell);

      cell = document.createElement('td');
      cell.textContent = item.client.ip;
      cell.classList.add('ip-cell');
      row.appendChild(cell);

      resultsTable.appendChild(row);
    }
  });

const showAllRows = () => {
let table = document.getElementById('resultsTable');
let rows = table.getElementsByClassName('table-row');

for (let row of rows) {
  row.style.display = 'table-row';
}
};

const showRowsEveryNMinutes = (n) => {
showAllRows();
let table = document.getElementById('resultsTable');
let rows = table.getElementsByClassName('table-row');

for (let row of rows) {
  let timestamp = row.getElementsByClassName('timestamp-cell')[0].textContent;
  let date = new Date(timestamp);
  let minutes = date.getMinutes();

  if (minutes % n !== 0) {
    row.style.display = 'none';
  }
}
};

document.getElementById('one-minute-button').addEventListener('click', () => showRowsEveryNMinutes(1));

document.getElementById('five-minutes-button').addEventListener('click', () => showRowsEveryNMinutes(5));

document.getElementById('ten-minutes-button').addEventListener('click', () => showRowsEveryNMinutes(10));