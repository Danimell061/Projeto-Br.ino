// Carrossel
let index = 0;
const carousel = document.getElementById("animacao");
const slides = document.querySelectorAll(".slide");
function moveSlide(direction) {
    index += direction;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    carousel.style.transform = `translateX(${-index * 100}%)`;
}
