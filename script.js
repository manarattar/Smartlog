const logContainer = document.getElementById('log-container');
const addSetButton = document.getElementById('add-set');
const chartCanvas = document.getElementById('chart').getContext('2d');

let workoutData = [];
let chart;

// Function to add a new set
addSetButton.addEventListener('click', () => {
  const set = document.getElementById('set').value;
  const reps = document.getElementById('reps').value;
  const weight = document.getElementById('weight').value;

  if (set && reps && weight) {
    workoutData.push({ set, reps, weight });
    updateLog();
    resetInputs();
  }
});

// Function to update the log
function updateLog() {
  logContainer.innerHTML = workoutData
    .map(
      (data, index) =>
        `<div>Set ${data.set}: ${data.reps} reps x ${data.weight}kg</div>`
    )
    .join('');
}

// Function to reset input fields
function resetInputs() {
  document.getElementById('set').value = '';
  document.getElementById('reps').value = '';
  document.getElementById('weight').value = '';
}

// Function to render chart
function renderChart(type) {
  const labels = workoutData.map(data => `Set ${data.set}`);
  const dataPoints =
    type === 'max-weight'
      ? workoutData.map(data => data.weight)
      : workoutData.map(data => data.reps);

  if (chart) chart.destroy();

  chart = new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: type === 'max-weight' ? 'Max Weight (kg)' : 'Reps',
          data: dataPoints,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
        },
      ],
    },
  });
}

// Event listeners for buttons
document.getElementById('sets').addEventListener('click', () => renderChart('sets'));
document.getElementById('max-weight').addEventListener('click', () => renderChart('max-weight'));
document.getElementById('volume').addEventListener('click', () => renderChart('volume'));
document.getElementById('reps').addEventListener('click', () => renderChart('reps'));
