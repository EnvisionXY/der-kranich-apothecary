'use strict';
// Dropdown Menu

const openDropdown = document.querySelector('.icon-mobile-open');
const closeDropdown = document.querySelector('.icon-mobile-close');
const mainNavMobile = document.querySelector('.main-nav--mobile');

openDropdown.addEventListener('click', () => {
  mainNavMobile.style.display = 'block';
});

closeDropdown.addEventListener('click', () => {
  mainNavMobile.style.display = 'none';
});
