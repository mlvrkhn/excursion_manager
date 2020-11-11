import './../css/client.css';
import ExcursionsView from './ExcursionsView';

const view = new ExcursionsView();

document.addEventListener('DOMContentLoaded', init)

function init() {
    view._renderExcursions();
    view._renderOrders();
    view._confirmOrder();
    view._removeFromBasket();
    view._addToBasket();
};