import './../css/admin.css';
import ExcursionsView from './ExcursionsView';

const view = new ExcursionsView();

document.addEventListener('DOMContentLoaded', init);

function init() {
    view._renderExcursions();
    view._listenForEditDelete();
    view._listenForAddExcursion();
};