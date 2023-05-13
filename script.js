fetch('results-clean.json')
  .then(response => response.json())
  .then(data => {
    try {
      const resultsTable = document.getElementById('resultsTable');

      data = data.reverse();

      for (const item of data) {
        const row = document.createElement('tr');
        row.classList.add('table-row');

        let cell = document.createElement('td');
        let date = new Date(item.timestamp);
        let dateSpan = document.createElement('span');
        dateSpan.textContent = date.toLocaleDateString();
        dateSpan.classList.add('date-span');
        cell.appendChild(dateSpan);
        let space = document.createTextNode(' ');
        cell.appendChild(space);
        let timeSpan = document.createElement('span');
        timeSpan.textContent = formatTime(date);
        timeSpan.classList.add('time-span');
        cell.appendChild(timeSpan);
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
    } catch (error) {
      console.error(error);
    }
  })
  .catch(error => console.error(error));

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'p' : 'a';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ampm;
}

const parseTime = (timeString) => {
  let [time, period] = timeString.split(/(?=[ap])/);
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'p' && hours < 12) {
    hours += 12;
  } else if (period === 'a' && hours === 12) {
    hours = 0;
  }
  return {hours, minutes};
}


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
    let {hours, minutes} = parseTime(timestamp);

    if (minutes % n !== 0) {
      row.style.display = 'none';
    }
  }
}

const toggleDateSpan = () => {
  const dateSpans = document.querySelectorAll('.date-span');

  dateSpans.forEach((dateSpan) => {
    if (dateSpan.classList.contains('hide')) {
      dateSpan.classList.remove('hide');
    } else {
      dateSpan.classList.add('hide');
    }
  });
}

document.getElementById('toggle-date-button').addEventListener('click', toggleDateSpan);


document.getElementById('one-minute-button').addEventListener('click', () => showRowsEveryNMinutes(1));

document.getElementById('five-minutes-button').addEventListener('click', () => showRowsEveryNMinutes(5));

document.getElementById('ten-minutes-button').addEventListener('click', () => showRowsEveryNMinutes(10));