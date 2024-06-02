'use strict';

import { overlay, openModal, closeModal } from './src/modal.js';

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContents = document.querySelectorAll('.operations__content');
const navbar = document.querySelector('.nav');

/////////////////////////////
// Cookie Notification Issues

const cookieMessage = document.createElement('div');

cookieMessage.classList.add('cookie-message');
cookieMessage.style.backgroundColor = '#37383D';
cookieMessage.style.width = '104.25%';
cookieMessage.innerHTML = `
We use cookies for improved functionality and analytics. 
<button class="btn btn--close-cookie">Got it!</button>
`;

header.append(cookieMessage);
cookieMessage.style.height =
  parseFloat(getComputedStyle(cookieMessage).height, 10) * 1.5 + 'px';

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => cookieMessage.remove());

///////////////////
// Modal Operations

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

//////////////////
// Page Navigation

navLinks.addEventListener('click', (e) => {
  e.preventDefault();

  const clicked = e.target.closest('.nav__link');

  if (
    clicked.classList.contains('nav__link') &&
    !clicked.classList.contains('nav__link--btn')
  ) {
    const selectorId = clicked.getAttribute('href');
    document.querySelector(selectorId).scrollIntoView({ behavior: 'smooth' });
  }
});

btnScrollTo.addEventListener('click', (e) =>
  section1.scrollIntoView({ behavior: 'smooth' })
);

////////////////////////////////////////////
// Building and Displaying Tabbed Components

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContents.forEach((content) =>
    content.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////
// Navbar Fading Animation

const handleFading = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((sb) => {
      if (sb !== link) sb.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

navbar.addEventListener('mouseover', handleFading.bind(0.5));
navbar.addEventListener('mouseout', handleFading.bind(1));

////////////////////
// Sticky Navigation

const navbarHeight = navbar.getBoundingClientRect().height;

const stickyNavbarObserver = new IntersectionObserver(
  // observer callback
  (entries) => {
    const [entry] = entries;

    if (!entry.isIntersecting) navbar.classList.add('sticky');
    else navbar.classList.remove('sticky');
  },
  // observer options object
  {
    root: null, // whole viewport
    rootMargin: `-${navbarHeight}px`,
    threshold: 0,
  }
);

stickyNavbarObserver.observe(header);

// Reveal sections on scroll

const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.25,
  }
);

sections.forEach((section) => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
// Image lazy loading (to improve better performance)

const lazyImgTargets = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    // switching to good quality
    entry.target.src = entry.target.dataset.src;

    // removing the blur
    entry.target.classList.remove('lazy-img');

    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.45,
  }
);

lazyImgTargets.forEach((img) => imageObserver.observe(img));
