document.getElementById("subscribeButton").addEventListener("click", function() {
    document.getElementById("subscribePopup").style.display = "block";
});

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("subscribePopup").style.display = "none";
});
document.getElementById("subscribeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.querySelector("#subscribeForm input[type='email']").value;
    // You can now handle the email submission here and provide feedback to the user.
    console.log("Email submitted:", email);

    // Optionally, display a success message to the user here.
}); // Add the following code to handle form submission and send email data
document.getElementById("subscribeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("emailInput").value;

    // Send the email to your server
    fetch('/post-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Email sent successfully.');
                // Optionally, display a success message to the user here.
            } else {
                console.error('Failed to send email.');
                // Optionally, display an error message to the user here.
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Optionally, display an error message to the user here.
        });
});

// Other JavaScript code for your website (remaining code remains the same)