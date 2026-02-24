document.getElementById("submitBtn").addEventListener("click", login)

function login() {
  const username = document.getElementById("username").value.trim().toLowerCase()
  const password = document.getElementById("password").value.trim()
  const message = document.getElementById("message")

  message.textContent = ""

  if (username === "admin" && password === "1234") {
    message.style.color = "green"
    message.textContent = "Prototype login success (admin)."
    return
  }

  if (username === "student" && password === "1234") {
    message.style.color = "green"
    message.textContent = "Prototype login success (student)."
    return
  }

  message.style.color = "#dc2626"
  message.textContent = "Invalid login or password. Try: admin/1234 or student/1234."
}
