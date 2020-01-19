"use strict";

// service worker registration - remove if you're not going to use it

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("serviceworker.js").then(
      function(registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

// place your code below

//Crossing and uncrossing list positions
const toBuyList = document.querySelector('.to-buy__list--js');

toBuyList.addEventListener("click", e => {
  if (e.target.className.includes('list-position__name')) {
    e.target.classList.toggle('line-through');
  }
});
