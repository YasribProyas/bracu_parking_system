// Review form validation
document.querySelector("form").addEventListener("submit", function (e) {
    const username = document.querySelector("#username").value;
    const review = document.querySelector("#review").value;
    const rating = document.querySelector('input[name="rating"]:checked');

    if (!username || !review || !rating) {
        alert("All fields are required.");
        e.preventDefault(); // prevent form submission
    }
});

// Star rating behavior
const stars = document.querySelectorAll('.star');

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((star) => star.style.color = '#ccc'); // reset stars
        for (let i = 0; i <= index; i++) {
            stars[i].style.color = 'gold'; // color the stars till the clicked one
        }
    });
});
