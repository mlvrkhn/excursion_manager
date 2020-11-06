import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';
import ExcursionsView from './ExcursionsView';

console.log('client');


// **********************************
// ************* APP ****************
// **********************************
// get and render excursions

const api = new ExcursionsAPI();
const view = new ExcursionsView();
const basket = [];

document.addEventListener('DOMContentLoaded', init)


function init() {
    view._renderExcursions();
}

addToBasket();

function addToBasket() {
    const excursions = document.querySelector('.panel__excursions');
    excursions.addEventListener('click', event => {
        event.preventDefault();

        if (event.target.value === 'dodaj do zamówienia') {
            console.log('as');
            getOrderData(event);
        }
        return;
    });
} 
function getOrderData(event) {
    const curr = event.target;
    const root = curr.parentNode.parentNode.parentNode;

    const name = root.querySelector('.excursions__title').textContent;

    const nrAdult = parseInt(root.querySelector('.excursions__field-input-adult').value);
    const nrChild = parseInt(root.querySelector('.excursions__field-input-child').value);
    const adultPrice = root.querySelector('.excursions__field-price-adult').innerText;
    const childPrice = root.querySelector('.excursions__field-price-child').innerText;

    const order = {
        name,
        adultPrice,
        childPrice,
        nrAdult,
        nrChild
    };
    console.log("getOrderData -> order", order)
    api.addOrder(order);
    view._displayBasket();
}