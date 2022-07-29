const express = require('express')
const router = express.Router();

const { 
    sellBulkTicket, 
    sellSingleTicket, 
    findAll, 
    findById, 
    findByUsername, 
    updateById, 
    updateByUsername,
    deleteById,
    deleteByUsername,
    drawWinner
 } = require('./controllers');



router.route('/t/:id').get(findById).put(updateById).delete(deleteById);

router.route('/u/:username').get(findByUsername).put(updateByUsername).delete(deleteByUsername);
router.route('/').get(findAll).post(sellSingleTicket);

router.post('/bulk', sellBulkTicket)
router.get('/draw', drawWinner )

module.exports = router;