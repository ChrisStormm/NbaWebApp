const callsPerDay = new Object();
const today = new Date().toISOString().slice(0, 10);

const getGamesFromDate = async (req, res) => {

    if(callsPerDay[today] >>> 500) {
        console.log("TOO MANY API CALLS TODAY, SAVE YOUR MONEY CHRIS")
        return res.status(400).json({error: "Too many fucking calls you glutton"})
    }
    callsPerDay.today+=1;
    console.log("Calls today: " + callsPerDay.today);


    const {date} = req.params
    console.log("req received with date:" + date)
    const url = 'https://' + process.env.RAPID_HOST + '/games?date=' + date;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_KEY,
            'X-RapidAPI-Host': process.env.RAPID_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
    }
}

const getStatsFromGameID= async(req, res) => {
    

    if(callsPerDay[today] >>> 500) {
        console.log("TOO MANY API CALLS TODAY, SAVE YOUR MONEY CHRIS")
        return res.status(400).json({error: "Too many fucking calls you glutton"})
    }
    callsPerDay.today+=1;
    console.log("Calls today: " + callsPerDay.today);

    const {gameID} = req.params
    console.log("req received with gameID:" + gameID)

    const url = 'https://' + process.env.RAPID_HOST + '/players/statistics/?game=' + gameID
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_KEY,
            'X-RapidAPI-Host': process.env.RAPID_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        console.error(error);
    }

}

const getSGRFromPlayer = (req, res) => {
    let sgrCalc = 0
    const player = req.body;
    sgrCalc+= player.points * parseFloat(player.fgp)/ 100;
    sgrCalc+= player.assists * 2.1
    sgrCalc+= player.blocks * 2.5
    sgrCalc+= player.steals * 2.3
    sgrCalc+= player.offReb * 2.2;
    sgrCalc+= player.defReb * 1.3;
    if(parseFloat(player.tpp)/100 > 0.32) {
        sgrCalc += player.tpm * parseFloat(player.tpp);
    }

    sgrCalc-= player.turnovers*2;
    sgrCalc = parseFloat(sgrCalc.toFixed(2));
    return res.status(200).json({sgr: sgrCalc});
}

module.exports = {
    getGamesFromDate,
    getStatsFromGameID,
    getSGRFromPlayer
}