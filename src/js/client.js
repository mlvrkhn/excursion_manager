import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('client');

// get and render excursions
const api = new ExcursionsAPI();
api.getExcursionsList();
api.renderExcursions();

// zamawianie

// get form 
// catch and validate data
// save send data to Excursion (?) or server?

// get form 
const excursionForm = document.forms[0];
const formFields = excursionForm.elements;

excursionForm.addEventListener('submit', e => {
    e.preventDefault();

    // e.target to bedzie wycieczka
    const adults = excursionForm.elements[0].value;
    const child = excursionForm.elements[1].value;


});

// loop over and get the data
// clientForm
