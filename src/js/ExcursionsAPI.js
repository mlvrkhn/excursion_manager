// *********************
// ******* TODO ********
// *********************

// - figure why I get 2 times the excursions from DB - probably in renderExcursions
// - fix the id so every object on the server gets its own id
// - write update excursion function in ExcursionsAPI 
// - check for code repetition
// - check if returning new Promise(resolved or rejected) is a way to go 


class ExcursionsAPI {
    constructor() {
        this.excursionRoot = document.querySelector('.panel__excursions');
        this.excursionProtoSelector = 'excursions__item--prototype'
        this.excursionProto = document.querySelector('.excursions__item--prototype');
        this.excursionsAPI = 'http://localhost:3000/excursions/';
        this.ordersAPI = 'http://localhost:3000/orders/';
        // this.maxId = null;
    };

    // ************************
    // **** EXCURSION LIST ****
    // ************************

    getExcursions() {
        return this._fetch(this.excursionsAPI)
    };

    addExcursion(excursionData) {
        console.log('addExc');
        return this._sendToServer(this.excursionsAPI, excursionData);
    };

    editExcursion(id, excursionData) {
        console.log('editExcursion()');
    }

    deleteExcursion(id) {
        console.log('deleting...');
        return this._deleteFromServer(this.excursionsAPI, id)
    }

    // *******************************
    // ****** TALKING TO SERVER ******
    // *******************************

    // Not needed method?
    // _getFromServer(url) {
    //     this._fetch(url);
    // };

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
                this._renderExcursions();
            }
        })
        
        // .catch(err => {
        //     console.log(err);
        // })
    }


    // VIEW
    _renderExcursions() {
        // clean the view
        const allExcursions = document.querySelector('.excursions')
        if (allExcursions) {
            // const protoExc = document.querySelector('.excursions__item--prototype');
            const protoExc = this.getExcursionProto();
            console.log("ExcursionsAPI -> _renderExcursions -> protoExc", protoExc)
            if (protoExc) {
                allExcursions.innerHTML = '';
            }
        }

        // get excursions from server
        const excursions = this.getExcursions();
        excursions.then(excursions => {
            
            // render excursions to the page
            excursions.forEach(excursion => {
                const newElement = this.excursionProto.cloneNode(true);
                newElement.classList.remove(this.excursionProtoSelector);
                newElement.querySelector('.excursions__title').textContent = excursion.name;
                newElement.querySelector('.excursions__description').textContent = excursion.description;
                newElement.querySelector('.excursions__adult-price').textContent = excursion.adultPrice;
                newElement.querySelector('.excursions__child-price').textContent = excursion.childPrice;
                newElement.dataset.id = excursion.id;
                this.excursionRoot.appendChild(newElement);
            })
        })
    }

    getExcursionProto() {
        return (document.querySelector(".excursions__item--prototype") ||
            document.querySelector(".excursions__item"))
    }
    
    _getId() {

    }

    // renderExcursions() {

    //     const fetchedExcursions = this.getExcursions();
    //     console.log("ExcursionsAPI -> renderExcursions -> fetchedExcursions", fetchedExcursions)

    //     fetchedExcursions.then(excursionData => {
    //             this.excursionProto.classList.remove('excursions__item--prototype');

    //             excursionData.forEach(exc => {
    //                 const {
    //                     name,
    //                     description,
    //                     adultPrice,
    //                     childPrice,
    //                     id
    //                 } = exc;
    //                 const newElement = this.excursionProto.cloneNode(true);
    //                 const pricing = newElement.querySelectorAll('.excursions__field-name');

    //                 newElement.classList.remove('excursions__item--prototype');
    //                 newElement.querySelector('.excursions__title').innerText = name;
    //                 newElement.querySelector('.excursions__description').innerText = description;
    //                 newElement.setAttribute('data-id', id);

    //                 pricing[0].innerHTML = `Dorosły: <strong>${adultPrice}</strong> PLN`
    //                 pricing[1].innerHTML = `Dziecko: <strong>${childPrice}</strong> PLN`
    //                 // if you get the proper ID, this will work
    //                 // newElement.setAttribute('data-id', id);

    //                 this.rootList.appendChild(newElement);
    //             });
    //         })
    //         .catch(err => console.log(err));
    // };
    
}

export default ExcursionsAPI;
