const express = require('express')
const router = express.Router()
const {
    getGamesFromDate,
    getStatsFromGameID,
    getSGRFromPlayer
} = require('../controllers/gamesController')



//GET games for a certain date
router.get('/:date', getGamesFromDate)

//GET games for
router.get('/game/:gameID', getStatsFromGameID)

router.post('/getSGRFromPlayer', getSGRFromPlayer)

module.exports = router