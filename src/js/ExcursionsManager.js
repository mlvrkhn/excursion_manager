import ExcursionsAPI from './ExcursionsAPI';
import DataValidator from './DataValidator';
const api = new ExcursionsAPI()
const validator = new DataValidator()

class ExcursionManager {
    constructor() {
        this.excursionRoot = document.querySelector('.panel__excursions');
        this.excursionProto = document.querySelector('.excursions__item--prototype');
        this.orderProto = document.querySelector('.summary__item--prototype');
        this.excursionProtoSelector = 'excursions__item--prototype';
    };

    _listenForEditDelete() {
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
                this._renderExcursions(excursions);
            }).catch(err => console.log(err));
        });
    }

    _removeExcursion(idToDelete) {
        if (idToDelete && idToDelete > 0) {
            api.deleteExcursion(idToDelete).then(() => {
                this._renderExcursions();
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

    _renderExcursions() {
        const prototype = this.excursionProto.cloneNode(true);
        this._clearExcursionView();

        api.getExcursions().then(excursions => {
            excursions.forEach(excursion => {
                const newElement = prototype.cloneNode(true);
                newElement.classList.remove(this.excursionProtoSelector);
                newElement.querySelector('.excursions__title').textContent = excursion.name;
                newElement.querySelector('.excursions__description').textContent = excursion.description;
                newElement.querySelector('.excursions__field-price-adult').textContent = excursion.adultPrice;
                newElement.querySelector('.excursions__field-price-child').textContent = excursion.childPrice;
                newElement.dataset.id = excursion.id;
                this.excursionRoot.appendChild(newElement);
            });
        });
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

    // ******* ORDERS ********

    _removeFromBasket() {
        const summary = document.querySelector('.summary');

        summary.addEventListener('click', e => {
            e.preventDefault();
            if (e.target.innerText === 'X') {
                const nodeToDelete = e.target.parentNode.parentNode;
                const idToDelete = nodeToDelete.dataset.Id;

                api.deleteOrder(idToDelete);
                this._renderOrders();
            }
        });
    };

    _renderOrders() {
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
        const titleSummary = document.createElement('h3');
        const infoSummary = document.createElement('p');
        const orderSummaryList = document.createElement('ul');
        const totalSummarySum = document.createElement('p');
        const eMailAddress = document.createElement('p');

        titleSummary.textContent = `Congrats ${name}!`;
        totalSummarySum.textContent = price;
        eMailAddress.textContent = `We will send the tickets to ${email}`;

        infoSummary.textContent = `You have ordered following excursions:`;
        orders.forEach(ord => {
            const el = document.createElement('li');
            el.textContent = ord;
            orderSummaryList.appendChild(el);
        })

        popUpSummary.classList.add('form__edit', 'form__active');
        popUpSummary.appendChild(titleSummary);
        popUpSummary.appendChild(infoSummary);
        popUpSummary.appendChild(orderSummaryList);
        popUpSummary.appendChild(totalSummarySum);
        popUpSummary.appendChild(eMailAddress);
        root.appendChild(popUpSummary);

        this._blurBackground(true);

        if (popUpSummary) {
            document.querySelector('body').addEventListener('click', () => {
                popUpSummary.classList.remove('form__active');
                this._blurBackground(false);
                api._removeAllOrders();
                document.querySelector('.summary').innerHTML = '';
            });
        }
    };

    _addToBasket() {
        const excursions = document.querySelector('.panel__excursions');
        excursions.addEventListener('click', event => {
            event.preventDefault();

            if (event.target.value === 'dodaj do zamówienia') {
                this._addOrderToServer(event);
            }
            return;
        });
    };

    _addOrderToServer(event) {
        const curr = event.target;
        const root = curr.parentNode.parentNode.parentNode;

        const name = root.querySelector('.excursions__title').textContent;
        const nrAdult = parseInt(root.querySelector('.excursions__field-input-adult').value);
        const nrChild = parseInt(root.querySelector('.excursions__field-input-child').value);
        const adultPrice = parseInt(root.querySelector('.excursions__field-price-adult').innerText);
        const childPrice = parseInt(root.querySelector('.excursions__field-price-child').innerText);
        const totalPrice = parseInt(nrAdult * adultPrice + nrChild * childPrice);

        const validOrder = validator._validateOrder(nrAdult, nrChild);

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
                this._renderOrders();
            });
        } else {
            return;
        }
    };

    _confirmOrder() {
        const sendOrderBtn = document.querySelector('.order__field-submit');
        sendOrderBtn.addEventListener('click', e => {
            e.preventDefault();

            const name = document.querySelector('input[name="name"]').value;
            const mail = document.querySelector('input[name="email"]').value;
            const price = document.querySelector('.order__total-price-value').innerText;

            const validCustomerData = validator._validateCustomerData(name, mail);

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

    _listenForAddExcursion() {
        const newExcursionForm = document.querySelector('.form');

        newExcursionForm.addEventListener('submit', e => {
            e.preventDefault();
            const excursion = this._createExcursion(e);
            api.addExcursion(excursion).then(() => this._renderExcursions())
        });
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
}

export default ExcursionManager;