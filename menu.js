//Author Evgeniya Taheri
//This js page is for navbar
var menu = [
    { href: "index.html", text: "Main page" },
    { href: "help.html", text: "HELP" },
    { href: "about.html", text: "ABOUT" },
    { href: "contact.html", text: "CONTACT" }
  ];
  
  var links = "";
  var currentPage = window.location.pathname.split("/").pop();
  
  for (var i = 0; i < menu.length; i++) {
    var activeClass = menu[i].href === currentPage ? "active" : "";
    links += `<li><a href="${menu[i].href}" class="${activeClass}">${menu[i].text}</a></li>`;
  }
  
  document.getElementById("menubar").innerHTML = links;
  