document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const carousel = document.querySelector(".carousel");
  const carouselInner = document.querySelector(".carousel-inner");
  const items = document.querySelectorAll(".carousel-item");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const closeButton = document.querySelector(".close");
  const mainContent = document.querySelector("main");
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
  let lastInteractionTime = Date.now();

  const firstClone = items[0].cloneNode(true);
  const lastClone = items[totalItems - 1].cloneNode(true);

  cards.appendChild(firstClone);
  cards.insertBefore(lastClone, items[0]);

  cards.style.transform = `translateX(-${index * 100}%)`;

  function updateCarousel() {
    cards.style.transition = "transform 0.5s ease";
    cards.style.transform = `translateX(-${index * 100}%)`;
    lastInteractionTime = Date.now();
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

if (!Util) function Util() {}

Util.addClass = function (el, className) {
  var classList = className.split(" ");
  el.classList.add(classList[0]);
  if (classList.length > 1) Util.addClass(el, classList.slice(1).join(" "));
};

Util.removeClass = function (el, className) {
  var classList = className.split(" ");
  el.classList.remove(classList[0]);
  if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(" "));
};

Util.toggleClass = function (el, className, bool) {
  if (bool) Util.addClass(el, className);
  else Util.removeClass(el, className);
};

Util.moveFocus = function (element) {
  if (!element) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute("tabindex", "-1");
    element.focus();
  }
};

Util.getIndexInArray = function (array, el) {
  return Array.prototype.indexOf.call(array, el);
};

