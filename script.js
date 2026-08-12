let unitsInput = document.getElementById("units");
let loadInput = document.getElementById("load");

let calculateBtn = document.getElementById("calculateBtn");

let result = document.getElementById("result");

let displayUnits = document.getElementById("displayUnits");
let energyCharge = document.getElementById("energyCharge");
let fixedCharge = document.getElementById("fixedCharge");
let totalBill = document.getElementById("totalBill");


// =========================
// TARIFF RATES
// =========================

let rate1 = 4.50;
let rate2 = 6.00;
let rate3 = 8.00;
let rate4 = 11.00;


// Fixed charge per kW

let fixedRate = 120;


// =========================
// CALCULATE BILL
// =========================

calculateBtn.addEventListener("click", function() {

    let units = Number(unitsInput.value);

    let load = Number(loadInput.value);


    // Check input

    if (units <= 0 || load <= 0) {

        alert("Please enter valid consumption and load values.");

        return;

    }


    // Energy charge

    let energy = 0;


    // First slab

    if (units <= 100) {

        energy = units * rate1;

    }


    // Second slab

    else if (units <= 200) {

        energy =
            (100 * rate1) +
            ((units - 100) * rate2);

    }


    // Third slab

    else if (units <= 500) {

        energy =
            (100 * rate1) +
            (100 * rate2) +
            ((units - 200) * rate3);

    }


    // Fourth slab

    else {

        energy =
            (100 * rate1) +
            (100 * rate2) +
            (300 * rate3) +
            ((units - 500) * rate4);

    }


    // Fixed charge

    let fixed = load * fixedRate;


    // Total

    let total = energy + fixed;


    // Display results

    displayUnits.textContent = units;

    energyCharge.textContent = energy.toFixed(2);

    fixedCharge.textContent = fixed.toFixed(2);

    totalBill.textContent = total.toFixed(2);


    // Show result card

    result.classList.remove("hidden");

});