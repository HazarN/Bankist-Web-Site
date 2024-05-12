'use strict';

import { overlay, openModal, closeModal } from './src/modal.js';

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');

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

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

//////////////////
// Page Navigation

// event delegation: passing three different scrolling event in one event handler
navLinks.addEventListener('click', e => {
  e.preventDefault();

  // event must contain the link properties only
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    const selectorId = e.target.getAttribute('href');
    document.querySelector(selectorId).scrollIntoView({ behavior: 'smooth' });
  }
});

// learn more
btnScrollTo.addEventListener('click', e => {
  /* old way
  const section1Coords = section1.getBoundingClientRect();

  window.scrollTo({
    left: section1Coords.left + window.scrollX,
    top: section1Coords.top + window.scrollY,
    behavior: 'smooth',
  }); */

  // for newer browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});
