// client-side code (login.mjs)
async function handleLogin() {
    const username = document.getElementById('email').value; // Assuming your server uses 'username'
    const password = document.getElementById('password').value;
  
    // Create a request object with the user's credentials
    const formData = {
      username: username, // Update to 'username'
      password: password,
    };
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Login successful
        const data = await response.json();
        if (data.success) {
          console.log('Login successful');
          window.location.href = '/index.html'; 
          // Redirect or perform other actions as needed
        } else {
          console.log('Login failed');
          window.location.href = '/index.html'; 
          // Display an error message to the user or handle it as needed
        }
      } else {
        console.error('Failed to log in:', response.status, response.statusText);
        // Handle server error or other issues
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network error or other issues
    }
  }
  
document.getElementById('loginButton').addEventListener('click', handleLogin);
  