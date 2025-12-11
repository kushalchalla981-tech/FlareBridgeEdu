// JAva.js — Clean, well-documented behaviours

(function () {
  'use strict';

  function qs(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function qsa(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }

  // Mobile nav toggle
  function initNav() {
    const toggle = qs('.nav-toggle');
    const menu = qs('#main-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.style.display = expanded ? '' : 'flex';
      // keep styles accessible for keyboard users
    });

    // Improve keyboard accessibility: close menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        if (menu) menu.style.display = '';
      }
    });
  }

  // Simple client-side form validation and mock submission
  function initContactForm() {
    const form = qs('#contact-form');
    const status = qs('#form-status');
    if (!form) return;

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      status.textContent = '';

      const formData = new FormData(form);
      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const message = formData.get('message')?.toString().trim();

      if (!name || name.length < 2) {
        status.textContent = 'Please enter your name (2+ characters).';
        return;
      }

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      if (!message || message.length < 6) {
        status.textContent = 'Please enter a short message (6+ characters).';
        return;
      }

      // Mock async behaviour for demo — replace with real API call when available
      status.textContent = 'Sending message…';
      setTimeout(() => {
        form.reset();
        status.textContent = 'Thanks — your message has been submitted (demo).';
      }, 700);
    });
  }

  // Initialize everything after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initContactForm();
  });
})();