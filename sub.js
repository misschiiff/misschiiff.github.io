document.getElementById("subscribeButton").addEventListener("click", function() {
    document.getElementById("subscribePopup").style.display = "block";
});

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("subscribePopup").style.display = "none";
});


document.getElementById("subscribeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("emailInput").value;

    // Define the URL where you want to post the email data
    const postURL = "https://t.me/+mv9Q6J6CL04NGZk";

    // Create a data object with the email
    const data = {
        email: email
    };

    // Display a "Submitting..." message while the request is in progress
    document.getElementById("subscribeResponse").innerHTML = "Submitting...";

    fetch(postURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(() => {
            // Handle the submission success
            document.getElementById("subscribeResponse").innerHTML = "Subscription successful!";
        })
        .catch(error => {
            // Handle any errors or failed requests
            document.getElementById("subscribeResponse").innerHTML = "Subscription failed. Please try again.";
            console.error('An error occurred:', error);
        });
});