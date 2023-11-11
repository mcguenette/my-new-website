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
        select('main').scrollTo({
          top: section.offsetTop - select('nav').offsetHeight,
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
            const marker = document.getElementById('marker');
            marker.style.display = 'block';
            marker.style.top = activeLink.offsetTop + 'px';
            marker.style.height = activeLink.offsetHeight + 'px';
          }
        }
      });
    }
    // Nav link events
    document.getElementById('about-nav').addEventListener('click', function (event) {
      event.preventDefault();
      scrollToSection('about');
    });
  
    document.getElementById('experience-nav').addEventListener('click', function (event) {
      event.preventDefault();
      scrollToSection('experience');
    });
  
    document.getElementById('projects-nav').addEventListener('click', function (event) {
      event.preventDefault();
      scrollToSection('projects');
    });
  
    select('main').addEventListener('scroll', function () {
      updateActiveLink();
    });
  
    window.addEventListener('load', updateActiveLink);
  });