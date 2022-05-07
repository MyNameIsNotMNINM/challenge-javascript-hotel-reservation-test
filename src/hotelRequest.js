/** 
 *   HotelRequest is a parameter class.
 *   See my reasoning: https://refactoring.guru/smells/long-parameter-list
*/
class HotelRequest{
    /**
     * HotelRequest constructor
     * @param {string} costumerType
     * @param {string[]} days
    */
    constructor(costumerType, days){
        this.costumerType = costumerType
        this.days = days
    }
    /**
     * Parse the input string to a HotelRequest
     * @param {string} input
     * @returns {HotelRequest}
    */
    static parse(input){
        let splitInput = input.replace(/:|,/g, '').split(' ')
        let costumerType = splitInput.shift()
        let dates = splitInput
        return new HotelRequest(costumerType, dates)
    }

}
module.exports = HotelRequest