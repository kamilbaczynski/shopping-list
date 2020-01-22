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


// List manipulations
const toBuyList = document.querySelector('.to-buy__list--js');

toBuyList.addEventListener("click", e => {

  //Crossing and uncrossing name of list element
  if (e.target.className.includes('list-position__name')) {
    e.target.classList.toggle('line-through');
  }
  // Removing list element
  else if(e.target.className = 'delete') {
    e.target.parentElement.remove()
  }

});

// Adding element to list
const addForm = document.querySelector('.add-element');

addForm.addEventListener('submit', e => {

  e.preventDefault();

  const input = document.querySelector('.add-element__text-input--input');

  toBuyList.innerHTML += `
    <li class="to-buy__list--item list-position">
      <span class="list-position__name">${input.value}</span>  
      <a class="list-position__delete" href="#">x</a> 
    </li>
  `;

  input.value = '';
  
});
