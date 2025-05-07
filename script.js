// Toggle between login and signup forms
function toggleForm(formType) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
  
    if (formType === 'login') {
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
    } else {
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
    }
  }
  
  // Password visibility toggle functionality
  function togglePassword(formType) {
    let passwordField;
    let toggleText;
  
    if (formType === 'login') {
      passwordField = document.getElementById('login-password');
      toggleText = document.getElementById('login-toggle');
    } else {
      passwordField = document.getElementById('signup-password');
      toggleText = document.getElementById('signup-toggle');
    }
  
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleText.textContent = 'Hide';
    } else {
      passwordField.type = 'password';
      toggleText.textContent = 'Show';
    }
  }
  
  // Form validation for login
  function validateLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    if (!email || !password) {
      alert('Please fill in all fields.');
      return false;
    }
    // Additional validation can be added here (e.g., email format)
    return true;
  }
  
  // Form validation for signup
  function validateSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return false;
    }
    // Additional validation can be added here (e.g., email format, password strength)
    return true;
  }
  // Submit login data
async function submitLoginData(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    const result = await response.json();
  
    if (result.success) {
      alert('Login successful!');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  }
  
  // Submit signup data
  async function submitSignupData(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
  
    const result = await response.json();
  
    if (result.success) {
      alert('Account created successfully! You can now log in.');
      toggleForm('login');  // Switch to login form
    } else {
      alert('Account creation failed. Try again later.');
    }
  }
  
  // Attach submit functions to forms
  document.getElementById('login').addEventListener('submit', submitLoginData);
  document.getElementById('signup').addEventListener('submit', submitSignupData);
  