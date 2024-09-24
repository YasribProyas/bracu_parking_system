document.getElementById('payButton').addEventListener('click', pay);

function pay() {
    fetch('/payments/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert('Payment successful!');
                location.reload();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error paying:', error);
            alert('An error occurred while paying.');
        });
}

// function fetchAmount() {
//     fetch('/payments/due', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === "success") {
//                 const payments = data.payments;
//                 let paymentList = "Due Payments:\n";
//                 payments.forEach(payment => {
//                     paymentList += `Amount: ${payment.Amount} Taka\n`;
//                 });
//                 document.getElementById('amountDisplay').textContent = paymentList;
//             } else {
//                 alert(data.message);
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching payments:', error);
//             alert('An error occurred while fetching the payments.');
//         });
// }

function _fetchAmount() {
    var billId = document.getElementById('billId').value;

    if (billId === "") {
        alert("Please enter a Bill ID");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "getAmount.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status === "success") {
                document.getElementById('amountDisplay').textContent = "Amount: " + response.amount + " Taka";
            } else {
                alert(response.message);
            }
        }
    };
    xhr.send("billId=" + billId);
}