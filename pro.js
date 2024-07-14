"use strict";
const body = document.querySelector("body");
const menubtn = document.querySelector(".menu");
const menusec = document.querySelector(".separator2");
const atmosec = document.querySelector(".separator3");
const about = document.querySelector(".about");
const navbarpop = document.querySelector(".menu-section");
const nav_btns = document.querySelector(".navbuttons");
const imgss = document.querySelectorAll(".imgss");
const img1 = document.querySelector(".img-1");
const img2 = document.querySelector(".img-2");
const img3 = document.querySelector(".img-3");
const imgborder = document.querySelector(".imgbox");
const atmobtn = document.querySelector(".atmo");
const contact_btn = document.querySelector(".contact-btn");
const contact_window = document.querySelector(".contact-window");
const x = document.querySelector(".x");
const blur1 = document.querySelector(".bluri");
const locsec = document.querySelector(".separator6");
const locbtn = document.querySelector(".loc");

const scrollTo = function (sec, event) {
  event.preventDefault(); // Prevent default action (e.g., following a link)
  sec.scrollIntoView({ behavior: "smooth" });
};

// Add event listener to button with bind

const navbar = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      nav_btns.style.position = "fixed"; // Correctly set display property

      nav_btns.style.top = "-40px";

      nav_btns.style.right = "1px";
      nav_btns.style.backgroundColor = "rgb(59, 59, 59,0.4)";
    }
  });
};
const observer = new IntersectionObserver(navbar, {
  root: null,
  threshold: 0,
});
observer.observe(navbarpop);

const fadeout1 = function (e) {
  if (e.target.classList.contains("imgss")) {
    imgss.forEach((img) => {
      if (e.target !== img) {
        img.classList.add("deactive");
        img.classList.remove("active");
        e.target.classList.remove("deactive");
        e.target.classList.add("active");
        imgborder.src = e.target.src;
      }
    });
  }
};
const windoscroll = function () {
  if (window.scrollY <= 172) {
    // Adjust this threshold as needed
    console.log("Scrolled to position 172 or beyond");
    nav_btns.style.position = "relative"; // Adjust position as needed
    nav_btns.style.backgroundColor = "rgb(0, 0, 0)"; // Adjust background color
    nav_btns.style.top = "120px";
  }
};
// const showmodel = function () {
//   contact_window.style.display = "flex";
//   x.style.display = "flex";
//   // blur1.style.filter = "blur(2px)";
// };
const closemodel = function () {
  contact_window.style.display = "none";
  x.style.display = "none";
};
locbtn.addEventListener("click", scrollTo.bind(null, locsec));
menubtn.addEventListener("click", scrollTo.bind(null, menusec));
atmobtn.addEventListener("click", scrollTo.bind(null, atmosec));
window.addEventListener("scroll", windoscroll);
window.addEventListener("click", fadeout1);
x.addEventListener("click", function () {
  contact_window.style.display = "flex";
  x.style.display = "flex";
  // blur1.style.filter = "blur(2px)";
});
// Initialize the map and set its view

navigator.geolocation.getCurrentPosition(
  function (pos) {
    console.log(pos);
    const { latitude, longitude } = pos.coords;
    mapty(latitude, longitude);
  },
  function () {
    alert("couldnt get your position");
  }
);
const mapty = function (lat, lng) {
  console.log(lat, lng);
  var map = L.map("map").setView([lat, lng], 17);

  // Add a tile layer to the map (this is the base map layer)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add a marker to the map at the same location
  var marker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        autoClose: false,
        closeOnClick: false,
        className: "popup",
      })
    )
    .setPopupContent(`come visit us`)
    .openPopup();
};
contact_btn.addEventListener("click", showmodel);
