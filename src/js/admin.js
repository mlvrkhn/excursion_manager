import './../css/admin.css';
import ExcursionsAPI from './ExcursionsAPI';
import ExcursionsView from './ExcursionsView';

console.log('admin');

// **********************************
// ************* APP ****************
// **********************************

const admin = new ExcursionsAPI();
const view = new ExcursionsView();
const newExcursionForm = document.querySelector('.form');

document.addEventListener('DOMContentLoaded', init);

function init() {
    view._renderExcursions();
    // admin.deleteExcursion();
}

// *****************************
// ADMIN CAN ADD NEW EXCURSIONS
// *****************************

newExcursionForm.addEventListener('submit', e => {
    e.preventDefault();
    const excursion = createExcursion(e);
    admin.addExcursion(excursion).then(() => view._renderExcursions())
});

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

function createExcursion(event) {
    const {
        target: {
            elements
        }
    } = event;
    const excursion = {
        name: elements.name.value,
        description: elements.description.value,
        adultPrice: elements.price__adult.value,
        childPrice: elements.price__child.value,
    };
    return excursion;
}