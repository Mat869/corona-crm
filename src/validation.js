class Form {

    isName (str) {
        if(str.includes(' ')) {
            return true;
        }
        return false;
    }

    minLength(str, min) {
        if(str.length >= min) {
            return true;
        }
        return false;
    }

    maxLength(str, max) {
        if(str.length <= max) {
            return true;
        }
        return false;
    }

    isEmail(str) {
        if(str.indexOf(' ') === -1 && str.indexOf('_') === -1 && str.indexOf('@') !== -1) {
            return true;
        }
        return false;
    }

    isPassword(str) {
        let numbers = /[0-9]/g;
        let letters = /[a-z]/g;
        if(str.match(numbers) && str.match(letters)) {
            return true;
        }
        return false;
    }

    notes(str) {
        let letters = /[a-z]/g;
        if(str.match(letters)) {
            return true;
        }
        return false;
    }

    isOverEighteen(value) {
        if(value === true) {
            return true;
        }
        return false;
    }

    isDate(date) {
        let newDate = date.split('/');
        let day = parseInt(newDate[0]);
        let month = parseInt(newDate[1]);
        let year = parseInt(newDate[2]);
        if(month === 2 && day > 29 || month === 4 && day > 30 || month === 6 && day > 30 || month === 7 && day > 30 || month === 9 && day > 30 || month === 11 && day > 30) {
            return false;
        }
        return day >=1 &&
          day <=31 &&
          month >=1 &&
          month <= 12 &&
          year >= 1920 &&
          year <= 2030;
    }
}

class RegForm extends Form {
    constructor(name, email, birthdate, creationDate, notes, overEighteen) {
        super();
        this.name = name;
        this.email = email;
        this.birthdate = birthdate;
        this.creationDate = creationDate;
        this.notes = notes;
        this.overEighteen = overEighteen;
    }
    validate() {
        return this.isName(this.name) && 
        this.minLength(this.password, 2) && 
        this.maxLength(this.password, 16) && 
        this.isEmail(this.email) && 
        this.isDate(this.birthdate) && 
        this.isOverEighteen(this.overEighteen)
    }
}

function validation(name, email, birthdate, creationDate, notes, overEighteen) {
    let newCustomer = new RegForm(name, email, birthdate, creationDate, notes, overEighteen);
    return newCustomer.validate();
}


module.exports = validation;
