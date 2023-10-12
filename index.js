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

// Show the notification box with fade-in animation
const notificationBox = document.getElementById('notificationBox');
notificationBox.classList.add('fade-in');



// Function to generate a unique code
function generateUniqueCode() {
    // Generate a random number or use any logic to create your unique code
    const uniqueCode = Math.floor(Math.random() * 10000);

    // Display the unique code in the notification box
    const codeDisplay = document.getElementById('codeDisplay');
    codeDisplay.textContent = `Generated Code: ${uniqueCode}`;

    // Show the notification box
    const notificationBox = document.getElementById('notificationBox');
    notificationBox.style.display = 'block';

    // Add click event listener to copy button
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', function() {
        // Copy the code to the clipboard
        const textArea = document.createElement('textarea');
        textArea.value = uniqueCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Provide feedback to the user
        copyButton.textContent = 'Code Copied!';

        // Fade out the notification box after a delay
        setTimeout(function() {
            notificationBox.style.opacity = '0';
            setTimeout(function() {
                notificationBox.style.display = 'none';
            }, 500); // 500ms delay before hiding the box
        }, 2000); // 2000ms (2 seconds) delay before fading out
    });
}

// Attach a click event listener to the button
const generateCodeButton = document.getElementById('generateCodeButton');
generateCodeButton.addEventListener('click', generateUniqueCode);


// Create an AudioContext
const audioContext = new(window.AudioContext || window.webkitAudioContext)();

// Create an audio element
const audioElement = document.getElementById('myAudio');

// Create a GainNode for volume control
const volumeNode = audioContext.createGain();
volumeNode.gain.value = 0.5; // Set volume to 50%

// Connect the audio element to the GainNode
const sourceNode = audioContext.createMediaElementSource(audioElement);
sourceNode.connect(volumeNode);

// Connect the GainNode to the destination (speakers)
volumeNode.connect(audioContext.destination);

// Play the audio
audioElement.play();