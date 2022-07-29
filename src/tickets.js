const Ticket = require('./Ticket');
const {readFile, writeFile } = require('./utils')


const tickets = Symbol('tickets')

class TicketsCollection{
    constructor(){
        (async function() {
            const data = await readFile()
            this[tickets] = data;
        }.call(this))

    }

    /**
     * Create and Save new ticket.
     * @param {string} username 
     * @param {number} price 
     * @returns {Ticket}
     */
    create(username, price){
        const ticket = new Ticket(username, price);
        this[tickets].push(ticket)
        writeFile(this[tickets])
        return ticket;
    }

    /**
     * 
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Ticket[]}
     */
    createBulk(username, price, quantity){
        const result = [];
        for(let i = 0; i < quantity; i++){
            const ticket = this.create(username, price)
            result.push(ticket)
        }
        writeFile(this[tickets])
        return result;
    }





    /**
     *  Find All Tickets
     * @returns {Tickets}
     */
    find(){
        return this[tickets]
    }

    /**
     * Find Single Ticket
     * @param {string} id
     * @returns {Ticket} 
     */
    findTicketById(id){
        const ticket = this[tickets].find(
        /**
         * @param {Ticket} ticket
         */
        (ticket)=> ticket.id === id
        )
        
        return ticket;
        
    }

    /**
     * @param {string} username
     * @returns {Tickets[]}
     */
    findByUsername(username){
        const userTickets = this[tickets].filter(
       /**
         * @param {Tickets} tickets
         */
        (ticket) => ticket.username === username
        )
        return userTickets;
    }

   /**
    * Update Ticket By ID
    * @param {string} ticketId 
    * @param {{username: string; price:number}} ticketBody 
    * @returns {Ticket}
    */
    updateById(ticketId, ticketBody){
        const ticket = this.findTicketById(ticketId);
        if(ticket){
            ticket.username = ticketBody.username ?? ticket.username
            ticket.price = ticketBody.price ?? ticket.price; 
        }
        writeFile(this[tickets])
        return ticket;
    }

    /**
     *  bulk update by username
     * @param {string} username 
     * @param {{username: string; price: number}} ticketBody 
     * @returns {Ticket[]}
     */
    updateBulk(username, ticketBody){
        const userTickets = this.findByUsername(username)
        const updatedTicket = userTickets.map(
            /**
             * @param {ticket} 
             */
            (ticket) => this.updateById(ticket.id, ticketBody)

        )
        writeFile(this[tickets])
        console.log(updatedTicket);
        return updatedTicket;
    }






    /**
     * Delete ticket by id
     * @param {string} ticketId 
     * @return {boolean}
     */
    deleteByID(ticketId){
        const index = this[tickets].findIndex(
            /**
             * @pram {Ticket} ticket
             * 
             */
            (ticket) => ticket.id === ticketId
        )
        if(index === -1){
            return false;
        }else{
            this[tickets].splice(index, 1);
            writeFile(this[tickets])
            return true;
        }
    }

    /**
     * Delete User
     * @param {string} username 
     * @return {boolean}
     */
    deleteBulk(username) {
        const userTickets = this.findByUsername(username)
        const deletedResult = userTickets.map(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => this.deleteByID(ticket.id)
        )
        writeFile(this[tickets])
        return deletedResult;
    }

    /**
     * 
     * @param {number} winnerCount 
     */
    draw(winnerCount){
        const winnerIndexes = new Array(winnerCount);

        let winderIndex = 0;

        while(winderIndex < winnerCount){
            let ticketIndex = Math.floor(Math.random() * this[tickets].length);
            if(!winnerIndexes.includes(ticketIndex)){
                winnerIndexes[winderIndex++] == ticketIndex;
                continue;
            }
        }
        const winners = winnerIndexes.map(
            /**
             * @param {number} index
             */
            (index) => this[tickets][index]
        );
        return winners;
    }
}

const ticketCollection = new TicketsCollection;

module.exports = ticketCollection;