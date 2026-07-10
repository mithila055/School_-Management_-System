const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const storedUser = JSON.parse(localStorage.getItem("userData"));

  if (storedUser && username === storedUser.username && password === storedUser.password) {
    message.textContent = "✅ Login successful! Redirecting...";
    message.style.color = "#0f0";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    message.textContent = "❌ Invalid username or password!";
    message.style.color = "red";
  }
});
