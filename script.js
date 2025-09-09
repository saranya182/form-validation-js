// script.js

// ------ Select elements ------
const form = document.getElementById('registerForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');

// Modal elements (advanced)
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

// ------ Helper functions to show error / success ------
function showError(input, message) {
  const control = input.parentElement;           // .form-control
  control.classList.remove('success');
  control.classList.add('error');
  const small = control.querySelector('small');
  small.textContent = message;
}

function showSuccess(input) {
  const control = input.parentElement;
  control.classList.remove('error');
  control.classList.add('success');
  const small = control.querySelector('small');
  small.textContent = '';
}

// ------ Validation functions ------
function isRequired(value) {
  return value !== '';
}

function isEmailValid(emailValue) {
  // Simple, safe email pattern:
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(emailValue);
}

function isLengthEnough(value, min) {
  return value.length >= min;
}

function doPasswordsMatch(pass, confirm) {
  return pass === confirm;
}

// ------ Main form submit handler ------
form.addEventListener('submit', function (e) {
  e.preventDefault(); // stop default form submission so we can validate

  // Trim values
  const usernameVal = username.value.trim();
  const emailVal = email.value.trim();
  const passwordVal = password.value;
  const confirmVal = confirmPassword.value;

  // Track validity of the whole form
  let isFormValid = true;

  // Required checks
  if (!isRequired(usernameVal)) {
    showError(username, 'Username is required');
    isFormValid = false;
  } else {
    showSuccess(username);
  }

  if (!isRequired(emailVal)) {
    showError(email, 'Email is required');
    isFormValid = false;
  } else if (!isEmailValid(emailVal)) {
    showError(email, 'Email is not valid');
    isFormValid = false;
  } else {
    showSuccess(email);
  }

  if (!isRequired(passwordVal)) {
    showError(password, 'Password is required');
    isFormValid = false;
  } else if (!isLengthEnough(passwordVal, 6)) {
    showError(password, 'Password must be at least 6 characters');
    isFormValid = false;
  } else {
    showSuccess(password);
  }

  // Confirm password (advanced)
  if (!isRequired(confirmVal)) {
    showError(confirmPassword, 'Please confirm your password');
    isFormValid = false;
  } else if (!doPasswordsMatch(passwordVal, confirmVal)) {
    showError(confirmPassword, 'Passwords do not match');
    isFormValid = false;
  } else {
    showSuccess(confirmPassword);
  }

  // All checks passed
  if (isFormValid) {
    // Show an inline success message
    successMessage.style.display = 'block';
    successMessage.textContent = 'Registration successful!';

    // Optionally show a modal popup (advanced)
    successModal.classList.add('visible');

    // Reset the form after success if you like:
    // form.reset();
    // Remove success styles after reset (optional)
  } else {
    successMessage.style.display = 'none';
    successMessage.textContent = '';
  }
});

// Close modal button
closeModal.addEventListener('click', function() {
  successModal.classList.remove('visible');
});

// ------ Real-time validation (as the user types) ------
email.addEventListener('input', function () {
  const value = email.value.trim();
  if (value === '') {
    // clear
    email.parentElement.classList.remove('error', 'success');
    email.parentElement.querySelector('small').textContent = '';
    return;
  }
  if (isEmailValid(value)) {
    showSuccess(email);
  } else {
    showError(email, 'Email is not valid');
  }
});

password.addEventListener('input', function () {
  const value = password.value;
  if (value === '') {
    password.parentElement.classList.remove('error', 'success');
    password.parentElement.querySelector('small').textContent = '';
    return;
  }
  if (isLengthEnough(value, 6)) {
    showSuccess(password);
  } else {
    showError(password, 'Password must be at least 6 characters');
  }
});

// Optional: username live check (non-empty)
username.addEventListener('input', function () {
  const value = username.value.trim();
  if (value === '') {
    username.parentElement.classList.remove('error', 'success');
    username.parentElement.querySelector('small').textContent = '';
  } else {
    showSuccess(username);
  }
});
