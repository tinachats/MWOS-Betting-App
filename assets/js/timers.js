// Match Timer
//Get the starting time (right now) in seconds
var startTime = Math.floor(Date.now() / 1000);

// Store it if I want to restart the timer on the next page
localStorage.setItem('startTime', startTime);

function matchTimer() {
    // 
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

    dates.forEach((date) => {
        date.innerHTML = `${m}:${s}`;
    });

    // set a timeout to update the timer
    var t = setTimeout(matchTimer, 500);
}

// Multiple countdown timers
var countDownDate1 = new Date("Sep 15, 2022 12:25:25").getTime();
var countDownDate2 = new Date("Sep 19, 2022 12:25:25").getTime();

var timer1 = document.getElementById("timer")
var timer2 = document.getElementById("timer2")

function countdown(finish_date, timer) {

    var x = setInterval(function() {

        var now = new Date().getTime();

        var distance = finish_date - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timer.innerHTML = days + "<span style='font-weight:normal'>d</span> " + hours + "h " + minutes + "m " + seconds + "s ";


        if (distance < 0) {
            clearInterval(x);
            timer.innerHTML = "ICO Has Ended";
        }
    }, 1000);
}

countdown(countDownDate1, timer1);
countdown(countDownDate2, timer2);