document.getElementById('flightForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    const response = await fetch(`/api/flights?origin=${origin}&destination=${destination}&date=${date}`);
    const data = await response.json();

    const results = document.getElementById('results');
    results.innerHTML = JSON.stringify(data, null, 2);
});
