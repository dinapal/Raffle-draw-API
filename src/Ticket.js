const shortid = require('shortid')

class Ticket{

    /**
     * Ticket constructor will get user name and price
     * @param {string} username 
     * @param {number} price 
     */
    constructor(username, price){
        this.id = shortid.generate();
        this.username = username;
        this.price = price;
        this.createAt = new Date();
        this.updatedAt = new Date();
    }

}

module.exports = Ticket;