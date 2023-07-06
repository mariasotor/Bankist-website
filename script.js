"use strict";

//Elements selected
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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
