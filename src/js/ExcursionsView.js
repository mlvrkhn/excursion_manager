import ExcursionsAPI from './ExcursionsAPI';
const admin = new ExcursionsAPI()

class ExcursionsView {
    constructor() {
        this.excursionRoot = document.querySelector('.panel__excursions');
        this.excursionProto = document.querySelector('.excursions__item--prototype');
        this.orderProto = document.querySelector('.summary__item--prototype')
        
        this.excursionProtoSelector = 'excursions__item--prototype';
    };

    _renderExcursions() {
        console.log('rendering ...');
        const prototype = this.excursionProto.cloneNode(true);
        this._clearExcursionView();

        admin.getExcursions().then(excursions => {
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
    }

    _getExcursionProto() {
        return (document.querySelector(".excursions__item--prototype") ||
            document.querySelector(".excursions__item"))
    }

    _clearExcursionView() {
        document.querySelector('.excursions').innerHTML = '';        
    }
    _blurBackground(state) {
        const body = document.querySelector('section');

        if (!state) {
            return body.classList.remove('background__blur');
        } else if (state) {
            return body.classList.add('background__blur');
        }
        return;
    }
    _renderOrders() {
        console.log('rendering order...');
        const prototype = this.orderProto.cloneNode(true);
        const root = document.querySelector('.summary');

        this._cleanOrdersView();
        
        admin.getOrders().then(resp => {
            resp.forEach(order => {
                const { name, nrAdult, nrChild, adultPrice, childPrice, id } = order;
                
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
    }
    _cleanOrdersView() {
        console.log('cleaning orders...');
        const list = document.querySelectorAll('.summary__item');
        console.log("ExcursionsView -> _cleanOrdersView -> list", list)
        const root = document.querySelector('.summary');
        while (root.childNodes.length > 1) {
            console.log('remove');
            root.removeChild(root.lastChild);
        }
    }
    _updateBasketTotal() {
        admin.getOrders().then(resp => {
            console.log(resp);
            const sumka = resp.reduce((total, order) => order.totalPrice + total, 0);
            document.querySelector('.order__total-price-value').innerText = `${sumka} PLN`;
            });
    }
}

export default ExcursionsView;