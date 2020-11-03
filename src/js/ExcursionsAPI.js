class ExcursionsAPI {
    constructor() {
        this.rootList = document.querySelector('.panel__excurions');
        this.excursionProto = document.querySelector('.excurions__item--prototype');
        // this.excursions = '';
        this.excursionAPI = 'http://localhost:3000/excursions';
    };
    
    // ************************
    // **** EXCURSION LIST ****
    // ************************
    getExcursionsList() {
        return new Promise((resolve, reject) => {
            
            fetch(this.excursionAPI)
            .then(resp => {
                
                if (!resp.ok) {
                        reject(resp)
                    } else {
                        return resp.json();
                    };
                })
                .then(data => {
                    // this.excursions = data;
                    // this.renderExcursions(data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err);
                });
        })
    };

    addExcursionToDatabase(excursionData) {
        const excursionJSON = JSON.stringify(excursionData);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: excursionJSON
        }

        fetch(this.excursionAPI, options)
            .then(resp => resp.json())
            .then(data => console.log('hehe', data))
            .catch(err => console.log(err));
    };
    renderExcursions() {
        // get them excursions from server
        // get the root
        // copy the element
        // fill with data
        // add to html
        
        const fetchedExcursions = this.getExcursionsList();
        
        fetchedExcursions.then(resp => {
            resp.forEach(exc => {
                const { name, descr, adult, child, id }  = exc;
                const newElement = this.excursionProto.cloneNode(true);
                
                document.querySelector('.excursions__title').innerText = name;
                this.rootList.appendChild(newElement);
            });
        })
        .catch(err => console.log(err));
        


    };
}

export default ExcursionsAPI;

// maybe make one function to replace fetch code?

// render the excursions to both pages
// admin can delete and update 
// client can order, cancel order