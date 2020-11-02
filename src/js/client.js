import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('client');

// get form 
// catch and validate data
// save send data to Excursion (?) or server?

// get form 
const excursionForm = document.forms[0];
console.log("excursionForm", excursionForm)
const formFields = excursionForm.elements;

excursionForm.addEventListener('submit', e => {
    e.preventDefault();

    // e.target to bedzie wycieczka
    const adults = excursionForm.elements[0].value;
    const child = excursionForm.elements[1].value;


});

// loop over and get the data
// clientForm
