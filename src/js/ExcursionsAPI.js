class ExcursionsAPI {
    constructor() {
        // server config here?
        this.excAPI = 'http://localhost:3000/excursions'
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

        fetch(this.excAPI, options)
            .then(resp => resp.json())
            .then(data => console.log('hehe', data))
            .catch(err => console.log(err));
    };
}

export default ExcursionsAPI;



// render the excursions to both pages
    // admin can delete and update 
    // client can order, cancel order