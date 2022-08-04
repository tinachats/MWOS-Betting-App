// Get all elements with the match-timer class
const dates = document.querySelectorAll('[id^="kickoff-"]');

var matchDates = [];

for (i = 0; i < dates.length; i++) {
    // Get all kickoff times
    const startDates = dates[i].getAttribute('id').split('-')[1];

    // Get all match dates
    matchDates.push(new Date(matchDates).getTime());
}

console.log(matchDates);