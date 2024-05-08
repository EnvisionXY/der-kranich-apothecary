"use strict';";

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
