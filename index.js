/*$("toggle-bars").click(function() {
$("navMenu").toggleClass("show");
}); */

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Fetch data from Medium API
const apiKey = '2b4ae8ba06ff2502a38f4e1b3f5a2fa5353c34eafb53fafa751eea0973a16b67a';
const articleId = 'c745bc5146f0';
const apiUrl = `https://api.medium.com/v1/posts/${articleId}`;
const headers = {
    'Authorization': `Bearer ${apiKey}`
};

fetch(apiUrl, { headers })
    .then(response => response.json())
    .then(data => {

        // Manipulate data and create widget
        const widget = document.createElement('div');
        widget.className = 'medium-widget';
        widget.innerHTML = `
   <h2>${data.title}</h2>
   <p>${data.content}</p>
   <p>By ${data.author.name}</p>
 `;

        // Insert widget into DOM
        const targetElement = document.getElementById('medium-widget');
        targetElement.appendChild(widget);
    })
    .catch(error => console.error('Error fetching data:', error));

// Services page functions

var animateHTML = function() {
    var elems;
    var windowHeight;

    function init() {
        elems = document.querySelectorAll('.hidden-grid');
        windowHeight = window.innerHeight;
        addEventHandlers();
        checkPosition();
    }

    function addEventHandlers() {
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', init);
    }

    function checkPosition() {
        for (var i = 0; i < elems.length; i++) {
            var positionFromTop = elems[i].getBoundingClientRect().top;
            if (positionFromTop - windowHeight <= 0) {
                elems[i].className = elems[i].className.replace(
                    'hidden-grid',
                    'fade-in-element'
                );
            }
        }
    }
    return {
        init: init
    };
};
animateHTML().init();