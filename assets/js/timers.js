/*** Football Match Timer ***/

//Get the starting time (right now) in seconds
var startTime = Math.floor(Date.now() / 1000);

// Store it if I want to restart the timer on the next page
localStorage.setItem('startTime', startTime);

function startTimeCounter() {
    // get the time now
    var now = Math.floor(Date.now() / 1000);

    // diff in seconds between now and start
    var diff = now - startTime;

    // get minutes value (quotient of diff)
    var m = Math.floor(diff / 60);

    // get seconds value (remainder of diff)
    var s = Math.floor(diff % 60);

    // add a leading zero if it's single digit
    m = checkTime(m);
    s = checkTime(s);

    matchTimers.forEach((matchTimer) => {
        matchTimer.innerHTML = `${m}:${s}`;
    });

    // set a timeout to update the timer
    var t = setTimeout(startTimeCounter, 500);
}