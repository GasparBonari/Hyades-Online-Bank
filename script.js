"use strict";

// ACCOUNTS

let accout1 =
{
    owner: "John Smith",
    movements: [120, 3020, -500, 25, -10, 700],
    pin: 1111,
    intRate: 1.2,
    movementsDates:
        [
            '2019-11-01T13:15:33.035Z',
            '2020-11-30T09:48:16.867Z',
            '2021-12-25T06:04:23.907Z',
            '2021-01-25T14:18:46.235Z',
            '2022-09-29T16:33:06.386Z',
            '2022-10-01T14:43:26.374Z',
        ],
    locale: "da-DK",
    currency: "EUR"
}

let accout2 =
{
    owner: "Maria Bellarup",
    movements: [12000, 20, -1500, 225, -120, 5, -300],
    pin: 2222,
    intRate: 1.8,
    movementsDates:
        [
            '2019-11-18T21:31:17.178Z',
            '2020-12-23T07:42:02.383Z',
            '2021-01-28T09:15:04.904Z',
            '2021-04-01T10:17:24.185Z',
            '2022-05-08T14:11:59.604Z',
            '2022-09-27T17:01:17.194Z',
            '2022-10-01T23:36:17.929Z',
        ],
    locale: "en-US",
    currency: "USD"
}

let accout3 =
{
    owner: "Rodrigo Delaney",
    movements: [10, 5000, -100, 20, -150, -10, -20],
    pin: 3333,
    intRate: 0.5,
    movementsDates:
        [
            '2020-11-01T13:05:33.035Z',
            '2021-11-30T09:08:16.867Z',
            '2021-12-25T06:01:23.907Z',
            '2022-01-25T14:31:46.235Z',
            '2022-02-05T16:33:06.386Z',
            '2022-04-10T14:43:26.374Z',
            '2022-10-01T23:36:17.929Z',
        ],
    locale: "en-GB",
    currency: "GBP"
}

let accout4 =
{
    owner: "Gabriel Bonucci",
    movements: [120, 30, -500, 12, -10, 70, 50, 120],
    pin: 4444,
    intRate: 2,
    movementsDates:
        [
            '2019-11-01T13:15:33.035Z',
            '2020-11-30T09:48:16.867Z',
            '2020-12-25T06:07:23.907Z',
            '2021-01-25T14:18:46.235Z',
            '2021-02-05T16:23:06.386Z',
            '2021-02-10T14:41:26.374Z',
            '2022-06-25T18:04:59.371Z',
            '2022-10-01T23:36:17.929Z',
        ],
    locale: "es-AR",
    currency: "ARS"
}

// ALL ACCOUNTS ARRAY

let accouts = [accout1, accout2, accout3, accout4];

// ALL DOCUMENTS

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelNameUser = document.querySelector(".balance__label");
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const labelModal = document.querySelector(".modal");
const labelOverlay = document.querySelector(".overlay");
const labelHeader = document.querySelector(".header__title");
const labelMinusSymbol = document.querySelector(".minus");
const labelPlusSymbol = document.querySelector(".plus");

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnCreate = document.querySelector(".createUser");
const btnSubmit = document.querySelector("#submit");
const btnCloseModal = document.querySelector(".close-modal");

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const inputFname = document.querySelector("#fname");
const inputPin = document.querySelector("#pin");
const inputMoney = document.querySelector("#new-money");


alert("Demo accouts:\n" + "user: js, pin: 1111\n" + "user: mb, pin: 2222\n" + "user: rd, pin: 3333\n" + "user: gb, pin: 4444");


// CALCULATE DATES

function formatDate(date, locale) {
    let calcDate = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

    let dayPassed = calcDate(new Date(), date);

    if (dayPassed == 0) return "Today"; // return is going to RETURN that value
    if (dayPassed == 1) return "Yesterday";
    if (dayPassed <= 7) {
        return `${dayPassed} days ago`;
    }
    else {
        return new Intl.DateTimeFormat(locale).format(date)
    }
}


// FORMAT BALANCE AND MOVEMENTS

function formattedNumbers(locale, currency, value) {
    return Intl.NumberFormat(locale,
    {
        style: "currency",
        currency: currency
    }).format(value)
}


// DISPLAY MOVEMENTS