(function () {
  var LanguagePicker = function (element) {
    this.element = element;
    this.select = this.element.getElementsByTagName("select")[0];
    this.options = this.select.getElementsByTagName("option");
    this.selectedOption = getSelectedOptionText(this);
    this.pickerId = this.select.getAttribute("id");
    this.trigger = false;
    this.dropdown = false;
    this.firstLanguage = false;
    this.arrowSvgPath =
      '<svg viewBox="0 0 16 16"><polygon points="3,5 8,11 13,5 "></polygon></svg>';
    this.globeSvgPath =
      '<svg viewBox="0 0 16 16"><path d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M13.9,7H12c-0.1-1.5-0.4-2.9-0.8-4.1 C12.6,3.8,13.6,5.3,13.9,7z M8,14c-0.6,0-1.8-1.9-2-5H10C9.8,12.1,8.6,14,8,14z M6,7c0.2-3.1,1.3-5,2-5s1.8,1.9,2,5H6z M4.9,2.9 C4.4,4.1,4.1,5.5,4,7H2.1C2.4,5.3,3.4,3.8,4.9,2.9z M2.1,9H4c0.1,1.5,0.4,2.9,0.8,4.1C3.4,12.2,2.4,10.7,2.1,9z M11.1,13.1 c0.5-1.2,0.7-2.6,0.8-4.1h1.9C13.6,10.7,12.6,12.2,11.1,13.1z"></path></svg>';

    initLanguagePicker(this);
    initLanguagePickerEvents(this);
  };

  function initLanguagePicker(picker) {
    picker.element.insertAdjacentHTML(
      "beforeend",
      initButtonPicker(picker) + initListPicker(picker)
    );

    picker.dropdown = picker.element.getElementsByClassName(
      "language-picker__dropdown"
    )[0];
    picker.languages = picker.dropdown.getElementsByClassName(
      "language-picker__item"
    );
    picker.firstLanguage = picker.languages[0];
    picker.trigger = picker.element.getElementsByClassName(
      "language-picker__button"
    )[0];
  }

  function initLanguagePickerEvents(picker) {
    var svgs = picker.trigger.getElementsByTagName("svg");
    Util.addClass(svgs[0], "li4-icon");
    Util.addClass(svgs[1], "li4-icon");
    initLanguageSelection(picker);

    picker.trigger.addEventListener("click", function () {
      toggleLanguagePicker(picker, false);
    });
    picker.dropdown.addEventListener("keydown", function (event) {
      if (
        (event.keyCode && event.keyCode == 38) ||
        (event.key && event.key.toLowerCase() == "arrowup")
      ) {
        keyboardNavigatePicker(picker, "prev");
      } else if (
        (event.keyCode && event.keyCode == 40) ||
        (event.key && event.key.toLowerCase() == "arrowdown")
      ) {
        keyboardNavigatePicker(picker, "next");
      }
    });
  }

  function toggleLanguagePicker(picker, bool) {
    var ariaExpanded;
    if (bool) {
      ariaExpanded = bool;
    } else {
      ariaExpanded =
        picker.trigger.getAttribute("aria-expanded") == "true"
          ? "false"
          : "true";
    }
    picker.trigger.setAttribute("aria-expanded", ariaExpanded);
    if (ariaExpanded == "true") {
      picker.firstLanguage.focus();
      picker.dropdown.addEventListener("transitionend", function cb() {
        picker.firstLanguage.focus();
        picker.dropdown.removeEventListener("transitionend", cb);
      });
      placeDropdown(picker);
    }
  }

  function placeDropdown(picker) {
    var triggerBoundingRect = picker.trigger.getBoundingClientRect();
    Util.toggleClass(
      picker.dropdown,
      "language-picker__dropdown--right",
      window.innerWidth < triggerBoundingRect.left + picker.dropdown.offsetWidth
    );
    Util.toggleClass(
      picker.dropdown,
      "language-picker__dropdown--up",
      window.innerHeight <
        triggerBoundingRect.bottom + picker.dropdown.offsetHeight
    );
  }

  function checkLanguagePickerClick(picker, target) {
    if (!picker.element.contains(target)) toggleLanguagePicker(picker, "false");
  }

  function moveFocusToPickerTrigger(picker) {
    if (picker.trigger.getAttribute("aria-expanded") == "false") return;
    if (
      document.activeElement.closest(".language-picker__dropdown") ==
      picker.dropdown
    )
      picker.trigger.focus();
  }

  function initButtonPicker(picker) {
    var customClasses = picker.element.getAttribute("data-trigger-class")
      ? " " + picker.element.getAttribute("data-trigger-class")
      : "";

    var button =
      '<button class="language-picker__button' +
      customClasses +
      '" aria-label="' +
      picker.select.value +
      " " +
      picker.element.getElementsByTagName("label")[0].textContent +
      '" aria-expanded="false" aria-controls="' +
      picker.pickerId +
      '-dropdown">';
    button =
      button +
      '<span aria-hidden="true" class="language-picker__label language-picker__flag language-picker__flag--' +
      picker.select.value +
      '">' +
      picker.globeSvgPath +
      "<em>" +
      picker.selectedOption +
      "</em>";
    button = button + picker.arrowSvgPath + "</span>";
    return button + "</button>";
  }

  function initListPicker(picker) {
    var list =
      '<div class="language-picker__dropdown" aria-describedby="' +
      picker.pickerId +
      '-description" id="' +
      picker.pickerId +
      '-dropdown">';
    list =
      list +
      '<p class="li4-sr-only" id="' +
      picker.pickerId +
      '-description">' +
      picker.element.getElementsByTagName("label")[0].textContent +
      "</p>";
    list = list + '<ul class="language-picker__list" role="listbox">';
    for (var i = 0; i < picker.options.length; i++) {
      var selected = picker.options[i].selected ? ' aria-selected="true"' : "",
        language = picker.options[i].getAttribute("lang");
      list =
        list +
        '<li><a lang="' +
        language +
        '" hreflang="' +
        language +
        '" href="' +
        getLanguageUrl(picker.options[i]) +
        '"' +
        selected +
        ' role="option" data-value="' +
        picker.options[i].value +
        '" class="language-picker__item language-picker__flag language-picker__flag--' +
        picker.options[i].value +
        '"><span>' +
        picker.options[i].text +
        "</span></a></li>";
    }
    return list;
  }

  function getSelectedOptionText(picker) {
    var label = "";
    if ("selectedIndex" in picker.select) {
      label = picker.options[picker.select.selectedIndex].text;
    } else {
      label = picker.select.querySelector("option[selected]").text;
    }
    return label;
  }

  function getLanguageUrl(option) {
    let url = `./index.html`;
    if (option && option.lang) {
      if (option.lang === "en") {
        console.log(url);
        return url;
      }
      url = `./${option.lang}.html`;
      console.log(url);
      return url;
    } else {
      return null;
    }
  }

  function initLanguageSelection(picker) {
    picker.element
      .getElementsByClassName("language-picker__list")[0]
      .addEventListener("click", function (event) {
        var language = event.target.closest(".language-picker__item");
        if (!language) return;

        if (
          language.hasAttribute("aria-selected") &&
          language.getAttribute("aria-selected") == "true"
        ) {
          event.preventDefault();
          picker.trigger.setAttribute("aria-expanded", "false");
        }
      });
  }

  function keyboardNavigatePicker(picker, direction) {
    var index = Util.getIndexInArray(picker.languages, document.activeElement);
    index = direction == "next" ? index + 1 : index - 1;
    if (index < 0) index = picker.languages.length - 1;
    if (index >= picker.languages.length) index = 0;
    Util.moveFocus(picker.languages[index]);
  }

  var languagePicker = document.getElementsByClassName("js-language-picker");
  if (languagePicker.length > 0) {
    var pickerArray = [];
    for (var i = 0; i < languagePicker.length; i++) {
      (function (i) {
        pickerArray.push(new LanguagePicker(languagePicker[i]));
      })(i);
    }

    window.addEventListener("keyup", function (event) {
      if (
        (event.keyCode && event.keyCode == 27) ||
        (event.key && event.key.toLowerCase() == "escape")
      ) {
        pickerArray.forEach(function (element) {
          moveFocusToPickerTrigger(element);
          toggleLanguagePicker(element, "false");
        });
      }
    });
    window.addEventListener("click", function (event) {
      pickerArray.forEach(function (element) {
        checkLanguagePickerClick(element, event.target);
      });
    });
  }
})();

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showPopup();
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}
