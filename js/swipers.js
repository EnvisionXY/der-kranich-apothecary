new Swiper('#swiper-1', {
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
});

new Swiper('#swiper-2', {
  effect: 'fade',
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  parallax: true,
  speed: 600,
  lazyLoading: true,
  loop: true,
});
