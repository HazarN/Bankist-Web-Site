'use strict';

const modal = document.querySelector('.modal');

export const overlay = document.querySelector('.overlay');

export const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

export const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
