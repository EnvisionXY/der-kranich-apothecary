'use strict';
// Dropdown Menu

// Get all dropdowns from the document
const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

// Add click event listener to the document body
document.body.addEventListener('click', event => {
  // Loop through all dropdowns
  mobileDropdowns.forEach(dropdown => {
    // Check if the click occurred inside the dropdown or its children
    const isClickInsideDropdown = dropdown.contains(event.target);

    // If click is not inside dropdown, close the dropdown
    if (!isClickInsideDropdown) {
      dropdown
        .querySelector('.mobile-dropdown-menu')
        .classList.remove('menu-open');
    }
  });
});

// Loop through all dropdown elements
mobileDropdowns.forEach(dropdown => {
  // Get inner elements from each dropdown
  const select = dropdown.querySelector('.mobile-select');
  const menu = dropdown.querySelector('.mobile-dropdown-menu');
  const options = dropdown.querySelectorAll('.mobile-dropdown-menu li');
  const selected = dropdown.querySelector('.mobile-selected');

  // Add a click event to the select element
  select.addEventListener('click', event => {
    // Prevent event propagation to the body click listener
    event.stopPropagation();

    // Close other open dropdowns
    mobileDropdowns.forEach(otherDropdown => {
      if (otherDropdown !== dropdown) {
        otherDropdown
          .querySelector('.mobile-dropdown-menu')
          .classList.remove('menu-open');
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
