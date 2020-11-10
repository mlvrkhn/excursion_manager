// TODO
// - click anywhere to dismiss popup
// - validate data from user
// - order what is in the basket (orders)
// - check for code repetition

// import ExcursionsView from './ExcursionsView';
// const v = new ExcursionsView();
import ExcursionsAPI from './ExcursionsAPI';
import ExcursionsView from './ExcursionsView';
const admin = new ExcursionsAPI();
const view = new ExcursionsView();

class ExcursionsAPI {
    constructor() {
        this.excursionRoot = document.querySelector('.panel__excursions');
        this.excursionProtoSelector = 'excursions__item--prototype'
        this.excursionProto = document.querySelector('.excursions__item--prototype');
        this.excursionsAPI = 'http://localhost:3000/excursions/';
        this.ordersAPI = 'http://localhost:3000/orders/';
    };

    _listenForExcursions() {
        const newExcursionForm = document.querySelector('.form');
        newExcursionForm.addEventListener('submit', e => {
            e.preventDefault();
            const excursion = this._createExcursion(e);
            admin.addExcursion(excursion).then(() => view._renderExcursions())
        });
    }
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

    // ************************
    // **** EXCURSION LIST ****
    // ************************

    getExcursions() {
        return this._getFromServer(this.excursionsAPI)
    };
    addExcursion(data) {
        return this._sendToServer(this.excursionsAPI, data);
    };
    editExcursion(id, data) {
        return this._updateToServer(this.excursionsAPI, data, id)
    }
    deleteExcursion(id) {
        return this._deleteFromServer(this.excursionsAPI, id)
    }

    // ************************
    // **** ORDER LIST ****
    // ************************

    getOrders() {
        return this._getFromServer(this.ordersAPI)
    };

    addOrder(data) {
        return this._sendToServer(this.ordersAPI, data);
    };

    editOrder(id, data) {
        return this._updateToServer(this.ordersAPI, data, id)
    }
    deleteOrder(id) {
        return this._deleteFromServer(this.ordersAPI, id)
    }
    _removeAllOrders() {
        this.getOrders().then(orders => {
            orders.forEach(ord => {
                const {
                    id
                } = ord;
                this.deleteOrder(id);
            });

        });
    };

    // *******************************
    // ****** TALKING TO SERVER ******
    // *******************************

    _getFromServer(url) {
        return this._fetch(url);
    };

    _sendToServer(url, data) {

        const jsonData = JSON.stringify(data);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        }
        return this._fetch(url, options);
    };

    _updateToServer(url, data, id) {

        const jsonData = JSON.stringify(data);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        }
        return this._fetch(url, options, id);
    };

    _deleteFromServer(url, id) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return this._fetch(url, options, id)
    };


    _fetch(url, options, route = '') {

        return fetch(url + route, options).then(resp => {
            if (!resp.ok) {
                return Promise.reject(resp);
            } else {
                return resp.json();
            }
        })
        // .catch(err => {
        //     console.log(err);
        // })
    }
}

export default ExcursionsAPI;