function displayMovements(acc, sort = false) 
{
    containerMovements.innerHTML = "";

    let movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    for (let [i, value] of movs.entries()) {
        let type = value > 0 ? "deposit" : "withdrawal";

        let date = new Date(acc.movementsDates[i]);

        let displayDate = formatDate(date, acc.locale);

        let formattedMov = formattedNumbers(acc.locale, acc.currency, value);

        let HTML =
            `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
        </div>
        `
        containerMovements.insertAdjacentHTML("afterbegin", HTML);
    }
}


// DISPLAY BALANCE

function displayBalance(acc) {
    acc.balance = acc.movements.reduce((elem, acomu) => elem + acomu);
    labelBalance.textContent = formattedNumbers(acc.locale, acc.currency, acc.balance);
}


// DISPLAY SUMMARY

function displaySummary(acc) {
    let positive = acc.movements.filter(elem => elem > 0).reduce((elem, acomu) => elem + acomu);

    labelSumIn.textContent = formattedNumbers(acc.locale, acc.currency, positive);

    let negative = acc.movements.filter(elem => elem < 0).reduce((elem, acomu) => elem + acomu);

    labelSumOut.textContent = formattedNumbers(acc.locale, acc.currency, Math.abs(negative));

    let calcInterest = acc.movements.filter(elem => elem > 0).map(elem => elem * acc.intRate / 100).filter(elem => elem >= 1).reduce((elem, acomu) => elem + acomu);

    labelSumInterest.textContent = formattedNumbers(acc.locale, acc.currency, calcInterest);;
}


// CREATE NEW ACCOUNTS AND MODAL

btnCreate.addEventListener("click", function (e) {
    e.preventDefault();

    labelModal.classList.remove("hidden");
    labelOverlay.classList.remove("hidden");

    btnSubmit.addEventListener("click", function (e) 
    {     
        e.preventDefault();

        if (inputFname.value == "" || inputPin.value == "" || inputMoney.value == "") 
        {
            btnSubmit.classList.add("error");

            setTimeout(function () {
                btnSubmit.classList.remove("error");
            }, 300)
        }
        else 
        {
            let question1 = inputFname.value;
            let question2 = Number(inputPin.value);
            let question3 = Number(inputMoney.value);

            let accountCreated = { owner: question1, movements: [question3], pin: question2, intRate: 1, movementsDates: [new Date()], locale: "da-DK", currency: "EUR" };

            accouts.push(accountCreated);

            creatUserName(accouts);

            labelModal.classList.add("hidden");
            labelOverlay.classList.add("hidden");
        }
    })
})


// CLOSE MODAL

function closeModal() {
    labelModal.classList.add("hidden");
    labelOverlay.classList.add("hidden");
}

btnCloseModal.addEventListener("click", function () {
    closeModal();
})

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape" && !labelModal.classList.contains("hidden")) {
        closeModal();
    }
})

document.querySelector(".overlay").addEventListener("click", closeModal);


// CREATE USER NAME

function creatUserName(accs) {
    for (let i of accs) {
        i.user = i.owner.toLowerCase().split(" ").map(elem => elem[0]).join("");
    }
}

creatUserName(accouts);


// UPDATE THE UI DISPLAY

function updateUI(acc) {
    displayMovements(acc);
    displayBalance(acc);
    displaySummary(acc);
}


// LOG IN

let currentUser, setTimer;

btnLogin.addEventListener("click", function (e) {
    e.preventDefault();

    currentUser = accouts.find(elem => elem.user == inputLoginUsername.value);

    if (currentUser?.pin == inputLoginPin.value) {
        document.body.style.backgroundImage = "url(picture-login.png)"

        btnCreate.classList.add("hidden");
        labelHeader.classList.add("hidden");
        labelWelcome.classList.add("hidden");

        labelNameUser.textContent = `Welcome, ${currentUser.owner.split(" ")[0]}`;

        containerApp.style.opacity = 100;


        if (setTimer) clearInterval(setTimer) // IF THE TIMER EXIST, IT WILL STOP

        setTimer = displayTimer() // THE TIMER NOW RESTART AGAIN


        updateUI(currentUser);

        inputLoginUsername.value = "";
        inputLoginPin.value = "";
        inputLoginPin.blur();

        let now = new Date(); // SET THE DATES

        let options =
        {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "numeric",
            year: "numeric"
        }

        labelDate.textContent = new Intl.DateTimeFormat(currentUser.locale, options).format(now); // SET DATES BASED OF WHERE THE CLIENT IS LOCATED (LOCALE ARRAY)
    }
    else {
        inputLoginUsername.value = "";
        inputLoginPin.value = "";

        inputLoginUsername.classList.add("error");
        inputLoginPin.classList.add("error");

        setTimeout(function () {
            inputLoginUsername.classList.remove("error");
            inputLoginPin.classList.remove("error");
        }, 300)
    }
})


