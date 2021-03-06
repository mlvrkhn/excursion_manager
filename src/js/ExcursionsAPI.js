class ExcursionsAPI {
    constructor() {
        this.excursionRoot = document.querySelector('.panel__excursions');
        this.excursionProtoSelector = 'excursions__item--prototype';
        this.excursionProto = document.querySelector('.excursions__item--prototype');
        this.excursionsAPI = 'http://localhost:3000/excursions/';
        this.ordersAPI = 'http://localhost:3000/orders/';
    };

    // **** EXCURSION LIST ****

    getExcursions() {
        return this._getFromServer(this.excursionsAPI);
    };
    addExcursion(data) {
        return this._sendToServer(this.excursionsAPI, data);
    };
    editExcursion(id, data) {
        return this._updateToServer(this.excursionsAPI, data, id);
    }
    deleteExcursion(id) {
        return this._deleteFromServer(this.excursionsAPI, id);
    }

    // **** ORDER LIST ****

    getOrders() {
        return this._getFromServer(this.ordersAPI);
    };

    addOrder(data) {
        return this._sendToServer(this.ordersAPI, data);
    };

    editOrder(id, data) {
        return this._updateToServer(this.ordersAPI, data, id);
    }
    deleteOrder(id) {
        return this._deleteFromServer(this.ordersAPI, id);
    }
    removeAllOrders() {
        return this.getOrders().then(orders => {
            orders.forEach(ord => {
                const {
                    id
                } = ord;
                this.deleteOrder(id);
            });
        });
    };

    // ****** TALKING TO SERVER ******

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
        return this._fetch(url, options, id);
    };

    _fetch(url, options, route = '') {

        return fetch(url + route, options).then(resp => {
            if (!resp.ok) {
                return Promise.reject(resp);
            } else {
                return resp.json();
            }
        })
    }
}

export default ExcursionsAPI;