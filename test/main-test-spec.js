'use strict'

const chai = require('chai')
const { default: Hotel } = require('../src/hotel')
const expect = chai.expect
const HotelData = require("./data/hotelData.json")
const hotels = require('../src/main')
const isWeekDay = hotels.isWeekDay 
const countWeekDays = hotels.countWeekDays 

describe('isWeekDay test', function () {
    
    it('isWeekDay_sunday_false', function () {
        expect(isWeekDay("15Mar2009(sun)")).to.equal(false);
    });
    it('isWeekDay_monday_true', function () {
        expect(isWeekDay("16Mar2009(mon)")).to.equal(true);
    });

})

describe('countWeekDays test', function () {
    it('countWeekDays_5_5', function () {
        expect(countWeekDays(["16Mar2009(mon)", "17Mar2009(tue)", "18Mar2009(wed)", "19Mar2009(thu)", "20Mar2009(fri)"])).to.equal(5);
    });
    it('countWeekDays_0_0', function () {
        expect(countWeekDays(["15Mar2009(sun)", "01May2022(sun)", "25Jun2022(sat)", "17June2023(sat)", "05Nov2023(sun)"])).to.equal(0);
        expect(countWeekDays([])).to.equal(0);
    });
})

describe('Hotel test', function () {
    let hotels = {};
    HotelData.hotels.forEach(element => {
            hotels[element.name] = new Hotel(element.name, element.prices)
    });

    it('getHotelCost on Lakewood Rewards for 10 days should return 800', function () {
        expect(hotels['Lakewood'].getHotelCost("Rewards", 5, 5)).to.equal(800);
    });

    it('getHotelCost for 0 days should return 0', function () {
        expect(hotels['Lakewood'].getHotelCost("Rewards", 0, 0)).to.equal(0);
        expect(hotels['Lakewood'].getHotelCost("Regular", 0, 0)).to.equal(0);

        expect(hotels['Bridgewood'].getHotelCost("Rewards", 0, 0)).to.equal(0);
        expect(hotels['Bridgewood'].getHotelCost("Regular", 0, 0)).to.equal(0);

        expect(hotels['Ridgewood'].getHotelCost("Rewards", 0, 0)).to.equal(0);
        expect(hotels['Ridgewood'].getHotelCost("Regular", 0, 0)).to.equal(0);
    });
})