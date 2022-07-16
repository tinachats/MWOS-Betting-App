// Theme settings
function themeSettings(obj) {
    // Get the body element
    let body = document.getElementsByTagName('body')[0];

    // Check to see if the user is in automatic or toggle mode
    let themeMode = obj.value;

    // Get saved theme mode 
    let savedThemeMode = localStorage.getItem('theme');

    // If the user has already saved theme settings
    if (savedThemeMode != '') {
        // Do something
    }

    // If the user has toggled the theme
    if (themeMode == 'toggle-theme') {
        let darkTheme = obj.checked;
        if (darkTheme) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    } else {
        // User is in automatic mode
        console.log('Automatic mode');
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

                    animatedCounter();
                    animateProgressBar();
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