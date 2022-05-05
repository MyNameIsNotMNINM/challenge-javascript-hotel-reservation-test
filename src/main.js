function getFirstLetterOfWeekDay(day){
    return day[day.length-4];
}

function isWeekDay(day){
    // It is faster but very input dependant. 
    // If the input is ever not of type "<date?>(<3_digit_weekday>)" it shouldn't work.
    // As it wasn't warned that the date type could be different from the examples and tests, I'll assume it doesn't change.
    return getFirstLetterOfWeekDay(day) != 's'
}



function getCheapestHotel (input) { //DO NOT change the function's name.
    return "Cheapest hotel name"
}

exports.getCheapestHotel = getCheapestHotel
exports.isWeekDay = isWeekDay
