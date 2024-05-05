'use strict';

// Function to load JSON file based on language
function loadLanguageJSON(language) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', `locales/${language}.json`, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
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
    // Load language JSON for the selected language
    loadLanguageJSON(selectedLanguage)
      .then(data => {
        console.log(`Loaded ${selectedLanguage} language JSON:`, data);
        updateWebsiteContent(data);
        // Translate quote section based on selected language
        translateQuoteSection(selectedLanguage);
        //Translate search input placeholder
        changeSearchInput(selectedLanguage);
        // Translate email input placeholder
        changeInputEmail(selectedLanguage);
        // Translate blog content
        translateBlogContent(selectedLanguage);
        // Translate announcement bar
        translateSlidesContent(selectedLanguage);
      })
      .catch(error => {
        console.error(
          `Error loading ${selectedLanguage} language JSON:`,
          error
        );
      });
  }
});

// Function to translate the news banner section

// Slide 1

const slide1German = `<div class="announcement-slide text-center">
<p class="announcement-name">NEWSLETTER: <a class="announcement-link" href="#">Jetzt anmelden und 10 Euro Rabatt sichern!</a></p></div>`;

const slide1English = `<div class="announcement-slide text-center">
<p class="announcement-name">NEWSLETTER: <a class="announcement-link"    href="#">Register now and get a 10 euro discount!</a></p></div>`;

const slide1Spanish = `<div class="announcement-slide text-center">
<p class="announcement-name">NEWSLETTER: <a class="announcement-link"    href="#">Inscríbase ahora y obtenga un descuento de 10 euros!</a></p></div>`;

// Slide 2

const slide2German = `<div class="announcement-slide text-center">
<p class="announcement-name">FRISCH EINGETROFFEN: <a class="announcement-link" href="#">Kaltgepresstes Walnussöl</a></p></div>`;

const slide2English = `<div class="announcement-slide text-center">
<p class="announcement-name">JUST ARRIVED: <a class="announcement-link"    href="#">Cold-pressed walnut oil</a></p></div>`;

const slide2Spanish = `<div class="announcement-slide text-center">
<p class="announcement-name">RECIÉN LLEGADO: <a class="announcement-link"    href="#">Aceite de nuez prensado en frío</a></p></div>`;

// Slide 3

const slide3German = `<div class="announcement-slide text-center">
<p class="announcement-name">FRÜHLINGSFRISCHE: <a class="announcement-link" href="#">Kaltgepresstes Walnussöl</a></p></div>`;

const slide3English = `<div class="announcement-slide text-center">
<p class="announcement-name">SPRINGTIME FRESHNESS: <a class="announcement-link"    href="#">Refresh yourself with our mint spray!</a></p></div>`;

const slide3Spanish = `<div class="announcement-slide text-center">
<p class="announcement-name">FRESCURA PRIMAVERAL: <a class="announcement-link"    href="#">¡Refrésquese con nuestro spray de menta!</a></p></div>`;

function translateSlidesContent(selectedLanguage) {
  const swiperSlide = document.querySelectorAll('.swiper-slide');

  swiperSlide.forEach(content => {
    if (content.classList.contains('slide1')) {
      if (selectedLanguage === 'en') {
        content.innerHTML = slide1English;
      } else if (selectedLanguage === 'es') {
        content.innerHTML = slide1Spanish;
      } else if (selectedLanguage === 'de') {
        content.innerHTML = slide1German;
      }
    } else if (content.classList.contains('slide2')) {
      if (selectedLanguage === 'en') {
        content.innerHTML = slide2English;
      } else if (selectedLanguage === 'es') {
        content.innerHTML = slide2Spanish;
      } else if (selectedLanguage === 'de') {
        content.innerHTML = slide2German;
      }
    } else if (content.classList.contains('slide3')) {
      if (selectedLanguage === 'en') {
        content.innerHTML = slide3English;
      } else if (selectedLanguage === 'es') {
        content.innerHTML = slide3Spanish;
      } else if (selectedLanguage === 'de') {
        content.innerHTML = slide3German;
      }
    }
  });
}

// Function to translate the quote section

const quoteText = document.querySelector('.quote-text');

const quoteTextEnglish = `<span class="quote-mark-left">“</span>Remembrance is not about dwelling on the past,<br />but about forging new paths for the future.<span class="quote-mark-right">“</span><br />(Marceline Dubois)`;

const quoteTextSpanish = `<span class="quote-mark-left">“</span>Recordar no es quedarse en el pasado,<br />sino forjar nuevos caminos para el futuro.<span class="quote-mark-right">“</span><br />(Marceline Dubois)`;

const quoteTextGerman = `<span class="quote-mark-left">“</span>Erinnerung ist nicht das Verweilen in der Vergangenheit, <br />sondern das Schmieden neuer Pfade für die Zukunft.<span class="quote-mark-right">“</span><br />(Marceline Dubois)`;

