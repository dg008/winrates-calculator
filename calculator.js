var arrayPromise = require('./arrayPromise');

/**
 * This function is responsible for calculating the winrates for a given
 * participant as well as stats against an optional opponent (secondParticipant)
 * 
 * Returns a promise
 */
const calculator = ({firstParticipant, secondParticipant, matchResults, matchResultEachMethodName = 'each'}) => {
    let numGamesWith1stParticipant = 0,
        numGamesWith2ndParticipant = 0,
        numGamesWonBy1stParticipant = 0,
        numGamesWonBy1stParticipantAgainst2ndParticipant = 0;

    const matchResultEachOperator = matchResult => {
        console.log('in each');
        if (matchResult.participants.includes(firstParticipant)) {
            numGamesWith1stParticipant++;
            if (matchResult.participants.includes(secondParticipant)) {
                numGamesWith2ndParticipant++;
                if (matchResult.winners.includes(firstParticipant)) {
                    numGamesWonBy1stParticipantAgainst2ndParticipant++;
                }
            }
            if (matchResult.winners.includes(firstParticipant)) {
                numGamesWonBy1stParticipant++;
            }
        }
    };

    const dataToOperateOn = Array.isArray(matchResults)
        ? arrayPromise(matchResults, matchResultEachOperator)
        : matchResults[matchResultEachMethodName](matchResultEachOperator);

    dataToOperateOn.then(() => {
        let overallWinRate = (numGamesWonBy1stParticipant/numGamesWith1stParticipant)*100;
        overallWinRate = isNaN(overallWinRate) ? NaN : overallWinRate;
        const overallLossRate = isNaN(overallWinRate) ? NaN : 100 - overallWinRate
    
        let specificWinRate = (numGamesWonBy1stParticipantAgainst2ndParticipant/numGamesWith2ndParticipant)*100;
        specificWinRate = isNaN(specificWinRate) ? NaN : specificWinRate;        
        const specificLossRate = isNaN(specificWinRate) ? NaN : 100 - specificWinRate;

        return {
            numGamesWith2ndParticipant,
            overallWinRate,
            overallLossRate,
            specificWinRate,
            specificLossRate,
        };
    });

    return Promise.resolve(dataToOperateOn);
}

module.exports = calculator;