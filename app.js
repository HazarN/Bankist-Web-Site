'use strict';

import { overlay, openModal, closeModal } from './src/modal.js';

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

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

// Modal Operations

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
