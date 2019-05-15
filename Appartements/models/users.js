class User {
  constructor(email, password, firstname, lastname, streetaddress, postalcode, city, dataofbirth, phonenumber) {
      this.email = this.validateEmail(email),
      this.password = this.validatePassword(password),
      this.firstname = firstname,
      this.lastname = lastname,
      this.streetaddress = streetaddress,
      this.postalcode = his.validatePostalCode(postalcode),
      this.city = city, 
      this.dataofbirth = dataofbirth, 
      this.phonenumber = this.validatePhonenumber(phonenumber)

  }

  validatePostalCode(postalcode) {
    let regex = new RegExp("/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/")
    if(regex.test(postalcode)){
        return postalcode
    }else{
        throw new Error("Invalid PostalCode: " + postalcode);
    }
  }

  validateEmail(email){
      let regex = new RegExp("/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/")
      if(regex.test(email)){
          return email
      }else{
          throw new Error("Invalid EmailAddress: " + email)
      }
  }
  validatePhonenumber(phonenumber){
      let regex = new RegExp("/^(((0)[1-9]{2}[0-9][-]?[1-9][0-9]{5})|((\\+31|0|0031)[1-9][0-9][-]?[1-9][0-9]{6}))$/")
      let regex2 = new RegExp("/^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/")
      if(regex.test(phonenumber)){
          return phonenumber;
      }else{
          if(regex2.test(phonenumber)){
              return phonenumber;
          }else{
              throw new Error("Invalid PhoneNumber: " + phonenumber)
          }
      }
  }
  
  validatePassword(password) {
    return password;
  }

  validateUsername(username) {
    let regex = new RegExp("^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$");
    if (regex.test(username)) {
      return username;
    } else {
      throw new Error("Invalid Username: " + username);
    }
  }
}

module.exports = User;
