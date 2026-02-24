// Author: Evgeniya Taheri 
//This js code send the user to the needed page


document.getElementById("submitBtn").addEventListener("click", login);

function login() {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  message.textContent = "";

  if (username === "admin" && password === "1234") {
    window.location.href = "admin.html";
    return;
  }

  if (username === "student" && password === "1234") {
    window.location.href = "student.html";
    return;
  }

  message.textContent = "Invalid login or password. Try: admin/1234 or student/1234.";
}