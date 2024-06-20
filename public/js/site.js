let totalAmount = document.getElementById("expense-total");
let expenseList = document.querySelector(".expense-list");

document.addEventListener("DOMContentLoaded", () => {
  var btnPopup = document.getElementsByClassName("btnpushable")[0];
  var popup = document.getElementById("popupContainer");
  var btnreset = document.querySelector(".btnreset");
  var btnsubmit = document.querySelector(".btnsubmit");
  let amount = document.querySelector(".currency-field");
  var business = document.querySelector(".business");
  var item = document.querySelector(".item");
  var date = document.getElementsByClassName(".date");

  btnPopup.addEventListener("click", function () {
    if (popup.classList.contains("hidden")) {
      popup.classList.remove("hidden");
    } else {
      popup.classList.add("hidden");
    }
  });

  btnreset.addEventListener("click", function () {
    var inputs = document.querySelectorAll('.popup input[type="text"]');
    inputs.forEach((input) => {
      input.value = "";
    });
  });

  btnsubmit.addEventListener("click", function (event) {
    event.preventDefault();

    let Eamount = amount.value;
    let Ebusiness = business.value;
    let Eitem = item.value;
    let rawdate = date.value;

    let formattedDate = moment(rawdate).format("MM/DD/YY");

    let Data = {
      amount: Eamount,
      item: Eitem,
      business: Ebusiness,
      date: formattedDate,
    };

    createExpenseItem(Data);
    hidePopup();
    updateExpenseOverview(Data.amount);
  });
});

const spans = document.querySelectorAll(".word span");

spans.forEach((span, idx) => {
  span.addEventListener("click", (e) => {
    e.target.classList.add("active");
  });
  span.addEventListener("animationend", (e) => {
    e.target.classList.remove("active");
  });

  // Initial animation
  setTimeout(
    () => {
      span.classList.add("active");
    },
    750 * (idx + 1),
  );
});

// Functions for the site

function createExpenseItem(data) {
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

function hidePopup() {
  popupContainer.classList.add("hide");
  popupContainer.style.opacity = "1";
}

let total = 0;

function updateExpenseOverview(amount) {
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
