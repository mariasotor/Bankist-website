"use strict";

//Elements selected
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const sections = document.querySelectorAll(".section");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

///////////////////////////////////////
// Modal window
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Page navigation
/*document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (event) {
    event.preventDefault();

    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  });
});*/ //Not efficient

//Using Event delegation
//1. Add event listener to common parent element
document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    event.preventDefault();
    //2.Determine what element originated the event
    const element = event.target;
    if (
      element.classList.contains("nav__link") &&
      !element.classList.contains("nav__link--btn")
    ) {
      const id = element.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
      });
    }
  });

//Button smooth scrolling
btnScrollTo.addEventListener("click", function (event) {
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

//Tabbed component
tabsContainer.addEventListener("click", function (event) {
  const btnClicked = event.target.closest(".operations__tab"); //Use closest method since there are child elements that cab be clicked instead

  //Guard clause -- if statement that return earlier if the condition is true
  if (!btnClicked) return;

  //Remove active classes
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  //Active tab
  btnClicked.classList.add("operations__tab--active");

  //Activate content area
  const tab = btnClicked.dataset.tab;
  document
    .querySelector(`.operations__content--${tab}`)
    .classList.add("operations__content--active");
});

//Menu fade animation

const handlerHover = function (opacity) {
  return function (event) {
    const linkHovered = event.target;
    if (linkHovered.classList.contains("nav__link")) {
      const siblings = linkHovered
        .closest(".nav")
        .querySelectorAll(".nav__link");
      const logo = linkHovered.closest(".nav").querySelector(".nav__logo");

      siblings.forEach((el) => {
        if (el !== linkHovered) el.style.opacity = opacity;
        logo.style.opacity = opacity;
      });
    }
  };
};

nav.addEventListener("mouseover", handlerHover(0.5));

nav.addEventListener("mouseout", handlerHover(1));

//Sticky navigation - Intersection Observed API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const obsOptions = { root: null, threshold: 0, rootMargin: `-${navHeight}px` };
const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

//Revealing sections animation
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
