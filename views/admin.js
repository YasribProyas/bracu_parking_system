// Fetch users on page load
window.onload = function () {
    fetchTotals();

    fetchUsers();
    fetchBooking();
};

// Add a new user to the database
function addUser() {
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;

    if (userName && userEmail) {
        const data = { name: userName, email: userEmail };

        // Send data to the server
        fetch('/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchUsers(); // Refresh the user list
                } else {
                    alert('Error adding user');
                }
            });
    } else {
        alert('Please enter valid details.');
    }
}

function fetchTotals() {
    fetch('/admin/totals')
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalDue').innerText = `Total Due: ${data.totalDue}`;
            document.getElementById('totalEarnings').innerText = `Total Earnings: ${data.totalEarnings}`;
        })
        .catch(err => {
            console.error('Error fetching totals:', err);
        });
}

// Fetch users from the server
function fetchUsers() {
    fetch('/users')
        .then(response => response.json())
        .then(data => {

            const userTable = document.querySelector('#user_table table tbody');
            userTable.innerHTML = ''; // Clear the table before updating

            data.forEach((user) => {
                const row = `<tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            </tr>`;
                // <td><button onclick="deleteUser(${user.id})">Delete</button></td>
                userTable.innerHTML += row;
            });

        });
}
function fetchBooking() {
    fetch('/bookings/bookings')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const userTable = document.querySelector('#booking_table table tbody');
            userTable.innerHTML = ''; // Clear the table before updating

            data.forEach((bookin) => {
                const row = `<tr>
                            <td>${bookin.id}</td>
                            <td>${bookin.UserID}</td>
                            <td>${bookin.Location_ID}</td>
                            <td>${bookin.Vehicle_Number}</td>
                            <td>${bookin.Vehicle_Type}</td>
                            <td>${bookin.Start_time}</td>
                            <td>${bookin.End_time}</td>
                            </tr>`;
                // <td><button onclick="deleteUser(${user.id})">Delete</button></td>
                userTable.innerHTML += row;
            });
            console.log(data);

        });
}

// Delete a user
function deleteUser(id) {
    fetch(`/deleteUser/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchUsers(); // Refresh the user list
            } else {
                alert('Error deleting user');
            }
        });
}
