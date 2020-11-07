import ExcursionsAPI from './ExcursionsAPI';
const admin = new ExcursionsAPI()

class ExcursionsView {
    constructor() {
        this.excursionRoot = document.querySelector('.panel__excursions');
        this.excursionProto = document.querySelector('.excursions__item--prototype');
        this.excursionProtoSelector = 'excursions__item--prototype';
    };

    _renderExcursions() {
        this._cleanExcursionView();
        admin.getExcursions().then(excursions => {
            excursions.forEach(excursion => {
                const newElement = this.excursionProto.cloneNode(true);
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

    _cleanExcursionView() {
        const allExcursions = document.querySelector('.excursions')
        if (allExcursions) {
            const protoExc = this._getExcursionProto();
            if (protoExc) {
                allExcursions.innerHTML = '';
            }
        }
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
    _displayBasket() {
        admin.getOrders().then(resp => {
            this._renderOrders(resp);
        });
    }
    _renderOrders(orders) {
        const root = document.querySelector('.panel__summary');
        const proto = document.querySelector('.summary__item--prototype');
        orders.forEach(order => {
            // data I got from DataBase
            const { name, nrAdult, nrChild, adultPrice, childPrice } = order;
            const summaryDescr = `dorośli: ${nrAdult} x ${adultPrice} PLN,
            dzieci: ${nrChild} x ${childPrice} PLN`

            // clone node
            const orderItem = proto.cloneNode(true);
            orderItem.classList.remove('summary__item--prototype')

            const excursionSum = `${nrAdult * adultPrice + nrChild * childPrice} PLN `;

            orderItem.querySelector('.summary__name').innerText = name;
            orderItem.querySelector('.summay__total-price').innerText = excursionSum;
            orderItem.querySelector('.summary__prices').innerText = summaryDescr;
            
            root.appendChild(orderItem);

        });
    }
}

export default ExcursionsView;