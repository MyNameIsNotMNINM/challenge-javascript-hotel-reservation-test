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

}
module.exports = HotelRequest