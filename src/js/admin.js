import './../css/admin.css';
import ExcursionsAPI from './ExcursionsAPI';
import ExcursionsView from './ExcursionsView';

console.log('admin');

// **********************************
// ************* APP ****************
// **********************************

const admin = new ExcursionsAPI();
const view = new ExcursionsView();

document.addEventListener('DOMContentLoaded', init);

function init() {
    view._renderExcursions();

}

// *****************************
// ADMIN CAN ADD NEW EXCURSIONS
// *****************************

admin._listenForExcursions();
admin._manageExcursions();


const panels = document.querySelectorAll('.excursions');
panels.forEach(panel => {

    panel.addEventListener('click', event => {
        event.preventDefault();
        const {
            target
        } = event;

        const parent = event.target.parentNode.parentNode.parentNode;
        const id = parent.dataset.id;

        if (target.value === 'usuń') {
            view._removeExcursion(id);
        }
        if (target.value === 'edytuj') {
            view._editExcursion(parent);
        }
    })
});