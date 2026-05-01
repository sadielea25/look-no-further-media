import './css/theme.css'
import './css/intro.css'
import './css/style.css'
import { initIntro } from './js/intro.js'

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the cinematic intro sequence
  initIntro();

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});
