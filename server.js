import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve your static files (HTML, CSS, JavaScript, etc.)
app.use(express.static('public'));

app.post('/post-email', (req, res) => {
    const { email } = req.body;

    // Define the URL where you want to post the email data
    const destinationURL = 'https://t.me/+mv9Q6J6CL04NGZk'; // Replace with the actual URL

    // Forward the email to the specified URL
    fetch(destinationURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Email forwarded successfully.');
                res.sendStatus(200); // Send a success status back to the client
            } else {
                console.error('Failed to forward email.');
                res.sendStatus(500); // Send an error status back to the client
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.sendStatus(500); // Send an error status back to the client
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});