var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');

chai.should();

chai.use(chaiHttp);

describe('Appartments', () => {

    it('Create new appartment and post', function (done) {
        chai.request(server)
            .post('/api/appartments')
            .set('Content-Type', 'application/json')
            .send({
                "emailaddress" : "jazz@gmail.com",
                "firstname" : "test",
                "password" : "test",
                "lastname": "test",
                "streetaddress": "test",
                "postalcode": "test",
                "city": "test",
                "phonenumber": "test",
                "dataofbirth": "test"            
            })
            .end(function(err, res, body) {
                res.should.have.status(200);
                done()
            })
    });

    it('Create new appartment and post', function (done) {
        chai.request(server)
            .post('/auth/appartments')
            .set('content-type', 'application/json')
            .send({
                "emailaddress" : "jazz@gmail.com",
                "firstname" : "test",
                "password" : "test",
                "lastname": "test",
                "streetaddress": "test",
                "postalcode": "test"             
            })
            .end(function(err, res, body) {
                res.should.have.status(500);
                done()
            })
    });
  
});