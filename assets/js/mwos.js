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

/*** App Timers ***/
// Get all elements with the match-timer class
const dates = document.querySelectorAll('[id^="kickoff-"]');

// Countdown Timer
function kickOffTime(dates) {
    // Get the match status of each and every match
    const matchStatuses = document.querySelectorAll('.match-status');

    for (var i = 0; i < dates.length; i++) {
        // Get all kickoff times
        var matchDates = dates[i].getAttribute('id').split('-')[1];

        // Set the kickoff time as the deadline
        var deadline = new Date(matchDates);

        // Get the difference in time between kickoff and now
        var diff = Math.floor(deadline.getTime() - now.getTime());

        // Time units
        var sec = 1000;
        var min = sec * 60;
        var hr = min * 60;
        var day = hr * 24;

        // Get days
        var days = Math.floor(diff / (day));

        // Get hours
        var hours = Math.floor((diff % (day)) / (hr));

        // Get minutes
        var minutes = Math.floor((diff % (hr)) / (min));

        // Get secons
        var seconds = Math.floor((diff % (min)) / sec);

        // add a leading zero if it's single digit
        var d = checkTime(days);
        var h = checkTime(hours);
        var m = checkTime(minutes);
        var s = checkTime(seconds);

        // If there's nolonger any difference in time stop the timer
        if (diff <= 0) {
            // Stop the countdown timer
            clearInterval(timer);

            // Start the match timer
            // matchTimer();

            document.getElementById('kickoff-' + matchDates).innerHTML = '90:00';
            matchStatuses[i].innerHTML = 'LIVE';
        } else {
            document.getElementById('kickoff-' + matchDates).innerHTML = `${d}:${h}:${m}:${s}`;
            matchStatuses[i].innerHTML = 'SOON';
        }
    }
}

//  update the timer
var timer = setInterval(() => {
    kickOffTime(dates);
}, 1000);

// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
/*** /. Countdown Timer ***/

// Make sure only numerics are entered
function numericsOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// Increment value of the textbox
var counter = 0;

function increment(obj) {
    counter++;
    var el_id = obj.getAttribute('data-id');
    document.getElementById('odds-multipliers-' + el_id).value = counter;
}


// Decrement the value on click
function decrement(obj) {
    var el_id = obj.getAttribute('data-id');
    var el = document.getElementById('odds-multipliers-' + el_id);

    if (el.value > 0) {
        counter--;
    }

    el.value = counter;
}

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