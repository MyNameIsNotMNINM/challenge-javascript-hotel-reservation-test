const HotelData = require("./data/hotelData.json")
const Hotel = require('./hotel')
const HotelRequest = require('./hotelRequest')


/**
 * count the amount of weekdays in an array of dates
 * @param {string} day
 * @returns {string}
*/
function getFirstLetterOfWeekDay(day){
    return day[day.length-4]
}

/**
 * determines if day is weekday
 * It is a fast way of doing it but very input dependant, If the input is ever not a string 
 * of type "<date?>(<3_digit_weekday>)" it shouldn't work.
 * @param {string} day
 * @returns {boolean}
*/
function isWeekDay(day){
    return getFirstLetterOfWeekDay(day) != 's'
}

/**
 * count the amount of weekdays in an array of dates
 * @param {string[]} days
 * @returns {number}
*/
function countWeekDays(days){
    let weekDays = 0
    days.forEach(day =>{
        if(isWeekDay(day))
            weekDays++
    })
    return weekDays
}
/**
 * returns a Map with every hotel imported from hotelData.json as a Hotel Class  
 * @returns { Map<string, Hotel> }
*/
function fetchHotels(){
    let hotels = new Map();
    HotelData.hotels.forEach(element => {
            hotels.set(element.name, new Hotel(element.name, element.prices, element.stars))
    });
    return hotels;
}

/**
 * returns an array with all the prices calculated, hotel's name and review
 * @param { Map<string, Hotel> } hotels
 * @param {HotelRequest} hotelRequest
 * @returns {  { hotel: string, stars: number, cost: number}[] }
*/
function getAllPricesFromAllHotels(hotels, hotelRequest){
    let weekdayCount = countWeekDays(hotelRequest.days)
    let weekendCount = hotelRequest.days.length - weekdayCount //refactor this line
    let results = []
    hotels.forEach((hotel, hotelName) =>{
        results.push(
            {
                hotel: hotelName,
                stars: hotel.stars,
                cost: hotel.getCost(hotelRequest.costumerType, weekdayCount, weekendCount)
            });
    })
    return results
}

/**
 * returns the best hotel from a list of objects containing prices calculated, hotel's name and review
 * @param {  { hotel: string, stars: number, cost: number}[] } hotels
 * @returns string
*/
function getBestHotelFromList(hotels){
    let sortedList = hotels.sort((a,b)=>{
        return a.cost - b.cost || b.stars - a.stars
    })

    return sortedList[0].hotel
}

/**
 * finds the cheapest hotel given a string with costumer status and the days they will be staying 
 * @param {string} input
 * @returns {string}
*/
function getCheapestHotel (input) { //DO NOT change the function's name.
    let hotelRequest = HotelRequest.parseInput(input)
    let hotels = fetchHotels()
    let calculatedprices = getAllPricesFromAllHotels(hotels, hotelRequest)
    return getBestHotelFromList(calculatedprices)
}

module.exports = {
    getCheapestHotel: getCheapestHotel,
    isWeekDay: isWeekDay,
    countWeekDays: countWeekDays,
    fetchHotels: fetchHotels,
    getAllPricesFromAllHotels: getAllPricesFromAllHotels,
    getBestHotelFromList: getBestHotelFromList,
};
