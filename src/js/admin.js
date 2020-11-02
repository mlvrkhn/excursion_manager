import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('admin');

// get form 
// create obj.
// fetch POST to server
// load excursion from the database

// API
const api = new ExcursionsAPI();

const newExcursionForm = document.forms[1];

newExcursionForm.addEventListener('submit', e => {
    e.preventDefault();
    getData(e);
});

function getData(event) {

    const formElements = event.target.elements;

    const name = formElements.name.value;
    const description = formElements.description.value;
    const adultPrice = formElements.price__adult.value;
    const childPrice = formElements.price__child.value;

    // create object
    const excursion = {
        name,
        description,
        adultPrice,
        childPrice
    };

    // add to database
    api.addExcursionToDatabase(excursion); 
}