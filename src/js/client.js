import './../css/client.css';
import ExcursionsManager from './ExcursionsManager';
const app = new ExcursionsManager();


document.addEventListener('DOMContentLoaded', init)

function init() {
    app._renderExcursions();
    app._renderOrders();
    app._confirmOrder();
    app._removeFromBasket();
    app._addToBasket();
};