function translateQuoteSection(selectedLanguage) {
  if (selectedLanguage === 'en') {
    quoteText.innerHTML = quoteTextEnglish;
  } else if (selectedLanguage === 'es') {
    quoteText.innerHTML = quoteTextSpanish;
  } else if (selectedLanguage === 'de') {
    quoteText.innerHTML = quoteTextGerman;
  }
}

// Function to translate the seach & email fields

// Search Bar
function changeSearchInput(selectedLanguage) {
  const searchInput = document.getElementById('search');
  if (selectedLanguage === 'en') {
    searchInput.placeholder = 'Search';
  } else if (selectedLanguage === 'es') {
    searchInput.placeholder = 'Buscar';
  } else if (selectedLanguage === 'de') {
    searchInput.placeholder = 'Suchen';
  }
}

// Email input

function changeInputEmail(selectedLanguage) {
  const emailInput = document.getElementById('email');
  if (selectedLanguage === 'en') {
    emailInput.placeholder = 'Email address';
  } else if (selectedLanguage === 'es') {
    emailInput.placeholder = 'Dirección de e-mail';
  } else if (selectedLanguage === 'de') {
    emailInput.placeholder = 'Emailadresse';
  }
}

// Blog text + blog link (more)

const sportlerTextEnglish = `<span class="blog-box--content sportler">
For athletes, not only the right equipment is equipment is crucial, but also a balanced diet and <a class="blog-box--more common-text" href="#">more</a>
</span>`;

const sportlerTextSpanish = `<span class="blog-box--content sportler">
Para los deportistas, no sólo es equipamiento es crucial, sino también una dieta equilibrada y <a class="blog-box--more common-text" href="#">más</a>
</span>`;

const sportlerTextGerman = `<span class="blog-box--content sportler">
Für Sportler ist nicht nur die richtige Ausrüstung entscheidend, sondern auch eine ausgewogene Ernährung und <a class="blog-box--more common-text" href="#">mehr</a>
</span>`;

const schönheitTextEnglish = `<span class="blog-box--content sportler">
In a world full of chemical ingredients and artificial products, many people are longing for natural <a class="blog-box--more common-text" href="#">more</a></span>`;

const schönheitTextSpanish = `<span class="blog-box--content sportler">
En un mundo lleno de ingredientes químicos y productos artificiales, muchas personas anhelan lo natural <a class="blog-box--more common-text" href="#">más</a></span>`;

const schönheitTextGerman = `<span class="blog-box--content sportler">
In einer Welt voller chemischer Inhaltsstoffe und künstlicher Produkte sehnen sich viele Menschen nach natürlicher<a class="blog-box--more common-text" href="#">mehr</a></span>`;

const namasteTextGerman = `<span class="blog-box--content sportler">
In der heutigen schnelllebigen Welt ist es wichtig, Zeit für Entspannung und Ausgleich zu finden. Eine wunderbare <a class="blog-box--more common-text" href="#">mehr</a></span>`;

const namasteTextEnglish = `<span class="blog-box--content sportler">
In today's fast-paced world, it is important to find time for relaxation and balance. A wonderful <a class="blog-box--more common-text" href="#">more</a></span>`;

const namasteTextSpanish = `<span class="blog-box--content sportler">
En el acelerado mundo actual, es importante encontrar tiempo para la relajación y el equilibrio. Un maravilloso <a class="blog-box--more common-text" href="#">más</a></span>`;

function translateBlogContent(selectedLanguage) {
  const blogBoxContents = document.querySelectorAll('.blog-box--content');

  blogBoxContents.forEach(content => {
    if (content.classList.contains('sportler')) {
      if (selectedLanguage === 'en') {
        content.innerHTML = sportlerTextEnglish;
      } else if (selectedLanguage === 'es') {
        content.innerHTML = sportlerTextSpanish;
      } else if (selectedLanguage === 'de') {
        content.innerHTML = sportlerTextGerman;
      }
    } else if (content.classList.contains('schönheit')) {
      if (selectedLanguage === 'en') {
        content.innerHTML = schönheitTextEnglish;
      } else if (selectedLanguage === 'es') {
        content.innerHTML = schönheitTextSpanish;
      } else if (selectedLanguage === 'de') {
        content.innerHTML = schönheitTextGerman;
      }
    } else if (content.classList.contains('namaste')) {
      if (selectedLanguage === 'en') {
        content.innerHTML = namasteTextEnglish;
      } else if (selectedLanguage === 'es') {
        content.innerHTML = namasteTextSpanish;
      } else if (selectedLanguage === 'de') {
        content.innerHTML = namasteTextGerman;
      }
    }
  });
}
