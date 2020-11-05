import './../css/admin.css';
import ExcursionsAPI from './ExcursionsAPI';

console.log('admin');

const newExcursionForm = document.querySelector('.form');
const admin = new ExcursionsAPI();



// document.addEventListener('DOMContentLoaded', init);


// const x = admin.getExcursions();
// x.then(resp => {
//     console.log('success');
//     console.log(resp);
//     resp.forEach(element => {
//         admin._renderExcursions(element);
//     })
// });
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
    // add ID

    admin.addExcursion(excursion).then(() => admin._renderExcursions())
        
});



const panels = document.querySelectorAll('.excursions');
panels.forEach(panel => {
    panel.addEventListener('click', event => {
        event.preventDefault();
        const { target } = event;
        console.log("target", target)

        const parent = event.target.parentNode.parentNode.parentNode;
        console.log("parent", parent)
        
        const idToDelete = parent.dataset.id;

        if (target.value === 'usuń') {
            if (idToDelete && idToDelete > 0) {
                admin.deleteExcursion(idToDelete).then(() => {
                    admin._renderExcursions()
                });
            }
        }
    })
});

// function _checkIfDeleteBtn(target) {
//     console.log('check');
//     return target.classList.contains('excursions__field-input--remove');
// }




    // if (target && target.value === 'usuń') {
    //     const parent = target.parentNode.parentNode.parentNode;
    //     const id = parent.dataset.id;
    //     admin.deleteExcursion(id).then(res => {
    //         const result = res;
    //         console.log(id, ' deleted!');
    //     });

    // edit the excursion
    // } else if (target && target.value === 'edytuj') {

    //     console.log('targeto: ', clk.target);
    //     const formProto = document.querySelector('.form');

    //     const editPrompt = formProto.cloneNode(true);
    //     editPrompt.classList.add('form__active');
    //     editPrompt.addEventListener('submit', e => {
    //         e.preventDefault();
    //         const elements = e.target.elements;

    //         const name = elements.name.value;
    //         const description = elements.description.value;
    //         const adultPrice = elements.price__adult.value;
    //         const childPrice = elements.price__child.value;
    //         const id = e.target.getAttribute('data-id');
    //         console.log("id", id)

    //         const obj = {
    //             name, description, adultPrice, childPrice
    //         }
    //         admin.updateExcursion(element, obj);
    //     })
