const menu = [
  { href: "./signin.html", text: "Main page" },
  { href: "#", text: "HELP" },
  { href: "#", text: "ABOUT" },
  { href: "#", text: "CONTACT" },
]

let links = ""
const currentPage = window.location.pathname.split("/").pop()

for (let i = 0; i < menu.length; i++) {
  const activeClass = menu[i].href.endsWith(currentPage) ? "active" : ""
  links += `<li><a href="${menu[i].href}" class="${activeClass}">${menu[i].text}</a></li>`
}

document.getElementById("menubar").innerHTML = links
