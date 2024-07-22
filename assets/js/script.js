  
  //Animation
  document.addEventListener("DOMContentLoaded", function () {
  const allSectionsFader = document.querySelectorAll(".fade-in");
  console.log("Elements found:", allSectionsFader.length);

  if (allSectionsFader.length === 0) {
    console.log("No elements with class 'fade-in' found.");
    return;
  }

  const appearOptions = {
    threshold: 0.5,
  };

  // IntersectionObserver for hero & elements
  const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("show");
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  // Observe all fade-in elements
  allSectionsFader.forEach(section => {
    appearOnScroll.observe(section);
  });


  
  // Carousel Our Gallery
  const carousel = document.querySelector(".carousel");
  const firstImg = carousel.querySelectorAll("img")[0];
  const arrowIcons = document.querySelectorAll(".wrapper i");

  let isDragStart = false,
      prevPageX,
      prevScrollLeft;
  let firstImgWidth = firstImg.clientWidth + 14; //getting first img width and adding 14 margin value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //geting max scrollable width

  //untuk kalau geser ke kanan icon kiri hilang
  const showHideIcons = () => {
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
  };

  arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60); //calling showhide icons after 60ms
    });
  });

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
  };

  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("mouseup", dragStop);
});


