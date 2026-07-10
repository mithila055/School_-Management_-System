const signupForm = document.getElementById('signupForm');
const message = document.getElementById('message');

signupForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Basic validation
  if (!username || !email || !password) {
    message.textContent = "⚠️ All fields are required!";
    message.style.color = "orange";
    return;
  }

  // Email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    message.textContent = "❌ Please enter a valid email address!";
    message.style.color = "red";
    return;
  }

  // Password strength check
  if (password.length < 5) {
    message.textContent = "⚠️ Password must be at least 5 characters!";
    message.style.color = "orange";
    return;
  }

  // Save user to localStorage
  const user = { username, email, password };
  localStorage.setItem("userData", JSON.stringify(user));

  message.textContent = "✅ Signup Successful! Redirecting to login...";
  message.style.color = "#00ff00";

  // Redirect after delay
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
