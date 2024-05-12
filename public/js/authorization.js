const nodemailer = require("nodemailer");
require('dotenv').config()

function showSignupForm(){
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "inline-block";
}

function showLoginForm(){
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "inline-block";
}

//...........................Login..........................

async function validateLogin() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var message = document.getElementById("password-incorrect-message");
  try {
    const response = await fetch('/api/customers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    // Check if username and password match
    const match = data.find(user => user.userName === username && user.password === password);

    if (match) {
      message.innerText = "Password is correct.";
      message.style.color = "green";
    } else {
      message.innerText = "User name and password do not match.";
      message.style.color = "red";
    }
  } catch (error) {
    console.error('Error:', error.message);
    // Handle error
  }
}


//...........................SignUp..........................

//checking password strength
function checkPasswordStrength(password) {
  var message = document.getElementById("password-strength-message");

  // Minimum length requirement
  var minLength = 8;

  // Regular expressions to check for various criteria
  var hasLowerCase = /[a-z]/.test(password);
  var hasUpperCase = /[A-Z]/.test(password);
  var hasNumbers = /\d/.test(password);
  var hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check if the password meets all criteria
  var isStrong = password.length >= minLength && hasLowerCase && hasUpperCase && hasNumbers && hasSpecialChars;

  // Display message based on strength
  if (isStrong) {
      message.innerText = "Password is strong.";
      message.style.color = "green";
      return true;
  } else {
      message.innerText = "Password is not strong. Please make sure it is at least 8 characters long and includes lowercase and uppercase letters, numbers, and special characters.";
      message.style.color = "red";
      return false;
  }
}

//Validating Email
// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"cheeta" ' + process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: "Cheeta Verification Code", // Subject line
    text: "Your verification code is: " + randomNum, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

function verify_email(){
  const randomNum = Math.random() * 9000
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  main().catch(console.error);
}

async function signup(){
    var email = document.getElementById('signupEmail').value;
    var userName = document.getElementById('signupUsername').value;
    var password = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('signupConfirmPassword').value;
    var message = document.getElementById("password-strength-message");
    console.log(password)
    console.log(confirmPassword)


    //Check if userName already exists
    try {
      const response = await fetch('/api/customers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Check if username and password match
      const match = data.find(user => user.userName === userName);
      if (match) {
        message.innerText = "User Name already exists";
        message.style.color = "red";
        return;
      }
    } catch (error) {
      console.error('Error:', error.message);
    }


    if (password!=confirmPassword){
      window.alert("Passwords don't match.")
      return;
    }
    if (!checkPasswordStrength(password)){
      return;
    }
    

    // verify_email();
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
    alert('Your account has been successfully create!');
    showLoginForm()
}

