const HotelData = require("./data/hotelData.json")


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
 * finds the cheapest hotel given a string with costumer status and the days they will be staying 
 * @param {string} input
 * @returns {string}
*/
function getCheapestHotel (input) { //DO NOT change the function's name.
    return "Cheapest hotel name"
}


exports.getCheapestHotel = getCheapestHotel
exports.isWeekDay = isWeekDay
exports.countWeekDays = countWeekDays