const Transaction = require('../../models/transactions')
const mongoose = require('mongoose')

module.exports = function(router) {

    router.get('/transaction/:year/:month', function(req, res) {
        const UserId = req.get('userId')

        // JS months are zero based
        const month = req.params.month - 1
        const year = req.params.year
        const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0))
        const endDate = new Date(Date.UTC(year, month, 1, 1, 0, 0, 0))
    
        const qry = {
            userId: userId,
            transactionDate: {
                $gte: startDate,
                $lt: endDate
            }
        }

        Transaction.find(qry)
        .sort({ 'transactionDate': 1 })
        .exec()
        .then(docs => res.status(200)
            .json(docs))
        .catch(err => res.status(500)
            .json({
                message: 'Error finding transaction for user',
                error: err
            }))
    })


    // Get transaction running balance for a specific user
    router.get('/transaction/balance/:year/:month', function(req, res){
        const userId = req.get('userId')
        const month = req.params.month - 1 // - JS months are zero-based
        const year = req.params.year
        const endDate = new Date(Date.UTC(year, month, 1))
        const pipeline = [
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId),
                }
            },
            {
                $match: {
                    transactionDate: { $lt: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    charges: { $sum: '$charge' },
                    deposits: { $sum: '$deposit' }
                }
            }
        ]

        Transaction.aggregate(pipeline).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding transactions for user',
                    error: err
                }))
    })


    // Create a new transaction document
    router.post('/transaction', function(req, res){
        let transaction = new Transaction(req.body)
        transaction.save(function(err, transaction){
            if(err) return console.log(err)
            res.status(200).json(transaction)
        })
    })

}