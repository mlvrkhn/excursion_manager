import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('admin');

// get form 
// create obj.
// fetch POST to server
// load excursion from the database

// admin
const admin = new ExcursionsAPI();

const newExcursionForm = document.forms[1];

// const excursionsList = admin.getExcursionsList();
// console.log("excursionsList", excursionsList)

admin.renderExcursions();



// GET DATA FROM USER AND SEND IT TO SERVER
newExcursionForm.addEventListener('submit', e => {
    e.preventDefault();
    getInpuFromClient(e);
});

function getInpuFromClient(event) {

    const { target: { elements }} = event;
    console.log("getData -> elements", elements)
    // const formElements = event.target.elements;

    const name = elements.name.value;
    console.log("getDataFromForm -> name", name)
    const description = elements.description.value;
    const adultPrice = elements.price__adult.value;
    const childPrice = elements.price__child.value;

    // check if prices are numbers
    // if (isNaN(ticketsAdult) || isNaN(ticketsChild)) {
    //     console.log('input fields must be a number!');
    // } else {

    // }

    // create object
    const excursion = {
        name,
        description,
        adultPrice,
        childPrice
    };

    // add to database
    admin.addExcursionToDatabase(excursion); 
}

