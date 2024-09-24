// Fetch users on page load
window.onload = function() {
    fetchUsers();
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

// Fetch users from the server
function fetchUsers() {
    fetch('/getUsers')
    .then(response => response.json())
    .then(data => {
        const userTable = document.getElementById('userTable');
        userTable.innerHTML = ''; // Clear the table before updating

        data.forEach((user, index) => {
            const row = `<tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td><button onclick="deleteUser(${user.id})">Delete</button></td>
                         </tr>`;
            userTable.innerHTML += row;
        });
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
