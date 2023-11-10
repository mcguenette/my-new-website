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


const marker = select('#marker');
const items = selectAll('nav a');

items.forEach(link => link.addEventListener('click', e => 
indicator(e.target)));

function indicator(item) {
  // Show the marker
  marker.style.display = 'block';
  
  // Set the position and height
  marker.style.top = item.offsetTop + 'px';
  marker.style.height = item.offsetHeight + 'px';
}

// var light = document.getElementById('light');

// document
//   .documentElement
//   .addEventListener('mousemove', function handleMouseMove(event) {
//     light.style.setProperty('--light-position-y', (event.clientY - 50) + 'px');
//     light.style.setProperty('--light-position-x', (event.clientX - 50) + 'px');
//   });


  document.addEventListener('DOMContentLoaded', function () {

    // Function to smoothly scroll to the target section
    function scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - document.querySelector('nav').offsetHeight,
          behavior: 'smooth'
        });
      }
    }

    // Function to update the active link and marker based on scroll position
    function updateActiveLink() {
      const sections = document.querySelectorAll('section');
      let scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - document.querySelector('nav').offsetHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const linkId = section.id + '-nav';
          document.querySelectorAll('nav a').forEach((link) => {
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

    // Add event listeners to your nav links
    document.getElementById('about-nav').addEventListener('click', function (event) {
      event.preventDefault();
      scrollToSection('about');
    });

    document.getElementById('xp-nav').addEventListener('click', function (event) {
      event.preventDefault();
      scrollToSection('experience');
    });

    document.getElementById('projects-nav').addEventListener('click', function (event) {
      event.preventDefault();
      scrollToSection('projects');
    });

    // Add scroll event listener to update active link and marker
    window.addEventListener('scroll', updateActiveLink);

    // Initial update on page load
    window.addEventListener('load', updateActiveLink);
  });