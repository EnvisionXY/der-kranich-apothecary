'use strict';

// Function to check user's language preference
function getUserLanguage() {
  const userLanguage = navigator.language || navigator.userLanguage;
  // Convert user language to lowercase for case-insensitive comparison
  const languageCode = userLanguage.toLowerCase();

  // Check if the user's language is German (de) or Spanish (es)
  if (languageCode.startsWith('de')) {
    return 'de'; // German
  } else if (languageCode.startsWith('es')) {
    return 'es'; // Spanish
  } else {
    return 'en'; // Default to English for any other language
  }
}

// Function to load JSON file based on language
function loadLanguageJSON(language) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', `locales/${language}.json`, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      }
    };
    xhr.onerror = function () {
      reject(xhr.statusText);
    };
    xhr.send(null);
  });
}

// Function to update website content with language data
function updateWebsiteContent(data) {
  // Traverse the DOM and replace text content with corresponding text from JSON data
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = document.querySelector(`[data-translate="${key}"]`);
      if (element) {
        element.textContent = data[key];
      }
    }
  }
}

// Function to handle language selection
document.addEventListener('click', function (event) {
  const languageDropdown = document.getElementById('language-dropdown');
  if (!languageDropdown.contains(event.target)) return;

  if (event.target.tagName === 'LI') {
    const selectedLanguage = event.target.getAttribute('value');
    loadLanguageJSON(selectedLanguage)
      .then(data => {
        console.log('Loaded language JSON:', data);
        updateWebsiteContent(data);
      })
      .catch(error => {
        console.error('Error loading language JSON:', error);
      });
  }
});

// Example usage:
const userLanguage = getUserLanguage(); // Assign the user's language preference
loadLanguageJSON(userLanguage)
  .then(data => {
    console.log('Loaded language JSON:', data);
    updateWebsiteContent(data);
  })
  .catch(error => {
    console.error('Error loading language JSON:', error);
  });
