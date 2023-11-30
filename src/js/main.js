(() => {

  document.addEventListener('DOMContentLoaded', () => {
    console.log('hello world!')
    // burger menu
    const burgerButton = document.getElementById('burger-btn');
    const header = document.querySelector('header');
    burgerButton.addEventListener('click', () => {
      header.classList.toggle('open');
    });

    // slider
    const slides = document.querySelectorAll('.hero__slide');
    const paginationButtons = document.querySelectorAll('.hero__pagination');

    paginationButtons.forEach((element) => {
      element.addEventListener('click', (event) => {
        const target = event.currentTarget.dataset.target;

        paginationButtons.forEach((button) => { button.classList.remove('active-pagination') });
        event.currentTarget.classList.add('active-pagination');

        slides.forEach((element) => { element.classList.remove('active-slide') });
        document.querySelector(`[data-target="${target}"]`).classList.add('active-slide')
      });
    });

    const sliderBlock = document.querySelector('.hero__slider');
    sliderBlock.addEventListener('touchstart', handleTouchStart, false);
    sliderBlock.addEventListener('touchmove', handleTouchMove, false);

    let x1 = null;
    let y1 = null;

    function handleTouchStart(event) {
      const firstTouch = event.touches[0];
      x1 = firstTouch.clientX;
      y1 = firstTouch.clientY;
    }

    function handleTouchMove(event) {
      if (!x1 || !y1) { return false };
      let x2 = event.touches[0].clientX;
      let y2 = event.touches[0].clientY;

      let xDiff = x2 - x1;
      let yDiff = y2 - y1;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if ((xDiff) > 0) {
          slideSwipe(document.querySelectorAll('.hero__slide'));
        } else {
          slideSwipe(document.querySelectorAll('.hero__slide'));

        }
      } else {
        if ((yDiff) > 0) {
          console.log('up');
        } else {
          console.log('down')
        }
      }
      x1 = null;
      y1 = null;
    }

    let slideIndex = 0;
    function slideSwipe(array) {

      if (slideIndex == array.length - 1) {
        slideIndex = 0;
      } else {
        slideIndex++;
      }

      document.querySelector('.active-slide').classList.remove('active-slide');
      array[slideIndex].classList.add('active-slide');
    }

    // popup
    const popupBackground = document.querySelector('.products__popup');
    const popupContent = document.querySelector('.products__popup-video');
    const openPopupButton = document.getElementById('open-popup');

    openPopupButton.addEventListener('click', (event) => {
      event.preventDefault();
      popupBackground.classList.add('active');
      popupContent.classList.add('active');
      document.body.classList.add('disable-scroll');
    });
    document.addEventListener('click', (event) => {
      if (event.target === popupBackground) {
        popupBackground.classList.remove('active');
        popupContent.classList.remove('active');
        document.body.classList.remove('disable-scroll');
      }
    })

  });

})();

