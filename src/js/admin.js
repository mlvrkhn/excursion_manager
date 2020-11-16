import './../css/admin.css';
import ExcursionsManager from './ExcursionsManager';

const view = new ExcursionsManager();

document.addEventListener('DOMContentLoaded', init);

function init() {
    view.renderExcursions();
    view.listenForEditDelete();
    view.listenForAddExcursion();
};