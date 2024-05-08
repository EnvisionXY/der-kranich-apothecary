'use strict';

// Selectors
const dropdowns = document.querySelectorAll('.dropdown');
const herbalGradients = document.querySelectorAll('.herbal-gradient');
const emailInput = document.getElementById('email');
const newsDisclaimer = document.querySelector('.news-disclaimer');
const policyBtn = document.querySelector('.news-policy-btn');
const headerSpans = document.querySelectorAll('.blog-box-header--span');
const dropdownBox = document.querySelector('.mobile-dropdown--box');
const divider = document.querySelector('.mobile-divider');
const announcementBar = document.querySelector('section.announcement-bar');
const headerBox = document.querySelector('.header-box');
const kranichLogo = document.querySelector('.kranich-logo');

// Dropdown Menu
function setupDropdownMenu() {
  // Add click event listener to the document body
  document.body.addEventListener('click', event => {
    // Loop through all dropdowns
    dropdowns.forEach(dropdown => {
      // Check if the click occurred inside the dropdown or its children
      const isClickInsideDropdown = dropdown.contains(event.target);

      // If click is not inside dropdown, close the dropdown
      if (!isClickInsideDropdown) {
        const menu = dropdown.querySelector('.menu');
        menu.classList.remove('menu-open');
      }
    });
  });

  // Loop through all dropdown elements
  dropdowns.forEach(dropdown => {
    // Get inner elements from each dropdown
    const select = dropdown.querySelector('.select');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    // Add a click event to the select element
    select.addEventListener('click', event => {
      // Prevent event propagation to the body click listener
      event.stopPropagation();

      // Add the clicked select styles to the select element
      select.classList.toggle('select-clicked');

      // Close other open dropdowns
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.querySelector('.menu').classList.remove('menu-open');
        }
      });

      // Add the open styles to the menu element
      menu.classList.toggle('menu-open');
    });

    // Loop through all option elements
    options.forEach(option => {
      // Add a click event to the option element
      option.addEventListener('click', () => {
        // Change selected inner text to clicked option inner text
        selected.innerText = option.innerText;

        // Add the clicked select styles to the select element
        select.classList.remove('select-clicked');

        // Close the dropdown
        menu.classList.remove('menu-open');

        // Remove active class from all option elements
        options.forEach(option => {
          option.classList.remove('active');
        });

        // Add active class to clicked option element
        option.classList.add('active');
      });
    });
  });
}

// Rotate chevrons

function rotateChevron() {
  const dropdownIcons = document.querySelectorAll('.dropdown-icon');
  dropdownIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('rotate-chevron');
    });
  });
}

// Call the function to initialize
rotateChevron();

// Herbal Image Hover Effect
function setupHerbalImageHoverEffect() {
  herbalGradients.forEach(herbalGradient => {
    // Add event listener for mouseenter
    herbalGradient.addEventListener('mouseenter', function () {
      const herbalImg = this.nextElementSibling;
      herbalImg.style.transform = 'scale(1.03)';
      herbalImg.style.filter = 'brightness(0.8)';
    });

    // Add event listener for mouseleave
    herbalGradient.addEventListener('mouseleave', function () {
      const herbalImg = this.nextElementSibling;
      herbalImg.style.transform = 'scale(1)';
      herbalImg.style.filter = 'brightness(1)';
    });
  });
}

// Email Disclaimer
function setupEmailDisclaimer() {
  emailInput.addEventListener('click', function () {
    newsDisclaimer.classList.remove('hidden');
  });

  policyBtn.addEventListener('click', function () {
    newsDisclaimer.classList.add('hidden');
  });
}

// Blog Dynamic Divider Length
function setupBlogDividerWidth() {
  function adjustDividerWidth() {
    headerSpans.forEach(headerSpan => {
      const boundingRect = headerSpan.getBoundingClientRect();
      const headerWidth = boundingRect.width;

      const divider = headerSpan
        .closest('.blog-container')
        .querySelector('.divider');

      const newDivider = headerWidth * 0.9;
      divider.style.width = `${newDivider}px`;
    });
  }

  adjustDividerWidth();

  window.addEventListener('resize', adjustDividerWidth);
}

// Set Length of Mobile Divider
function setMobileDividerWidth() {
  const width = dropdownBox.getBoundingClientRect().width;
  divider.style.maxWidth = width + 'px';
}

// Sticky Navigation

function setupStickyNavigation() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const stickyCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        kranichLogo.classList.remove('kranich-sticky');
        headerBox.classList.remove('sticky');
        const style = document.querySelector('.header-box.sticky.container');
        if (style) {
          style.remove();
        }
      } else {
        kranichLogo.classList.add('kranich-sticky');
        headerBox.classList.add('sticky');
        const style = document.createElement('style');
        style.textContent = `
          .header-box.sticky.container {
            max-width: none;
          }
        `;
        document.head.appendChild(style);
      }
    });
  };

  const observer = new IntersectionObserver(stickyCallback, observerOptions);

  // Add a check for the media query
  const mediaQuery = window.matchMedia('(max-width: 44em)');
  const mediaQueryListener = event => {
    if (event.matches) {
      observer.disconnect(); // Suspend the observer when the media query condition is met
    } else {
      observer.observe(announcementBar);
    }
  };

  // Add the event listener for the media query
  mediaQuery.addListener(mediaQueryListener);

  // Initial check to see if the media query matches
  mediaQueryListener(mediaQuery);
}

// Main function to setup all functionalities
function setupPage() {
  setupDropdownMenu();
  setupHerbalImageHoverEffect();
  setupEmailDisclaimer();
  setupBlogDividerWidth();
  setMobileDividerWidth();
  setupStickyNavigation();
}

// Call the main setup function
setupPage();
