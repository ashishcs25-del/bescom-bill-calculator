// =========================================
// GET HTML ELEMENTS
// =========================================

let bookName = document.getElementById("bookName");

let pagesInput = document.getElementById("pages");

let readingDate = document.getElementById("readingDate");

let addBtn = document.getElementById("addBtn");

let readingList = document.getElementById("readingList");

let weekPages = document.getElementById("weekPages");

let monthPages = document.getElementById("monthPages");

let totalPages = document.getElementById("totalPages");

let totalSessions = document.getElementById("totalSessions");

let sessionCount = document.getElementById("sessionCount");


// =========================================
// LOAD SAVED DATA
// =========================================

let readings =
    JSON.parse(localStorage.getItem("readings")) || [];


// =========================================
// SET TODAY'S DATE
// =========================================

let today = new Date();

let todayString =
    today.toISOString().split("T")[0];

readingDate.value = todayString;


// =========================================
// ADD READING
// =========================================

addBtn.addEventListener("click", function() {

    let book = bookName.value.trim();

    let pages = Number(pagesInput.value);

    let date = readingDate.value;


    // Check inputs

    if (book === "") {

        alert("Please enter the book name.");

        return;

    }


    if (pages <= 0) {

        alert("Please enter the number of pages read.");

        return;

    }


    if (date === "") {

        alert("Please select a date.");

        return;

    }


    // Create reading object

    let reading = {

        id: Date.now(),

        book: book,

        pages: pages,

        date: date

    };


    // Add to array

    readings.push(reading);


    // Save to browser

    localStorage.setItem(
        "readings",
        JSON.stringify(readings)
    );


    // Clear inputs

    bookName.value = "";

    pagesInput.value = "";


    // Refresh page

    displayReadings();

    calculateStats();

});


// =========================================
// DISPLAY READINGS
// =========================================

function displayReadings() {

    readingList.innerHTML = "";


    if (readings.length === 0) {

        readingList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📖
                </div>

                <h3>
                    No reading yet
                </h3>

                <p>
                    Add your first reading session above.
                </p>

            </div>

        `;

        return;

    }


    // Show newest first

    let sortedReadings =
        [...readings].reverse();


    sortedReadings.forEach(function(reading) {


        let item =
            document.createElement("div");

        item.className = "reading-item";


        item.innerHTML = `

            <div class="book-info">

                <h3>
                    ${reading.book}
                </h3>

                <p>
                    ${formatDate(reading.date)}
                </p>

            </div>


            <div class="pages-read">

                ${reading.pages} pages

            </div>


            <button
                class="delete-button"
                onclick="deleteReading(${reading.id})"
            >

                Remove

            </button>

        `;


        readingList.appendChild(item);

    });


    sessionCount.textContent =
        readings.length +
        (readings.length === 1
            ? " session"
            : " sessions");

}


// =========================================
// DELETE READING
// =========================================

function deleteReading(id) {

    readings =
        readings.filter(function(reading) {

            return reading.id !== id;

        });


    localStorage.setItem(
        "readings",
        JSON.stringify(readings)
    );


    displayReadings();

    calculateStats();

}


// =========================================
// CALCULATE STATISTICS
// =========================================

function calculateStats() {

    let now = new Date();


    let currentWeekPages = 0;

    let currentMonthPages = 0;

    let allPages = 0;


    readings.forEach(function(reading) {


        let readingDateObject =
            new Date(reading.date);


        // Total

        allPages += reading.pages;


        // Month

        if (

            readingDateObject.getMonth()
            === now.getMonth()

            &&

            readingDateObject.getFullYear()
            === now.getFullYear()

        ) {

            currentMonthPages += reading.pages;

        }


        // Week

        let difference =
            now - readingDateObject;


        let days =
            difference /
            (1000 * 60 * 60 * 24);


        if (days >= 0 && days < 7) {

            currentWeekPages += reading.pages;

        }

    });


    weekPages.textContent =
        currentWeekPages;


    monthPages.textContent =
        currentMonthPages;


    totalPages.textContent =
        allPages;


    totalSessions.textContent =
        readings.length;


    sessionCount.textContent =
        readings.length +
        (readings.length === 1
            ? " session"
            : " sessions");

}


// =========================================
// FORMAT DATE
// =========================================

function formatDate(date) {

    let dateObject =
        new Date(date);


    return dateObject.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// =========================================
// INITIAL LOAD
// =========================================

displayReadings();

calculateStats();