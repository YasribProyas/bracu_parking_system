document.addEventListener('DOMContentLoaded', () => {
    populateTimeOptions();
    document.getElementById('finalize').style.display = 'none';
});

document.getElementById('fetchSpace').addEventListener('click', fetchAvailableSpaces);

function populateTimeOptions() {
    const startTimeSelect = document.getElementById('Start_time');
    const endTimeSelect = document.getElementById('End_time');
    const times = generateTimeOptions(7, 17); // 7 AM to 5 PM

    times.forEach(time => {
        const startOption = document.createElement('option');
        startOption.value = time;
        startOption.textContent = time;
        startTimeSelect.appendChild(startOption);

        const endOption = document.createElement('option');
        endOption.value = time;
        endOption.textContent = time;
        endTimeSelect.appendChild(endOption);
    });
}

function generateTimeOptions(startHour, endHour) {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        const time = `${hour}:00`;
        times.push(time);
    }
    return times;
}

function fetchAvailableSpaces(e) {
    e.preventDefault();
    const startTime = document.getElementById('Start_time').value;
    const endTime = document.getElementById('End_time').value;

    // Check if all required fields are filled
    if (!startTime || !endTime) {
        alert('Please select both start and end times.');
        return;
    }

    fetch(`/parking-spaces/available-spaces?start_time=${startTime}&end_time=${endTime}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const locationSelect = document.getElementById('Location_ID');
            locationSelect.innerHTML = '<option value="">Select a location</option>'; // Clear previous options

            data.forEach(space => {
                const option = document.createElement('option');
                option.value = space;
                option.textContent = space;
                locationSelect.appendChild(option);
            });

            document.getElementById('finalize').style.display = 'block'; // Unhide finalize button
        })
        .catch(error => {
            console.error('Error fetching available spaces:', error);
            alert('An error occurred while fetching the available spaces.');
        });
}