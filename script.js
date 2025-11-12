
// Menu toggle
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

// Dark Mode Toggle
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

// Toggle dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  // Update icon
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Section scroll and active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector(`header nav a[href*=${id}]`)
          .classList.add("active");
      });
    }
  });

  // Sticky header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Remove toggle menu when scrolling
  menuIcon.classList.remove("fa-xmark");
  navbar.classList.remove("active");
};

// Typed.js animation for multiple text in home section
const typed = new Typed(".multiple-text", {
  strings: ["Front-End Developer", "Biotechnologist",  "Climate Advocate", "Graphic Designer"],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

// ========== ANIMATE.CSS SCROLL TRIGGER ==========
// Intersection Observer for scroll-triggered animations
const animateOnScroll = () => {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Make element visible and trigger animation
        entry.target.style.opacity = '1';
        entry.target.style.visibility = 'visible';
        
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all animated elements except header and home section
  const elementsToAnimate = document.querySelectorAll(`
    .about .animate__animated,
    .services .animate__animated,
    .portfolio .animate__animated,
    .contact .animate__animated
  `);

  // Hide elements initially and observe them
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.visibility = 'hidden';
    observer.observe(el);
  });
};

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll();
}