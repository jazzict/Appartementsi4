class Appartements{
    
    constructor(description, streetaddress, postalcode, city, userid){
        this.description = this.validate(description),
        this.streetaddress = this.validate(streetaddress),
        this.postalcode = this.validate(postalcode),
        this.city = this.validate(city),
        this.userid = this.validate(userid)
    }

      // Uitbreiden!
    validate(item) {
        return item;
    }

}

module.exports = Appartements