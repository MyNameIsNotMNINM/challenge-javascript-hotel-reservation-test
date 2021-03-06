/** 
 *  As the challenge is in js it can't be typesafe except by the fact that the data is static. 
 *  anyway I'm going to define types and class so the code is more readable.
*/
class Hotel{
    /**
     * Hotel constructor
     * @type {{weekDay: {regular: number, rewards: number}, weekend:{regular: number,rewards: number}}} HotelPrices
     * @param {string} name
     * @param {HotelPrices} prices
     * @param {number} stars
     * @returns {Hotel}
    */
    constructor(name, prices, stars){
        this.name = name
        this.prices = prices
        this.stars = stars
    }

    /**
     * Get total cost of staying at this hotel for x week days and y weekend days
     * @param {string} costumerType
     * @param {number} weekDays
     * @param {number} weekends
     * @returns {number}
    */
    getCost(costumerType, weekDays, weekends){

        return (costumerType == "Rewards")?
            this.prices.weekDay.rewards * weekDays + this.prices.weekend.rewards * weekends:
            this.prices.weekDay.regular * weekDays + this.prices.weekend.regular * weekends
    }

}
module.exports = Hotel