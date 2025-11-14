const form = document.getElementById("registrationForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
//Each form part selected

//Checks DOM for if the username has been stored already.
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("savedUsername");
  if (saved) username.value = saved;
});

function validateUsername() {
  if (username.validity.valueMissing) {
    usernameError.textContent = "Username required.";
  } else if (username.value.trim().length < 4) {
    usernameError.textContent = "Username Must be over 4 characters";
  } else {
    usernameError.textContent = "";
  }
}

function validateEmail() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Need an email to validate you";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Should be valid email address";
  } else {
    emailError.textContent = "";
  }
}

function validatePassword() {
  const value = password.value;
  //Utilized Regex patterns to test values on input for each password constraint.
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);

  if (password.validity.valueMissing) {
    passwordError.textContent = "Password is required.";
  } else if (value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
  } else if (!hasUpper || !hasLower || !hasNumber) {
    passwordError.textContent =
      "Password needs uppercase, lowercase, and a number.";
  } else {
    passwordError.textContent = "";
  }
}

//Validates if passwords match
function validateConfirmPassword() {
  if (confirmPassword.validity.valueMissing) {
    confirmPasswordError.textContent = "Please confirm your password.";
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
  } else {
    confirmPasswordError.textContent = "";
  }
}

//Event listeners for when each of these elements
username.addEventListener("input", validateUsername);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

//Gives js full control oversubmission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // final validation check
  validateUsername();
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  //Boolean to assess if all verifications pass.
  const isValid =
    usernameError.textContent === "" &&
    emailError.textContent === "" &&
    passwordError.textContent === "" &&
    confirmPasswordError.textContent === "";

  if (isValid) {
    // Save username
    localStorage.setItem("savedUsername", username.value);

    alert("Registration successful!");
    form.reset();
    return;
  }

  // Focus Logic for errors, helps user experience with form.
  if (usernameError.textContent) {
    username.focus();
  } else if (emailError.textContent) {
    email.focus();
  } else if (passwordError.textContent) {
    password.focus();
  } else if (confirmPasswordError.textContent) {
    confirmPassword.focus();
  }
});
