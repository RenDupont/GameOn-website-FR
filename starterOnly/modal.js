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
const modalForm = document.querySelector(".formModal");

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

//submit modal event
modalForm.addEventListener("submit", submitModal);

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

/**
 * check if each input are correct
 * @returns bool
 */
function validateForm() {
  //get DOM element
  const formInputs = document.querySelectorAll(".formData input");
  const InputTermOfUse = document.getElementById("checkbox1");

  let isValid = true;

  //check if each input are correct except radio type input
  formInputs.forEach((input) => {
    switch (input.type) {
      //first name and last name
      case 'text':
        isValid = checkFirstAndLast(input, isValid);
      break;
      //email
      case 'email':
        isValid = checkEmail(input, isValid);
      break;
      //date of birth
      case 'date':
        isValid = checkBirthDate(input, isValid);
      break;
      //how many GameON event did you participeted
      case 'number':
        isValid = checkNumberEventparticipated(input, isValid);
      break;
      // term of use agreament checked
      case 'checkbox':
        if (input === InputTermOfUse) {
          isValid = checkTermOfUse(input, isValid);
        }
      break;
    }
  });

  //now check radio type input
  isValid = checkRadio(isValid);

  return isValid;
}

/**
 * check if first name and last name is ok
 * and visually indicate if incorrect
 * @param {string} input 
 * @param {bool} isValid 
 * @returns bool
 */
function checkFirstAndLast(input, isValid) {
  const textRegex = /^[a-zA-Z]{2}\s?\S+/;
  let firstNameError = document.getElementById("firstName-error");
  let lastNameError = document.getElementById("lastName-error");
  if (input.value.trim().length < 2 && !textRegex.test(input.value)) {
    isValid = false;
    input.style.borderColor = "red";
    input.style.borderWidth = "3.5px";
    if (input.id == "first") {
      firstNameError.style.display = "inline-block";
    }
    else if (input.id == "last") {
      lastNameError.style.display = "inline-block";
    }
  }
  else {
    input.style.borderColor = "#ccc";
    input.style.borderWidth = "0.8px";
    if (input.id == "first") {
      firstNameError.style.display = "none";
    }
    else if (input.id == "last") {
      lastNameError.style.display = "none";
    }
  }
  return isValid;
}

/**
 * check if email is ok
 * and visually indicate if incorrect
 * @param {string} input 
 * @param {bool} isValid 
 * @returns bool
 */
function checkEmail(input, isValid) {
  const emailRegex = /^[a-zA-Z][\w.-]*@[a-zA-Z0-9]+\.[a-zA-Z]{2}$/;
  let emailError = document.getElementById("email-error");
  if (!emailRegex.test(input.value)) {
    isValid = false;
    input.style.borderColor = "red";
    input.style.borderWidth = "3.5px";
    emailError.style.display = "inline-block";
  }
  else {
    input.style.borderColor = "#ccc";
    input.style.borderWidth = "0.8px";
    emailError.style.display = "none";
  }
  return isValid;
}

/**
 * check if date of birth is ok
 * and visually indicate if incorrect
 * @param {string} input 
 * @param {bool} isValid 
 * @returns bool
 */
function checkBirthDate(input, isValid) {
  let dateOfBirthError = document.getElementById("dateOfBirth-error");
  if (input.value === '') {
    isValid = false;
    input.style.borderColor = "red";
    input.style.borderWidth = "3.5px";
    dateOfBirthError.style.display = "inline-block";
  }
  else {
    input.style.borderColor = "#ccc";
    input.style.borderWidth = "0.8px";
    dateOfBirthError.style.display = "none";
  }
  return isValid;
}

/**
 * check if number of event participated is ok
 * and visually indicate if incorrect
 * @param {int} input 
 * @param {bool} isValid 
 * @returns bool
 */
function checkNumberEventparticipated(input, isValid) {
  let numberEventError = document.getElementById("numberOfEvent-error");
  if (input.value === '' || isNaN(input.value)) {
    isValid = false;
    input.style.borderColor = "red";
    input.style.borderWidth = "3.5px";
    numberEventError.style.display = "inline-block";
  }
  else {
    input.style.borderColor = "#ccc";
    input.style.borderWidth = "0.8px";
    numberEventError.style.display = "none";
  }
  return isValid;
}

/**
 * check if term of use is checked
 * and visually indicate if incorrect
 * @param {object} input 
 * @param {bool} isValid 
 * @returns bool
 */
function checkTermOfUse(input, isValid) {
  let termOfUse = document.getElementById("termOfUse");
  let termOfUseError = document.getElementById("termOfUse-error");
  if (!input.checked) {
    isValid = false;
    termOfUse.style.borderColor = "red";
    termOfUse.style.borderWidth = "3.5px";
    termOfUse.style.borderStyle = "solid";
    termOfUseError.style.display = "inline-block";
  }
  else {
    termOfUse.style.borderStyle = "none";
    termOfUseError.style.display = "none";
  }
  return isValid;
}

/**
 * check if at least one city is checked
 * and visually indicate if incorrect
 * @param {bool} isValid 
 * @returns bool
 */
function checkRadio(isValid) {
  let radioBox = document.getElementById("radio-box");
  let radioBoxError = document.getElementById("radioBox-error");
  const listRadio = radioBox.querySelectorAll("input");
  let cpt = 0;
  //count how many radio type input isn't checked
  listRadio.forEach((input) => {
    if (!input.checked) {
      cpt++;
    }
  });
  if (cpt == listRadio.length) {
    isValid = false;
    radioBox.style.borderColor = "red";
    radioBox.style.borderWidth = "3.5px";
    radioBox.style.borderStyle = "solid";
    radioBoxError.style.display = "inline-block";
  }
  else {
    radioBox.style.borderStyle = "none";
    radioBoxError.style.display = "none";
  }
  return isValid;
}