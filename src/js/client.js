import './../css/client.css';
import ExcursionsManager from './ExcursionsManager';
const app = new ExcursionsManager();


document.addEventListener('DOMContentLoaded', init)

function init() {
    app.renderExcursions();
    app.renderOrders();
    app.confirmOrder();
    app.removeFromBasket();
    app.addToBasket();
};