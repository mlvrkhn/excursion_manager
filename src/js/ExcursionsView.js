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
        const basketRoot = document.querySelector('.panel__summary');
        console.log('hejka');
        admin.getOrders().then(resp => {
            console.log(resp);
        });
    }
}

export default ExcursionsView;