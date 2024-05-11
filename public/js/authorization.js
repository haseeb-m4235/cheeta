function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    // Simple validation, replace with your authentication logic
    if (username === 'demo' && password === 'password') {
        alert('Login successful!');
        
        // Redirect to another page or perform additional actions
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

async function signup(){
    var email = document.getElementById('signupEmail').value;
    var userName = document.getElementById('signupUsername').value;
    var password = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('signupConfirmPassword').value;
    const userData = {
        "userName": userName,
        "email": email,
        "password": password
      };
      try {
        const response = await fetch('/api/customers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
    
        const data = await response.json();
        console.log(data); // Log the response from the server
      } catch (error) {
        console.error('Error:', error);
      }
}

function showSignupForm(){
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "inline-block";
}

function showLoginForm(){
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "inline-block";
}


//Validating Email