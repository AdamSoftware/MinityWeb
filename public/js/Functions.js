let totalAmount = document.getElementById("expense-total");
let expenseList = document.querySelector(".expense-list");

export function createExpenseItem(data) {
  let newExpenseItem = document.createElement("li");
  newExpenseItem.classList.add("expense");

  newExpenseItem.innerHTML = `
        <div class = "expense-card">
          <div class="expense-details">
            <p class="expense-business">Business: ${data.business}</p>
            <p class="expense-item">Item: ${data.item}</p>
            <p class="expense-date">Paid on: ${data.date}</p>
          </div>


          <p class="expense-amount">- $${data.amount}</p>

        </div>
    `;

  expenseList.appendChild(newExpenseItem);
}

export function hidePopup() {
  popupContainer.classList.add("hide");
  popupContainer.style.opacity = "1";
}

export function updateExpenseOverview(amount) {
  let total = 0;
  amount = amount.replace(/[^0-9.]/g, "");

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount < 0) {
    console.error("Invalid amount:", amount);
    return; // Exit the function if the input is not a valid number or is negative
  }

  total += parsedAmount;

  if (totalAmount) {
    totalAmount.innerText = "$" + total.toFixed(2);
  } else {
    console.error("Element with id 'totalAmount' not found.");
  }
}
