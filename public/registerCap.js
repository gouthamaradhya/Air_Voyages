document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally
        
        // Get form data
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Create an object to hold the data
        const formData = {
            username: username,
            password: password
        };
        
        // Send the form data to the server
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the server response (e.g., show a success message)
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
