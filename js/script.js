// Sticky header
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Fade-in animation on scroll
function checkFade() {
  const fadeElements = document.querySelectorAll(".fade-in");

  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;

    if (elementTop < viewportHeight - 100 && elementBottom > 0) {
      element.classList.add("appear");
    }
  });
}

window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);
window.addEventListener("resize", checkFade);

// Initial check on page load
document.addEventListener("DOMContentLoaded", function () {
  checkFade();
});

// Testimonials carousel
const track = document.querySelector(".carousel-track");
const testimonials = Array.from(track.children);
const nextBtn = document.querySelector(".carousel-btn.right");
const prevBtn = document.querySelector(".carousel-btn.left");
const dotsNav = document.querySelector(".carousel-dots");

let currentIndex = 0;
let autoPlayInterval;

// Create dots
testimonials.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dotsNav.appendChild(dot);
});

const dots = Array.from(dotsNav.children);

function updateCarousel(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
  currentIndex = index;

  // Reset autoplay timer
  resetAutoPlay();
}

function nextSlide() {
  let newIndex = (currentIndex + 1) % testimonials.length;
  updateCarousel(newIndex);
}

function prevSlide() {
  let newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateCarousel(newIndex);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateCarousel(index);
  });
});

// Auto-play function
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

// Start autoplay
startAutoPlay();

// Pause autoplay when hovering over carousel
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", () => {
  clearInterval(autoPlayInterval);
});

carousel.addEventListener("mouseleave", () => {
  startAutoPlay();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// Swipe support for touch devices
let startX = 0;
let endX = 0;

track.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
  },
  { passive: true }
);

track.addEventListener(
  "touchend",
  (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const threshold = 50;
  if (startX - endX > threshold) {
    nextSlide();
  } else if (endX - startX > threshold) {
    prevSlide();
  }
}
