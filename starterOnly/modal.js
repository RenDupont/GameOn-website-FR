function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close");
//const formModal = document.querySelector(".formModal");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal event
modalClose.addEventListener("click", closeModal);

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//submit modal form
function submitModal(event) {
  const modalBtnSubmit = document.querySelector(".btn-submit");
  event.preventDefault();
  //if form valid
  if(validateForm()) {
    hideForm();
    thankMessage();
    //if click second time close modal and reload
    modalBtnSubmit.removeEventListener('click', submitModal);
    modalBtnSubmit.addEventListener('click', function() {
      closeModal();
      location.reload();
    });
  }
}

//hide form
function hideForm() {
  const formData = document.querySelectorAll(".formData");
  for (let i = 0 ; i < formData.length; i++) {
    formData[i].style.display = "none";
  }
}

//thank message
function thankMessage() {
  let thanks = document.querySelector(".validMessage");
  thanks.style.display = "flex";
}

//check if form valide
function validateForm() {
  //get DOM element
  const formInputs = document.querySelectorAll(".formData input");
  const InputTermOfUse = document.getElementById("checkbox1");
  //console.log(formInputs);

  let isValid = true;

  //check if each input are correct except radio type input
  formInputs.forEach((input) => {
    switch (input.type) {
      //first name and last name
      case 'text':
        isValid = checkFirstAndLast(input);
        //console.log(isValid, "here");
        break;
      //email
      case 'email':
        isValid = checkEmail(input);
        break;
      //date of birth
      case 'date':
        isValid = checkBirthDate(input);
        break;
      //how many GameON event did you participeted
      case 'number':
        isValid = checkNumberEventparticipated(input);
        break;
      // term of use agreament checked
      case 'checkbox':
        if (input === InputTermOfUse) {
          isValid = checkTermOfUse(input); 
        }
        break;
    }
  });

  //now check radio type input
  //isValid = checkRadio();

  console.log(isValid);
  return isValid;
}

/**
 * check if first name and last name is ok
 * and visually indicate if incorrect
 * @param {string} input 
 * @returns bool
 */
function checkFirstAndLast(input) {
  const textRegex = /^[a-zA-Z]{2}\s?\S+/;
  let isValid = true;
  if (input.value.trim().length < 2 && !textRegex.test(input.value)) {
    isValid = false;
    input.style.borderColor = "red";
    input.style.borderWidth = "3.5px";
  }
  else {
    input.style.borderColor = "#ccc";
    input.style.borderWidth = "0.8px";
  }
  return isValid;
}

/**
 * check if email is ok
 * and visually indicate if incorrect
 * @param {mail} input 
 * @returns bool
 */
function checkEmail(input) {
  const emailRegex = /^[a-zA-Z][\w.-]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  let isValid = true;
  if (!emailRegex.test(input.value)) {
    isValid = false;
    input.style.borderColor = "red";
    input.style.borderWidth = "3.5px";
  }
  else {
    input.style.borderColor = "#ccc";
    input.style.borderWidth = "0.8px";
  }
  return isValid;
}

/**
 * check if date of birth is ok
 * and visually indicate if incorrect
 * @param {date} input 
 * @returns bool
 */
function checkBirthDate(input) {
  let isValid = true;
  if (input.value === '') {
    isValid = false;
    input.style.borderColor = "red";
    input.style.borderWidth = "3.5px";
  }
  else {
    input.style.borderColor = "#ccc";
    input.style.borderWidth = "0.8px";
  }
  return isValid;
}

/**
 * check if number of event participated is ok
 * and visually indicate if incorrect
 * @param {int} input 
 * @returns bool
 */
function checkNumberEventparticipated(input) {
  let isValid = true;
  if (input.value === '' || isNaN(input.value)) {
    isValid = false;
    input.style.borderColor = "red";
    input.style.borderWidth = "3.5px";
  }
  else {
    input.style.borderColor = "#ccc";
    input.style.borderWidth = "0.8px";
  }
  return isValid;
}

/**
 * check if term of use is checked
 * and visually indicate if incorrect
 * @param {*} input 
 * @returns bool
 */
function checkTermOfUse(input) {
  let isValid = true;
  let termOfUse = document.getElementById("termOfUse");
  if (!input.checked) {
    isValid = false;
    termOfUse.style.borderColor = "red";
    termOfUse.style.borderWidth = "3.5px";
    termOfUse.style.borderStyle = "solid";
  }
  else {
    termOfUse.style.borderStyle = "none";
  }
  return isValid;
}

function checkRadio() {
  let radioBox = document.getElementById("radio-box");
  const listRadio = document.querySelectorAll("checkbox-input");
  let isValid = true;
  listRadio.forEach((input) => {
    if (input.checked) {
      radioBox.style.borderStyle = "none";
      console.log('here1');
      return isValid;
    }
    else {
      isValid = false;
      console.log('here2');
      radioBox.style.borderColor = "red";
      radioBox.style.borderStyle = "solid";
      radioBox.style.style.borderWidth = "3.5px";
    }
  });
  return isValid;
}