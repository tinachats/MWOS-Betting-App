// Get current datetime 
var now = new Date();

// Get the current hour
var hour = now.getHours();

/*** Theme settings ***/
// Get the body element
let body = document.getElementsByTagName('body')[0];

// Toggle the theme mode automatic switch
let autoSwitch = document.getElementById('theme-mode-automatic');

// Toggle the theme mode automatic switch
let themeSwitch = document.getElementById('theme-mode-toggle');

// Get theme mode icon
let themeIcon = document.querySelector('.theme-mode-icon');

// Get theme mode type
let themeModeType = document.getElementById('theme-mode-type');

// Get theme state
let themeAutoState = document.querySelector('#theme-auto-state');
let daytimeState = document.querySelector('#daytime-state');

// Get saved theme
getTheme();

function getTheme() {
    // Get saved theme
    let theme = localStorage.getItem('theme');

    switch (theme) {
        case 'dark-mode':
            darkTheme();
            break;
        case 'light-mode':
            defaultTheme();
            break;
        case 'automatic':
            automaticMode();
            break;
        default:
            defaultTheme();
    }
}

// Dark Theme 
function darkTheme() {
    if (!body.classList.contains('dark-mode')) {
        body.classList.add('dark-mode');
    }
    themeIcon.classList.remove('bi-brightness-high');
    themeIcon.classList.add('bi-moon-fill');
    themeModeType.innerText = 'Set Light theme';
    themeSwitch.checked = true;
    autoSwitch.checked = false;

    // Set to Local Storage the theme mode
    localStorage.setItem('theme', 'dark-mode');
}

// Default theme
function defaultTheme() {
    body.classList.remove('dark-mode');
    themeIcon.classList.add('bi-brightness-high');
    themeIcon.classList.remove('bi-moon-fill');
    themeModeType.innerText = 'Set Dark theme';
    themeSwitch.checked = false;
    autoSwitch.checked = false;

    // Set to Local Storage the theme mode
    localStorage.setItem('theme', 'light-mode');
}

// Automatic switching of the theme based on time
function automaticMode() {
    // Set the automatic switch to on
    autoSwitch.checked = true;
    themeSwitch.checked = false;

    if (autoSwitch.checked == true) {
        // Set to Local Storage the theme mode
        localStorage.setItem('theme', 'automatic');

        // Have the light mode from 6am to 6pm
        if (hour >= 6 && hour < 18) {
            body.classList.remove('dark-mode');
            themeAutoState.innerText = 'On until 18:00';
            daytimeState.innerText = 'sunset';
            themeModeType.innerText = 'Set Dark theme';
        } else {
            // If it's night time, go dark mode
            body.classList.add('dark-mode');
            daytimeState.innerText = 'sunrise';
            themeAutoState.innerText = 'On until 06:00';
            themeModeType.innerText = 'Set Light theme';
        }
    } else {
        autoSwitch.checked = false;
        defaultTheme();
    }
}

// Set new theme
function themeSettings(obj) {
    'use strict';
    // Check to see if the user is in automatic or toggle mode
    let themeMode = obj.value;

    // If the user has toggled the theme
    if (themeMode == 'toggle-theme') {
        // Dark mode when switch is turned on 
        let setDarkTheme = obj.checked;

        // If dark mode is selected
        if (setDarkTheme) {
            darkTheme();
        } else {
            defaultTheme();
        }
    }
}
/*** /. Theme settings ***/

// Range slider 
function rangeSlider(obj) {
    var value = (obj.value - obj.min) / (obj.max - obj.min) * 100;
    obj.style.background = 'linear-gradient(to right, #FFD954 0%, #EF9432 ' + value + '%, #e7eaf3b3 ' + value + '%, #e7eaf3b3 100%)';
    document.getElementById('range-value').innerText = value.toFixed(2);
}

// Animate progress bars
function animateProgressBar() {
    // Get all progress bars
    const progressBars = document.querySelectorAll('.progress-bar');

    // Get section with progress bars
    const section = document.querySelector('.performance-stats');

    // Get the top value of the section
    const scrollDistance = Math.floor(section.getBoundingClientRect().top);

    var id = setInterval(frame, 10);

    // Show the progress bar animation
    function frame() {
        // Loop through all the progress bars to get their values
        progressBars.forEach((progressBar) => {
            var progressWidth = progressBar.getAttribute('aria-valuenow');
            var percentage = Math.floor(progressWidth) + '%';
            progressBar.style.width = percentage;
        });
    }
}

// Animate numbers
function animatedCounter() {
    // Get all statistics counters
    const statistics = document.querySelectorAll('.statistic');

    // Loop through all counter
    statistics.forEach(statistic => {
        // Set statistic text to 0
        statistic.innerText = 0;

        // Update the statistic
        let updatestatistic = () => {
            // Get statistic values as numbers (+)
            const statisticActual = +statistic.getAttribute('data-statistic');

            // Get statistic inner text value
            const statisticVal = +statistic.innerText;

            // Set a step increment value for the statistics
            let stepIncrement = statisticActual / 100;

            // Check if the statistic value is above the actual stat value
            if (statisticVal < statisticActual) {
                // Increment the statistic value by the increment
                statistic.innerText = `${Math.ceil(statisticVal + stepIncrement)}`;

                // Update the statistic
                setTimeout(updatestatistic, 500);
            } else {
                statistic.innerText = statisticActual;
            }
        };

        updatestatistic();
    });
}

/*** Countdown Timer ***/

// Set the date we're counting down to
var countDownDate = new Date('Aug 14, 2022 15:37:25').getTime();

// Update the count down every 1 second
// var x = setInterval(countDownTimer, 1000);

// Count down timer
function countDownTimer(el, countDownDate) {
    // Get today's date and time
    var currTime = now.getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - currTime;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element
    document.querySelector(el).innerHTML = `${days}:${hours}:${minutes}:${minutes}:${seconds}`;

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById(el).innerHTML = 'ENDED';
    }
}

/*** /. Countdown Timer ***/

/*** Count up timer ***/

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

    // update the element where the timer will 
    const matchTimers = document.querySelectorAll('.match-timer');

    matchTimers.forEach((matchTimer) => {
        matchTimer.innerHTML = m + ":" + s;
    });

    // set a timeout to update the timer
    var t = setTimeout(startTimeCounter, 500);
}

function checkTime(i) {
    // add zero in front of numbers < 10
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

startTimeCounter();

/*** /. Count up timer ***/
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init();

    // Enable Popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });

    // Enable Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    /*** Lazy load images ***/
    let lazyLoadImages;
    if ('IntersectionObserver' in window) {
        lazyLoadImages = document.querySelectorAll('.lazy');
        let imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });
        lazyLoadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        let lazyLoadThrottleTimeout;
        lazyLoadImages = document.querySelectorAll('.lazy');

        function lazyLoading() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            lazyLoadThrottleTimeout = setTimeout(() => {
                let scrollTop = window.pageYOffset;
                lazyLoadImages.forEach(function(img) {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyLoadImages.length == 0) {
                    document.removeEventListener('scroll', lazyLoading);
                    window.removeEventListener('resize', lazyLoading);
                    window.removeEventListener('orientationChange', lazyLoading);
                }
            }, 20);
        }
        document.addEventListener('scroll', lazyLoading);
        window.addEventListener('resize', lazyLoading);
        window.addEventListener('orientationChange', lazyLoading);
    }
    /*** /.Lazy load images ***/

    // Stop the dropdown menu from closing on click
    const menus = document.querySelectorAll('.dropdown-menu');
    menus.forEach((menu) => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});