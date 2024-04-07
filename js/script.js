'use strict';

// Dropdown Menu

// Get all dropdowns from the document
const dropdowns = document.querySelectorAll('.dropdown');

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

// Herbal Image Hover Effet

const herbalGradients = document.querySelectorAll('.herbal-gradient');

herbalGradients.forEach(herbalGradient => {
  // Add event listener for mouseenter
  herbalGradient.addEventListener('mouseenter', function () {
    // Select the corresponding sibling image
    const herbalImg = this.nextElementSibling;
    // Apply the effect to the corresponding image
    herbalImg.style.transform = 'scale(1.03)';
    herbalImg.style.filter = 'brightness(0.8)';
  });

  // Add event listener for mouseleave
  herbalGradient.addEventListener('mouseleave', function () {
    // Select the corresponding sibling image
    const herbalImg = this.nextElementSibling;
    // Reset the transform of the corresponding image
    herbalImg.style.transform = 'scale(1)';
    herbalImg.style.filter = 'brightness(1)';
  });
});

// Quick View Link

const colBoxes = document.querySelectorAll('.col-box');
colBoxes.forEach(colBoxes => {
  colBoxes.addEventListener('click', function () {
    window.open('https://www.google.com', '_blank');
  });
});

// Email Disclaimer

const emailInput = document.getElementById('email');
const newsDisclaimer = document.querySelector('.news-disclaimer');
const policyBtn = document.querySelector('.news-policy-btn');

emailInput.addEventListener('click', function () {
  // Show the disclaimer when the email input is clicked
  newsDisclaimer.classList.remove('hidden');
});

policyBtn.addEventListener('click', function () {
  // Hide the disclaimer when the policy button is clicked
  newsDisclaimer.classList.add('hidden');
});

// Blog dynamic divider length

// Function to adjust divider length based on header width
function adjustDividerLength() {
  const blogHeaders = document.querySelectorAll('.blog-box--header');

  blogHeaders.forEach(blogHeader => {
    const headerWidth = blogHeader.clientWidth;
    const divider = blogHeader.nextElementSibling;
    const newDividerWidth = headerWidth * 0.9;
    divider.style.width = `${newDividerWidth}px`;
  });
}

// Call the function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', adjustDividerLength);
