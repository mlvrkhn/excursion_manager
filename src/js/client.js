import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';
import ExcursionsView from './ExcursionsView';

console.log('client');


// **********************************
// ************* APP ****************
// **********************************

const api = new ExcursionsAPI();
const view = new ExcursionsView();

document.addEventListener('DOMContentLoaded', init)


function init() {
    view._renderExcursions();
    view._renderOrders();
}

addToBasket();
removeFromBasket();

function addToBasket() {
    const excursions = document.querySelector('.panel__excursions');
    excursions.addEventListener('click', event => {
        event.preventDefault();

        if (event.target.value === 'dodaj do zamówienia') {
            addOrderToServer(event);
        }
        return;
    });
} 
function removeFromBasket() {
    const summary = document.querySelector('.summary');

    summary.addEventListener('click', e => {
        e.preventDefault();
        
        if (e.target.innerText === 'X') {
            const nodeToDelete = e.target.parentNode.parentNode;
            const idToDelete = nodeToDelete.dataset.Id;

            api.deleteOrder(idToDelete);
            view._renderOrders();            
        }

        // api.deleteOrder(id);
    });
}


function addOrderToServer(event) {
    const curr = event.target;
    const root = curr.parentNode.parentNode.parentNode;

    const name = root.querySelector('.excursions__title').textContent;

    const nrAdult = parseInt(root.querySelector('.excursions__field-input-adult').value);
    const nrChild = parseInt(root.querySelector('.excursions__field-input-child').value);
    const adultPrice = parseInt(root.querySelector('.excursions__field-price-adult').innerText);
    const childPrice = parseInt(root.querySelector('.excursions__field-price-child').innerText);
    const totalPrice = parseInt(nrAdult * adultPrice + nrChild * childPrice);

    const order = {
        name,
        adultPrice,
        childPrice,
        nrAdult,
        nrChild,
        totalPrice
    };
    api.addOrder(order).then(() => {
        view._renderOrders();
    });
}
function deleteOrderedExc(id) {
    const delBtn = document.querySelector('.summary__btn-remove')
}