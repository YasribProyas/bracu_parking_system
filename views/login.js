// Login page form validation if needed
document.querySelector("form").addEventListener("submit", function (e) {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    if (!username || !password) {
        alert("All fields are required.");
        e.preventDefault(); // prevent form submission
    }
});
