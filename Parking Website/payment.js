document.getElementById('payButton').addEventListener('click', fetchAmount);

function fetchAmount() {
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
