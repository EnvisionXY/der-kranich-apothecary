'use strict';

// Open & close dropdown Menu
const openDropdown = document.querySelector('.icon-mobile-open');
const closeDropdown = document.querySelector('.icon-mobile-close');
const mainNavMobile = document.querySelector('.main-nav--mobile');

const header = document.querySelector('.header');
const bar = document.querySelector('.announcement-bar');
const swiperBlur = document.querySelector('.swiper-blur');
const quote = document.querySelector('.quote');
const reccomendations = document.querySelector('.recommendations');

openDropdown.addEventListener('click', () => {
  mainNavMobile.classList.add('show-menu');
  header.classList.add('blur');
  bar.classList.add('blur');
  swiperBlur.classList.add('blur');
  quote.classList.add('blur');
  reccomendations.classList.add('blur');
  disableScroll();
});

closeDropdown.addEventListener('click', () => {
  mainNavMobile.classList.remove('show-menu');
  header.classList.remove('blur');
  bar.classList.remove('blur');
  swiperBlur.classList.remove('blur');
  quote.classList.remove('blur');
  reccomendations.classList.remove('blur');
  enableScroll();
});

// Mobile Nav Dropdown
const mobileChevrons = document.querySelectorAll('.mobile-dropdown-toggle');
const mobileDropdownMenus = document.querySelectorAll('.mobile-dropdown-menu');

mobileChevrons.forEach((chevron, index) => {
  chevron.addEventListener('click', () => {
    const menu = mobileDropdownMenus[index];
    toggleDropdown(menu, chevron);
  });
});

function toggleDropdown(menu, chevron) {
  // Close other open dropdown menus
  mobileDropdownMenus.forEach((dropdownMenu, index) => {
    if (dropdownMenu !== menu && dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
      const adjacentChevron = mobileChevrons[index];
      adjacentChevron.classList.remove('rotate-chevron');
    }
  });

  // Toggle current dropdown menu
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';

  // Toggle chevron rotation
  chevron.classList.toggle('rotate-chevron', menu.style.display === 'block');
}

// Function to disable scrolling
function disableScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

// Function to enable scrolling
function enableScroll() {
  window.onscroll = null;
}
