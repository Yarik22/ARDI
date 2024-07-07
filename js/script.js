document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const carousel = document.querySelector(".carousel");
  const carouselInner = document.querySelector(".carousel-inner");
  const items = document.querySelectorAll(".carousel-item");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const closeButton = document.querySelector(".close");
  const mainContent = document.querySelector("main"); // Change this selector to target your main content
  const totalItems = items.length;

  let index = 2;

  function updateCarousel() {
    items[index].style.filter = "brightness(1.2)";
    carouselInner.style.transition = "transform 0.5s ease";
    carouselInner.style.transform = `translateX(-${(index - 1) * 33.3333}%)`;
  }

  function moveToNextSlide() {
    items[index].style.filter = "brightness(1)";
    if (index >= totalItems - 2) {
      index = 2;
      carouselInner.style.transition = "none";
      carouselInner.style.transform = `translateX(-${(index - 1) * 33.3333}%)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          carouselInner.style.transition = "transform 0.5s ease";
          index++;
          updateCarousel();
        });
      });
    } else {
      index++;
      updateCarousel();
    }
  }

  function moveToPrevSlide() {
    items[index].style.filter = "brightness(1)";
    if (index <= 1) {
      index = totalItems - 3;
      carouselInner.style.transition = "none";
      carouselInner.style.transform = `translateX(-${(index - 1) * 33.3333}%)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          carouselInner.style.transition = "transform 0.5s ease";
          index--;
          updateCarousel();
        });
      });
    } else {
      index--;
      updateCarousel();
    }
  }

  function disableScroll() {
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventDefaultForScrollKeys);
    if (mainContent) {
      mainContent.style.filter = "blur(5px)";
    }
  }

  function enableScroll() {
    window.removeEventListener("wheel", preventDefault, { passive: false });
    window.removeEventListener("touchmove", preventDefault, { passive: false });
    window.removeEventListener("keydown", preventDefaultForScrollKeys);
    if (mainContent) {
      mainContent.style.filter = "none";
    }
  }

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      index = i + 2;
      carousel.style.display = "flex";
      setTimeout(() => {
        carousel.style.opacity = 1;
      }, 50);
      disableScroll();
      updateCarousel();
    });
  });

  prevButton.addEventListener("click", moveToPrevSlide);
  nextButton.addEventListener("click", moveToNextSlide);

  closeButton.addEventListener("click", () => {
    carousel.style.opacity = 0;
    enableScroll();
    setTimeout(() => {
      carousel.style.display = "none";
    }, 200);
  });

  carousel.addEventListener("click", (e) => {
    if (e.target === carousel) {
      carousel.style.opacity = 0;
      enableScroll();
      setTimeout(() => {
        carousel.style.display = "none";
      }, 200);
    }
  });

  const hoistElements = document.querySelectorAll(".hoist");

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  function onScroll() {
    hoistElements.forEach((el) => {
      if (isElementInViewport(el)) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const cards = document.querySelector(".cards");
  const items = document.querySelectorAll(".carousel-card");
  const totalItems = items.length;
  let index = 1;
  let lastInteractionTime = Date.now(); // Track the last interaction time

  // Clone first and last items for infinite effect
  const firstClone = items[0].cloneNode(true);
  const lastClone = items[totalItems - 1].cloneNode(true);

  cards.appendChild(firstClone);
  cards.insertBefore(lastClone, items[0]);

  cards.style.transform = `translateX(-${index * 100}%)`;

  function updateCarousel() {
    cards.style.transition = "transform 0.5s ease";
    cards.style.transform = `translateX(-${index * 100}%)`;
    lastInteractionTime = Date.now(); // Update last interaction time on update
  }

  function moveToNextSlide() {
    index++;
    updateCarousel();
    if (index === totalItems + 1) {
      setTimeout(() => {
        cards.style.transition = "none";
        index = 1;
        cards.style.transform = `translateX(-${index * 100}%)`;
      }, 500);
    }
  }

  function moveToPrevSlide() {
    index--;
    updateCarousel();
    if (index === 0) {
      setTimeout(() => {
        cards.style.transition = "none";
        index = totalItems;
        cards.style.transform = `translateX(-${index * 100}%)`;
      }, 500);
    }
  }

  nextBtn.addEventListener("click", () => {
    moveToNextSlide();
    lastInteractionTime = Date.now();
  });
  prevBtn.addEventListener("click", () => {
    moveToPrevSlide();
    lastInteractionTime = Date.now();
  });

  setInterval(function () {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastInteractionTime;
    if (elapsedTime > 7000) {
      moveToNextSlide();
    }
  }, 7000);
});

const header = document.getElementById("header");

function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolling");
  } else {
    header.classList.remove("scrolling");
  }
}

window.addEventListener("scroll", handleScroll);
