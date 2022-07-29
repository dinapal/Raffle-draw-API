const ticketCollection = require('./tickets');

// Ticket Selling Controllers

exports.sellSingleTicket = (req,res, next) =>{
    const {username, price} = req.body;
    const ticket = ticketCollection.create(username, price)
    res.status(201).json({
        message: "Ticket Created Successfully",
        ticket,
    });;
}

exports.sellBulkTicket = (req, res, next) =>{
    const { username, price, quantity} = req.body
    const tickets = ticketCollection.createBulk(username, price, quantity);
    res.status(201).json({
        message: 'Ticket Created Successfully',
        tickets,
    })
}

// Find Tickets Controllers

exports.findAll = (req, res) =>{
    const tickets = ticketCollection.find()
    console.log(tickets);
    res.status(200).json({items: tickets, total: tickets.length});
}

exports.findById = (req, res) =>{
    const id = req.params.id
    const ticket = ticketCollection.findTicketById(id);
    if(!ticket){
        return res.status(404).json({message: '404 not found!'})
    }
   res.status(200).json(ticket)
}

exports.findByUsername = (req, res) =>{
    const username = req.params.username;
    const tickets = ticketCollection.findByUsername(username)
    res.status(200).json({items: tickets, total: tickets.length});
}


// Update Controller

exports.updateById = (req, res) =>{
    const id = req.params.id;
    const  ticket = ticketCollection.updateById(id, req.body);
    if(!ticket){
        return res.status(404).json({message: '404 not found!'})
    }
   res.status(200).json(ticket)
}

exports.updateByUsername = (req, res) => {
    const username = req.params.username;
    const tickets = ticketCollection.updateBulk(username, req.body)
    console.log(tickets);
    res.status(200).json({items: tickets, total: tickets.length});
}

// Delete Controller 

exports.deleteById = (req,res) =>{
    const id = req.params.id;
    const username = req.params.username;
    const isTicketDeleted = ticketCollection.deleteByID(id);
    if(isTicketDeleted) {
        res.status(204).json({message: username + "Deleted  Item Successfully"})
    }
    res.status(404).json({message: 'Deleted Operation Failed!'});
}

exports.deleteByUsername = (req, res) =>{
    const username = req.params.username;
    ticketCollection.deleteBulk(username, req.body);
    res.status(204).send()
}

// Draw Controller

exports.drawWinner = (req, res) =>{
    const wc = req.query.wc ?? 3
    const winners = ticketCollection.draw(wc)
    res.status(200).json(winners);
}