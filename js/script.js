const galleryItems = document.querySelectorAll(".gallery-item");
const carousel = document.querySelector(".carousel");
const carouselInner = document.querySelector(".carousel-inner");
const items = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const closeButton = document.querySelector(".close");
const totalItems = items.length;

let index = 2;

function updateCarousel() {
  items[index].style = "filter: brightness(1.2);";
  carouselInner.style.transition = "transform 0.5s ease";
  carouselInner.style.transform = `translateX(-${(index - 1) * 33.3333}%)`;
}

function moveToNextSlide() {
  items[index].style = "filter: brightness(1);";
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
  items[index].style = "filter: brightness(1);";
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

galleryItems.forEach((item, i) => {
  item.addEventListener("click", () => {
    index = i + 2;
    carousel.style.display = "flex";
    document.body.style.overflow = "hidden";
    updateCarousel();
  });
});

prevButton.addEventListener("click", moveToPrevSlide);
nextButton.addEventListener("click", moveToNextSlide);

closeButton.addEventListener("click", () => {
  carousel.style.display = "none";
  document.body.style.overflow = "auto";
});

carousel.addEventListener("click", (e) => {
  if (e.target === carousel) {
    carousel.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
