'use strict'

const chai = require('chai')
const HotelRequest = require('../src/hotelRequest')
const Hotel = require('../src/hotel')
const expect = chai.expect
const HotelData = require("../src/data/hotelData.json")
const HOTEL = require('../src/main')

describe('isWeekDay test', function () {
    
    it('isWeekDay_sunday_false', function () {
        expect(HOTEL.isWeekDay("15Mar2009(sun)")).to.equal(false);
    });
    it('isWeekDay_monday_true', function () {
        expect(HOTEL.isWeekDay("16Mar2009(mon)")).to.equal(true);
    });

})

describe('countWeekDays test', function () {
    it('countWeekDays_5_5', function () {
        expect(HOTEL.countWeekDays(["16Mar2009(mon)", "17Mar2009(tue)", "18Mar2009(wed)", "19Mar2009(thu)", "20Mar2009(fri)"])).to.equal(5);
    });
    it('countWeekDays_0_0', function () {
        expect(HOTEL.countWeekDays(["15Mar2009(sun)", "01May2022(sun)", "25Jun2022(sat)", "17June2023(sat)", "05Nov2023(sun)"])).to.equal(0);
        expect(HOTEL.countWeekDays([])).to.equal(0);
    });
})

describe('Hotel test', function () {
    let hotels = new Map();
    HotelData.hotels.forEach(element => {
            hotels.set(element.name, new Hotel(element.name, element.prices, element.stars))
    });

    it('getCost on Lakewood Rewards for 10 days should return 800', function () {
        expect(hotels.get('Lakewood').getCost("Rewards", 5, 5)).to.equal(800);
    });

    it('getCost for 0 days should return 0', function () {
        expect(hotels.get('Lakewood').getCost("Rewards", 0, 0)).to.equal(0);
        expect(hotels.get('Lakewood').getCost("Regular", 0, 0)).to.equal(0);

        expect(hotels.get('Bridgewood').getCost("Rewards", 0, 0)).to.equal(0);
        expect(hotels.get('Bridgewood').getCost("Regular", 0, 0)).to.equal(0);

        expect(hotels.get('Ridgewood').getCost("Rewards", 0, 0)).to.equal(0);
        expect(hotels.get('Ridgewood').getCost("Regular", 0, 0)).to.equal(0);
    });
})

describe('parseInput test', function () {
    it('1 date should parse correctly', function () {
        let hotelRequest = HOTEL.parseInput("Regular: 16Mar2001110(mon)")
        expect(hotelRequest.costumerType).to.equal("Regular")
        expect(hotelRequest.days).to.deep.equal(["16Mar2001110(mon)"])

        hotelRequest = HOTEL.parseInput("Rewards: 22Mar2009(sun)")
        expect(hotelRequest.costumerType).to.equal("Rewards")
        expect(hotelRequest.days).to.deep.equal(["22Mar2009(sun)"])
    });
    

    it('multiple dates should parse correctly', function () {
        let hotelRequest = HOTEL.parseInput("Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)")
        expect(hotelRequest.costumerType).to.equal("Regular")
        expect(hotelRequest.days).to.deep.equal(["16Mar2009(mon)", "17Mar2009(tues)", "18Mar2009(wed)"])

        hotelRequest = HOTEL.parseInput("Rewards: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)")
        expect(hotelRequest.costumerType).to.equal("Rewards")
        expect(hotelRequest.days).to.deep.equal(["26Mar2009(thur)", "27Mar2009(fri)", "28Mar2009(sat)"])


    });

})