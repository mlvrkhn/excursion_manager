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
        const idToDelete = parent.dataset.id;

        if (target.value === 'usuń') {
            if (idToDelete && idToDelete > 0) {
                admin.deleteExcursion(idToDelete).then(() => {
                    view._renderExcursions()
                });
            }
        }
        if (target.value === 'edytuj') {

            const editForm = createEditForm();
            const root = document.querySelector('body');
            root.appendChild(editForm);
            view._blurBackground(true);

            editForm.addEventListener('submit', click => {
                click.preventDefault();

                const elements = click.target.elements;
                const id = parent.dataset.id;

                const dataToUpdate = {
                    name: elements.name.value,
                    description: elements.description.value,
                    adultPrice: elements.price__adult.value,
                    childPrice: elements.price__child.value
                }

                editForm.classList.remove('form__active');
                view._blurBackground(false);
                admin.editExcursion(id, dataToUpdate).then(() => {
                    const excursions = admin.getExcursions();
                    view._renderExcursions(excursions);
                }).catch(err => console.log(err));
            });

        }

    })
});

function createEditForm() {
    const editForm = document.querySelector('.form').cloneNode(true);
    editForm.classList.add('form__edit', 'form__active');
    const editInfo = 'Enter new excursion data and click enter';
    const editHeader = document.createElement('h3');
    editHeader.innerText = editInfo;
    editForm.prepend(editHeader);
    return editForm;
}

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
        childPrice: elements.price__child.value
    };
    return excursion;
}