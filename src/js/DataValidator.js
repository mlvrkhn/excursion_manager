class DataValidator {
    
    _validateOrder(val1, val2) {
        if (typeof val1 === 'number' && typeof val2 === 'number') {
            console.log('data validated');
            return true;
        } else {
            throw new Error('Both values must be numbers!')
        }
    }
    _validateCustomerData(name, mail) {
        const validName = this._validateName(name);
        const validMail = this._validateMail(mail);
        if (validMail && validName) {
            return true;
        } else {
            return;
        }
    };
    _validateName(name) {
        if (typeof name !== 'string' || name.length < 6 || name.includes(' ')) {
            return true
        } else {
            throw new Error('Wrong name!');
        }
    };
    _validateMail(mail) {
        if (!mail.includes('@') || !mail.includes('.') || mail.length < 8) {
            throw new Error('Invalid email address!');
        } else {
            return true;
        }
    }
}

export default DataValidator;