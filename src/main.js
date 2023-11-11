'use strict';

// Add event listener
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

// Get HTML element by id
function getElement(selector, parent = document) {
  return parent.getElementById(selector);
}

// Select HTML element by selector
function select(selector, parent = document) {
  return parent.querySelector(selector);
}

// Get a (node) list of HTML elements
function selectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

// Dark/Light mode
const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

themeToggle.checked = body.getAttribute('data-theme') === 'dark';

themeToggle.addEventListener('change', function () {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }
});

// Create/Add Marker
const marker = select('#marker');
const items = selectAll('nav a');

items.forEach(link => link.addEventListener('click', e => 
indicator(e.target)));

function indicator(item) {
  marker.style.display = 'block';
  marker.style.top = item.offsetTop + 'px';
  marker.style.height = item.offsetHeight + 'px';
}

onEvent('DOMContentLoaded', document, function () {
    // console.log('Script loaded successfully.');
  
    function scrollToSection(sectionId) {
      const section = select(sectionId);
      if (section) {
        document.querySelector('main').scrollTo({
          top: section.offsetTop - select('#nav').offsetHeight,
          behavior: 'smooth'
        });
      }
    }
  
// Update the active marker based on scroll
    function updateActiveLink() {
  
      const sections = selectAll('section');
      let scrollPosition = select('main').scrollTop;
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - select('nav').offsetHeight;
        const sectionBottom = sectionTop + section.offsetHeight;
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const linkId = section.id + '-nav';
          selectAll('nav a').forEach((link) => {
            link.classList.remove('active');
          });
  
          const activeLink = document.getElementById(linkId);
          if (activeLink) {
            activeLink.classList.add('active');
            // Update marker position
            const marker = select('#marker');
            marker.style.display = 'block';
            marker.style.top = activeLink.offsetTop + 'px';
            marker.style.height = activeLink.offsetHeight + 'px';
          }
        }
      });
    }
    // Nav link events
    select('#about-nav').addEventListener('click', function (event) {
      event.preventDefault();
      scrollToSection('about');
    });
  
    select('#experience-nav').addEventListener('click', function (event) {
      event.preventDefault();
      console.log('clicked experience');
      scrollToSection('experience');
    });
  
    select('#projects-nav').addEventListener('click', function (event) {
      event.preventDefault();
      scrollToSection('projects');
    });
  
    select('main').addEventListener('scroll', function () {
      updateActiveLink();
    });
  
    window.addEventListener('load', updateActiveLink);
  });