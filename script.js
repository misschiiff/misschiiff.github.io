// defer attribute Added to this script in the end of the body or in the head section 

window.addEventListener("load", function() {
    var slides = document.querySelectorAll(".slide");
    var indicators = document.querySelectorAll(".indicator");
    var currentSlide = 0;

    // Function to show the current slide
    function showSlide(index) {
        // Hide all slides
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Remove active class from all indicators
        for (var i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove("active");
        }

        // Show the current slide and set its indicator as active
        slides[index].style.display = "block";
        indicators[index].classList.add("active");
    }

    // Function to handle automatic slide rotation
    function autoRotateSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    // Show the first slide
    showSlide(currentSlide);


});
const modeSwitch = document.getElementById('mode-switch');

modeSwitch.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide() {


        // Show the current slide
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide();
    }

    // Show the first slide
    showSlide();

    // Automatically rotate slides every 3 seconds (adjust as needed)
    setInterval(nextSlide, 3000);
});



$(document).ready(function() {
    const itemWidth = $(".product-grid").outerWidth();
    const itemCount = $(".product-grid .card").length;
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    $(".next-button").on("click", function() {
        currentIndex = (currentIndex + 1) % itemCount;
        const offset = currentIndex * itemWidth;
        $(".product-grid").css("transform", `translateX(-${offset}px)`);
    });

    $(".prev-button").on("click", function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        const offset = currentIndex * itemWidth;
        $(".product-grid").css("transform", `translateX(-${offset}px)`);
    });

    $(".product-grid").on("touchmove", function(e) {
        touchEndX = e.touches[0].clientX;
    });

    $(".product-grid").on("touchend", function() {
        if (touchEndX < touchStartX) {
            // Swiped left, move to the next card
            currentIndex = (currentIndex + 1) % itemCount;
        } else if (touchEndX > touchStartX) {
            // Swiped right, move to the previous card
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        }
        const offset = currentIndex * itemWidth;
        $(".product-grid").css("transform", `translateX(-${offset}px)`);
    });
});