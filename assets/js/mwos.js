var now = new Date();

// Get saved theme
(function getTheme() {
    // Get saved theme
    let theme = localStorage.getItem('theme');

    // Get the body element
    let body = document.getElementsByTagName('body')[0];

    // Get theme mode icon
    let themeIcon = document.querySelector('.theme-mode-icon');

    // Toggle theme mode switch button
    let themeSwitch = document.getElementById('theme-mode-toggle');

    switch (theme) {
        case 'dark-mode':
            if (!body.classList.contains('dark-mode')) {
                body.classList.remove('light-mode');
                themeIcon.classList.remove('bi-brightness-high');

                body.classList.add('dark-mode');
                themeIcon.classList.add('bi-moon-fill');

                themeSwitch.checked = true;
            }
            break;
        case 'light-mode':
            if (!body.classList.contains('light-mode')) {
                body.classList.add('light-mode');
                themeIcon.classList.add('bi-brightness-high');

                body.classList.remove('dark-mode');
                themeIcon.classList.remove('bi-moon-fill');

                themeSwitch.checked = false;
            }
            break;
        case 'automatic':
        default:
    }
}());

function automaticMode() {
    var millisTill18 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0) - now;
    if (millisTill18 < 0) {
        millisTill18 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setTimeout(function() { alert("It's 18pm!") }, millisTill18);

    const msInSecond = 1000;
    const msInMinute = 60 * msInSecond;
    const msInHour = 60 * msInMinute;
    const msInDay = 24 * msInHour;

    const desiredTimeInHoursInUTC = 18; // fill out your desired hour in UTC!
    const desiredTimeInMinutesInUTC = 0; // fill out your desired minutes in UTC!
    const desiredTimeInSecondsInUTC = 0; // fill out your desired seconds in UTC!

    const currentDate = now;

    const controlDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), desiredTimeInHoursInUTC, desiredTimeInMinutesInUTC, desiredTimeInSecondsInUTC);
    let desiredDate;

    if (currentDate.getTime() <= controlDate.getTime()) {
        desiredDate = controlDate;
    } else {
        desiredDate = new Date(controlDate.getTime() + msInDay);
    }

    const msDelta = desiredDate.getTime() - currentDate.getTime();

    setTimeout(setupInterval, msDelta);

    function setupInterval() {
        actualJob();

        setInterval(actualJob, msInDay);
    }

    function actualJob() {
        console.log('test');
    }
}

// Set new theme
function themeSettings(obj) {
    'use strict';

    // Get the body element
    let body = document.getElementsByTagName('body')[0];

    // Get theme mode icon
    let themeIcon = document.querySelector('.theme-mode-icon');

    // Check to see if the user is in automatic or toggle mode
    let themeMode = obj.value;

    // If the user has toggled the theme
    if (themeMode == 'toggle-theme') {
        // Dark mode when switch is turned on 
        let darkTheme = obj.checked;

        // If dark mode is selected
        if (darkTheme) {
            body.classList.add('dark-mode');

            // Set to Local Storage the theme mode
            localStorage.setItem('theme', 'dark-mode');

            themeIcon.classList.remove('bi-brightness-high');
            themeIcon.classList.add('bi-moon-fill');
        } else {
            body.classList.remove('dark-mode');

            // Set to Local Storage the theme mode
            localStorage.setItem('theme', 'light-mode');

            themeIcon.classList.add('bi-brightness-high');
            themeIcon.classList.remove('bi-moon-fill');
        }
    } else {
        // Automatically turn on dark mode at 18:00 every day
        localStorage.setItem('theme', 'automatic');
    }
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

// Make an element sticky top
window.onscroll = () => {
    const stickyNavPill = document.querySelector('.sticky-navpill');
    if (window.pageYOffset >= stickyNavPill.offsetTop) {
        stickyNavPill.classList.add('fix-top');
    } else {
        stickyNavPill.classList.remove('fix-top');
    }
};


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