class Appartments{
    
    constructor(description, streetaddress, postalcode, city, userid){
       this.description = description,
       this.streetaddress = streetaddress,
       this.postalcode = this.validatePostalCode(postalcode),
       this.city = city,
       this.userid = userid
    }

    validatePostalCode(postalcode) {
    let regex = new RegExp("/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/")
    if(regex.test(postalcode)){
        return postalcode
    }else{
        throw new Error("Invalid PostalCode: " + postalcode);
    }
  }

}

module.exports = Appartments