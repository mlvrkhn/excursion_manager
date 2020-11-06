import './../css/admin.css';
import ExcursionsAPI from './ExcursionsAPI';

console.log('admin');

const newExcursionForm = document.querySelector('.form');
const admin = new ExcursionsAPI();



// document.addEventListener('DOMContentLoaded', init);

admin._renderExcursions();


function init() {
    // admin.renderExcursions();
    // admin._renderExcursions();
    // admin.deleteExcursion()
}

// *****************************
// ADMIN CAN ADD NEW EXCURSIONS
// *****************************

newExcursionForm.addEventListener('submit', e => {
    e.preventDefault();
    const { target: { elements }} = e;

    const excursion = {
        name: elements.name.value,
        description: elements.description.value,
        adultPrice: elements.price__adult.value,
        childPrice: elements.price__child.value
    };

    admin.addExcursion(excursion).then(() => admin._renderExcursions())
});

const panels = document.querySelectorAll('.excursions');
panels.forEach(panel => {
    panel.addEventListener('click', event => {
        event.preventDefault();
        const { target } = event;

        const parent = event.target.parentNode.parentNode.parentNode;
        const idToDelete = parent.dataset.id;

        if (target.value === 'usuń') {
            if (idToDelete && idToDelete > 0) {
                admin.deleteExcursion(idToDelete).then(() => {
                    admin._renderExcursions()
                });
            }
        }
        if (target.value === 'edytuj') {

            const editForm = document.querySelector('.form').cloneNode(true);
            editForm.classList.add('form__edit');
            const root = document.querySelector('.section__forms');
            // parent.innerHTML = '';
            root.appendChild(editForm);
            document.querySelector('.form__add').style.display = 'none';
            
            editForm.addEventListener('submit', click => {

                click.preventDefault();
                console.log('klk');
                const elements = click.target.elements;
                const id = parent.dataset.id;
                
                const dataToUpdate = {
                    name: elements.name.value,
                    description: elements.description.value,
                    adultPrice: elements.price__adult.value,
                    childPrice: elements.price__child.value
                }
                admin.editExcursion(id, dataToUpdate).then(() => admin._renderExcursions()).catch(err => console.log(err));
            });
            
        }
    })
});

