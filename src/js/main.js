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

const toBuyList = document.querySelector('.to-buy__list--js');

let key = 'shopping list';
let shoppingList = [];

// Checking is there any key in local storage
if (localStorage.getItem(key)) {
  
  let local = localStorage.getItem(key);
  shoppingList = JSON.parse(local);

} else {
  
  let local = JSON.stringify(shoppingList);
  localStorage.setItem(key, local);

}

handleList ();


// Adding element to array
function addArrayElement (input) {
  shoppingList.push(input)

  let local = JSON.stringify(shoppingList);
  localStorage.setItem(key, local);

  handleList();
}


// Removing element from array
function removeArrayElement (element) {
  shoppingList.splice(shoppingList.indexOf(element), 1);

  let local = JSON.stringify(shoppingList);
  localStorage.setItem(key, local);

  handleList();
}

// Removing all elements from array
function removeAllArrayElements() {
  shoppingList = [];

  let local = JSON.stringify(shoppingList);
  localStorage.setItem(key, local);

  handleList();
}


// Creating list elements on page from local storage data
function handleList () {

  toBuyList.innerHTML = '';

  shoppingList.forEach( element => {

    toBuyList.innerHTML += `
    <li class="to-buy__list--item list-element">
      <span class="list-element__name">${element}</span>  
      <a class="list-element__delete" href="#">X</a> 
    </li>
    `;

  })
 
}

//Function hidding delete-all-button when there is no any elements in list
function handleVisibleDeleteAllButton() {

  let listElements = document.querySelectorAll('.to-buy__list--item').length;
  let btnBackground = document.querySelector('.delete-all');

  if (listElements < 1) {
    deleteBtn.style.display = 'none';
    btnBackground.style.display = 'none';

  } else {
    deleteBtn.style.display = 'inline-block'
    btnBackground.style.display = 'flex';
  }

};


// List manipulations
toBuyList.addEventListener("click", e => {
  
  //Crossing and uncrossing name of list element
  if (e.target.className.includes('list-element__name')) {
    e.target.classList.toggle('line-through');
  } 
  else if (e.target.className.includes('to-buy__list--item')) {
    e.target.firstElementChild.classList.toggle('line-through');
  }

  
  // Removing list element
  else if(e.target.className === 'list-element__delete') {
    removeArrayElement(e.target.previousElementSibling.textContent)
  }

  handleVisibleDeleteAllButton();

});


// Adding element to list
const addForm = document.querySelector('.add-element');

addForm.addEventListener('submit', e => {

  e.preventDefault();

  const input = document.querySelector('.add-element__text-input--input');


  //Input value can't be empty string
  if (input.value !== '') {

    addArrayElement(input.value);

    input.value = '';

  }

  handleVisibleDeleteAllButton();

});


//Pop-up opening
const popUp = document.querySelector('.pop-up');
const deleteBtn = document.querySelector('.delete-all__button');

deleteBtn.addEventListener('click', e => {
  popUp.style.display = 'block';
});


//Closing pop-up and removing all list elements
popUp.addEventListener('click', e => {

  if(e.target.className === 'pop-up' || e.target.className === 'pop-up__window--link-save') {
    popUp.style.display = 'none';
  } 
  else if (e.target.className === 'pop-up__window--link-delete') {
    popUp.style.display = 'none';
    removeAllArrayElements();
  };

  handleVisibleDeleteAllButton();

});