// LOG OUT AND TIMER

function displayTimer() // IT'S CALLED IN LOG IN FUNCTION
{
    let time = 180;

    let setTimer = setInterval(function () {
        let minutes = String(Math.trunc(time / 60)).padStart(2, 0);
        let seconds = String(Math.trunc(time % 60)).padStart(2, 0);

        labelTimer.textContent = `${minutes}:${seconds}`;

        if (time == 0) {
            clearInterval(setTimer) // to stop the timer

            btnCreate.classList.remove("hidden");
            labelHeader.classList.remove("hidden");
            labelWelcome.classList.remove("hidden");

            document.body.style.backgroundImage = "url(picture1.jpg)";

            containerApp.style.opacity = 0;
        }

        time--;

    }, 1000)

    return setTimer;
}


// TRANSFER MONEY

btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();

    let receiver = accouts.find(elem => elem.user == inputTransferTo.value);

    let amount = inputTransferAmount.value;

    if (amount > 0 && receiver.user != currentUser.user && amount <= currentUser.balance) {
        labelMinusSymbol.classList.remove("hidden");

        setTimeout(function () {
            labelMinusSymbol.classList.add("hidden");
        }, 700)

        currentUser.movements.push(-amount);
        receiver.movements.push(+amount);

        inputTransferAmount.value = "";
        inputTransferTo.value = "";
        inputTransferAmount.blur();

        currentUser.movementsDates.push(new Date().toISOString());
        receiver.movementsDates.push(new Date().toISOString());

        updateUI(currentUser);

        if (setTimer) clearInterval(setTimer) // RESET TIMER       
        setTimer = displayTimer()
    }
    else {
        alert("⛔Amount exceded⛔");

        inputTransferAmount.value = "";
        inputTransferTo.value = "";
        inputTransferAmount.blur();
    }
})


// LOAN MONEY

btnLoan.addEventListener("click", function (e) {
    e.preventDefault();

    let amountLoad = Math.floor(inputLoanAmount.value);

    let deposit10Percent = currentUser.movements.some(elem => elem >= amountLoad / 10);

    if (amountLoad > 0 && deposit10Percent) {
        labelPlusSymbol.classList.remove("hidden");

        setTimeout(function () {
            labelPlusSymbol.classList.add("hidden");
        }, 980)

        currentUser.movements.push(+amountLoad);

        inputLoanAmount.value = "";
        inputClosePin.blur();

        currentUser.movementsDates.push(new Date().toISOString());

        updateUI(currentUser);

        if (setTimer) clearInterval(setTimer) // RESET TIMER       
        setTimer = displayTimer()
    }
    else {
        alert("⛔Not enough money in your balance⛔");

        inputLoanAmount.value = "";
        inputClosePin.blur();
    }
})


// DELETE ACCOUNT

btnClose.addEventListener("click", function (e) {
    e.preventDefault();

    let userInput = inputCloseUsername.value;

    let pinInput = inputClosePin.value;

    if (userInput == currentUser.user && pinInput == currentUser.pin) {
        containerApp.style.opacity = 0;
        document.body.style.backgroundImage = "url(picture1.jpg)"
        btnCreate.classList.remove("hidden");
        labelHeader.classList.remove("hidden");


        let index = accouts.findIndex(elem => elem.user == currentUser.user);

        accouts.splice(index, 1);

        inputCloseUsername.value = "";
        inputClosePin.value = "";
        inputClosePin.blur();

        labelWelcome.textContent = "Log in";
    }
    else {
        alert("⛔Wrong user or pin⛔");
    }
})


// SORT

let sorted;

btnSort.addEventListener("click", function (e) {
    e.preventDefault();

    displayMovements(currentUser, !sorted);

    sorted = !sorted;
})