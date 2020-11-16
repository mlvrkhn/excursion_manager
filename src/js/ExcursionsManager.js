import ExcursionsAPI from './ExcursionsAPI';
import DataValidator from './DataValidator';
const api = new ExcursionsAPI()
const validator = new DataValidator()

class ExcursionManager {
    constructor(
        excRoot = '.panel__excursions',
        excProto = '.excursions__item--prototype',
        ordProto = '.summary__item--prototype') {
        this.excursionRoot = document.querySelector(excRoot);
        this.excursionProto = document.querySelector(excProto);
        this.orderProto = document.querySelector(ordProto);
    };

    listenForEditDelete() {
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
                    this._removeExcursion(id);
                }
                if (target.value === 'edytuj') {
                    this._editExcursion(parent);
                }
            })
        });
    };
    renderExcursions() {
        const prototype = this.excursionProto.cloneNode(true);
        this._clearExcursionView();

        api.getExcursions().then(excursions => {
            excursions.forEach(excursion => {
                const newElement = prototype.cloneNode(true);
                newElement.classList.remove('excursions__item--prototype');
                newElement.querySelector('.excursions__title').textContent = excursion.name;
                newElement.querySelector('.excursions__description').textContent = excursion.description;
                newElement.querySelector('.excursions__field-price-adult').textContent = excursion.adultPrice;
                newElement.querySelector('.excursions__field-price-child').textContent = excursion.childPrice;
                newElement.dataset.id = excursion.id;
                this.excursionRoot.appendChild(newElement);
            });
        });
    };
    removeFromBasket() {
        const summary = document.querySelector('.summary');

        summary.addEventListener('click', e => {
            e.preventDefault();
            if (e.target.innerText === 'X') {
                const nodeToDelete = e.target.parentNode.parentNode;
                const idToDelete = nodeToDelete.dataset.Id;

                api.deleteOrder(idToDelete);
                this.renderOrders();
            }
        });
    };
    renderOrders() {
        const prototype = this.orderProto.cloneNode(true);
        const root = document.querySelector('.summary');

        this._clearOrdersView();

        api.getOrders().then(resp => {
            resp.forEach(order => {
                const {
                    name,
                    nrAdult,
                    nrChild,
                    adultPrice,
                    childPrice,
                    id
                } = order;

                const newElement = prototype.cloneNode(true);
                const excursionSum = nrAdult * adultPrice + nrChild * childPrice;
                const summaryDescr = `dorośli: ${nrAdult} x ${adultPrice} PLN,
                dzieci: ${nrChild} x ${childPrice} PLN`

                newElement.querySelector('.summary__name').innerText = name;
                newElement.querySelector('.summay__total-price').innerText = `${excursionSum} PLN`;
                newElement.querySelector('.summary__prices').innerText = summaryDescr;
                newElement.dataset.Id = id;

                newElement.classList.remove('summary__item--prototype');

                root.append(newElement);
            });
        });
        this._updateBasketTotal()
    };
    addToBasket() {
        const excursions = document.querySelector('.panel__excursions');
        excursions.addEventListener('click', event => {
            event.preventDefault();

            if (event.target.value === 'dodaj do zamówienia') {
                this._addOrderToServer(event);
            }
            return;
        });
    };
    confirmOrder() {
        const sendOrderBtn = document.querySelector('.order__field-submit');
        sendOrderBtn.addEventListener('click', e => {
            e.preventDefault();

            const name = document.querySelector('input[name="name"]').value;
            const mail = document.querySelector('input[name="email"]').value;
            const price = document.querySelector('.order__total-price-value').innerText;
            const validCustomerData = validator.validateCustomerData(name, mail);

            if (validCustomerData) {
                api.getOrders().then(orders => {
                    const basket = [];
                    orders.forEach(order => {
                        const {
                            name,
                            nrAdult,
                            nrChild
                        } = order;
                        const excursion = `${name}.\n Dorośli: ${nrAdult}, dzieci: ${nrChild}. Suma: ${price}.`;
                        basket.push(excursion);
                    })
                    this._displayOrderSummary(name, mail, price, basket);
                })
            } else {
                throw new Error('Invalid data');
            }
        });
    };
    listenForAddExcursion() {
        const newExcursionForm = document.querySelector('.form');

        newExcursionForm.addEventListener('submit', e => {
            e.preventDefault();
            const excursion = this._createExcursion(e);
            api.addExcursion(excursion).then(() => this.renderExcursions())
        });
    };
    _editExcursion(element) {
        const editForm = this._createEditForm();
        const root = document.querySelector('body');
        root.appendChild(editForm);
        this._blurBackground(true);

        editForm.addEventListener('submit', click => {
            click.preventDefault();

            const elements = click.target.elements;
            const id = element.dataset.id;

            const dataToUpdate = {
                name: elements.name.value,
                description: elements.description.value,
                adultPrice: elements.price__adult.value,
                childPrice: elements.price__child.value
            }

            editForm.classList.remove('form__active');
            this._blurBackground(false);
            api.editExcursion(id, dataToUpdate).then(() => {
                const excursions = api.getExcursions();
                this.renderExcursions(excursions);
            }).catch(err => console.log(err));
        });
    }
    _removeExcursion(idToDelete) {
        if (idToDelete && idToDelete > 0) {
            api.deleteExcursion(idToDelete).then(() => {
                this.renderExcursions();
            });
        }
    }
    _createEditForm() {
        const editForm = document.querySelector('.form').cloneNode(true);
        editForm.classList.add('form__edit', 'form__active');
        const editInfo = 'Enter new excursion data and click enter';
        const editHeader = document.createElement('h3');
        editHeader.innerText = editInfo;
        editForm.prepend(editHeader);
        return editForm;
    };
    _getExcursionProto() {
        return (document.querySelector(".excursions__item--prototype") ||
            document.querySelector(".excursions__item"))
    };
    _clearExcursionView() {
        document.querySelector('.excursions').innerHTML = '';
    };
    _blurBackground(state) {
        const body = document.querySelector('section');

        if (!state) {
            return body.classList.remove('background__blur');
        } else if (state) {
            return body.classList.add('background__blur');
        }
        return;
    };
    _clearOrdersView() {
        const root = document.querySelector('.summary');
        while (root.childNodes.length > 1) {
            root.removeChild(root.lastChild);
        }
    };

    _updateBasketTotal() {
        api.getOrders().then(resp => {
            const sumka = resp.reduce((total, order) => order.totalPrice + total, 0);
            document.querySelector('.order__total-price-value').innerText = `${sumka} PLN`;
        });
    };

    _displayOrderSummary(name, email, price, orders) {
        const root = document.querySelector('body');
        const popUpSummary = document.createElement('div');

        const title = `Congrats ${name}!`;
        const summary = `You have ordered following excursions:`;
        const mailInfo = `We will send the tickets to ${email}`;
        const listItem = orders.forEach(ord => {
            const el = document.createElement('li');
            el.textContent = ord;
            orderSummaryList.appendChild(el);
        })

        this._createElementWithText('h3', title, popUpSummary)
        this._createElementWithText('p', summary, popUpSummary)
        this._createElementWithText('ul', listItem, popUpSummary)
        this._createElementWithText('p', price, popUpSummary)
        this._createElementWithText('p', mailInfo, popUpSummary)

        popUpSummary.classList.add('form__edit', 'form__active');
        root.appendChild(popUpSummary);

        this._blurBackground(true);
        this._hideSummary(popUpSummary);
    };
    _createExcursion(event) {
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
    _createElementWithText(elementToCreate, txtContent, rootElement) {
        const element = document.createElement(elementToCreate);
        element.textContent = txtContent;
        rootElement.appendChild(element);
    }
    _hideSummary(element) {
        if (element) {
            document.querySelector('body').addEventListener('click', () => {
                element.classList.remove('form__active');
                this._blurBackground(false);
                api.removeAllOrders();
                document.querySelector('.summary').innerHTML = '';
            });
        } else {
            return;
        }
    }
    _addOrderToServer(event) {
        const curr = event.target;
        const root = curr.parentNode.parentNode.parentNode;

        const name = root.querySelector('.excursions__title').textContent;
        const nrAdult = parseInt(root.querySelector('.excursions__field-input-adult').value);
        const nrChild = parseInt(root.querySelector('.excursions__field-input-child').value);
        const adultPrice = parseInt(root.querySelector('.excursions__field-price-adult').innerText);
        const childPrice = parseInt(root.querySelector('.excursions__field-price-child').innerText);
        const totalPrice = parseInt(nrAdult * adultPrice + nrChild * childPrice);

        const validOrder = validator.validateOrder(nrAdult, nrChild);

        if (validOrder) {
            const order = {
                name,
                adultPrice,
                childPrice,
                nrAdult,
                nrChild,
                totalPrice
            };

            api.addOrder(order).then(() => {
                this.renderOrders();
            });
        } else {
            return;
        }
    };
}

export default ExcursionManager;