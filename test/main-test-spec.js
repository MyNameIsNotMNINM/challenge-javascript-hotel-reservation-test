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
        expect(hotelRequest).to.eql({costumerType: "Regular", days: ["16Mar2001110(mon)"]})

        hotelRequest = HOTEL.parseInput("Rewards: 22Mar2009(sun)")
        expect(hotelRequest).to.eql({costumerType: "Rewards", days: ["22Mar2009(sun)"]})
    });
    

    it('multiple dates should parse correctly', function () {
        let hotelRequest = HOTEL.parseInput("Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)")
        expect(hotelRequest).to.eql({costumerType: "Regular", days: ["16Mar2009(mon)", "17Mar2009(tues)", "18Mar2009(wed)"]})

        hotelRequest = HOTEL.parseInput("Rewards: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)")
        expect(hotelRequest).to.eql({costumerType: "Rewards", days: ["26Mar2009(thur)", "27Mar2009(fri)", "28Mar2009(sat)"]})
    });

})

describe('getAllPricesFromAllHotels test', function () {
    it('no weekends should return correct prices', function () {
        let hotelData = HOTEL.fetchHotels()
        let hotelRequest = HOTEL.parseInput("Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)")
        let hotelPrices = HOTEL.getAllPricesFromAllHotels(hotelData, hotelRequest)
        //regular
        expect(hotelPrices).to.eql([
            {hotel: "Lakewood", stars: 3, cost: HotelData.hotels[0].prices.weekDay.regular * 3 },
            {hotel: "Bridgewood", stars: 4, cost: HotelData.hotels[1].prices.weekDay.regular * 3 },
            {hotel: "Ridgewood", stars: 5, cost: HotelData.hotels[2].prices.weekDay.regular * 3 },
        ])

        hotelRequest = HOTEL.parseInput("Rewards: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)")
        hotelPrices = HOTEL.getAllPricesFromAllHotels(hotelData, hotelRequest)
        //rewards
        expect(hotelPrices).to.eql([
            {hotel: "Lakewood", stars: 3, cost: HotelData.hotels[0].prices.weekDay.rewards * 3 },
            {hotel: "Bridgewood", stars: 4, cost: HotelData.hotels[1].prices.weekDay.rewards * 3 },
            {hotel: "Ridgewood", stars: 5, cost: HotelData.hotels[2].prices.weekDay.rewards * 3 },
        ])
    });
    
    it('no weekdays should return correct prices', function () {
        let hotelData = HOTEL.fetchHotels()
        let hotelRequest = HOTEL.parseInput("Regular: 21Mar2009(sat), 22Mar2009(sun), 28Mar2009(sat)")
        let hotelPrices = HOTEL.getAllPricesFromAllHotels(hotelData, hotelRequest)
        //regular
        expect(hotelPrices).to.eql([
            {hotel: "Lakewood", stars: 3, cost: HotelData.hotels[0].prices.weekend.regular * 3 },
            {hotel: "Bridgewood", stars: 4, cost: HotelData.hotels[1].prices.weekend.regular * 3 },
            {hotel: "Ridgewood", stars: 5, cost: HotelData.hotels[2].prices.weekend.regular * 3 },
        ])

        hotelRequest = HOTEL.parseInput("Rewards: 21Mar2009(sat), 22Mar2009(sun), 28Mar2009(sat)")
        hotelPrices = HOTEL.getAllPricesFromAllHotels(hotelData, hotelRequest)
        //rewards
        expect(hotelPrices).to.eql([
            {hotel: "Lakewood", stars: 3, cost: HotelData.hotels[0].prices.weekend.rewards * 3 },
            {hotel: "Bridgewood", stars: 4, cost: HotelData.hotels[1].prices.weekend.rewards * 3 },
            {hotel: "Ridgewood", stars: 5, cost: HotelData.hotels[2].prices.weekend.rewards * 3 },
        ])
    });

    it('should return correct prices', function () {
        let hotelData = HOTEL.fetchHotels()
        let hotelRequest = HOTEL.parseInput("Regular: 21Mar2009(sat), 16Mar2009(mon), 28Mar2009(sat)")
        let hotelPrices = HOTEL.getAllPricesFromAllHotels(hotelData, hotelRequest)
        //regular
        expect(hotelPrices).to.eql([
            {hotel: "Lakewood", stars: 3, cost: HotelData.hotels[0].prices.weekend.regular * 2 + HotelData.hotels[0].prices.weekDay.regular  },
            {hotel: "Bridgewood", stars: 4, cost: HotelData.hotels[1].prices.weekend.regular * 2 + HotelData.hotels[1].prices.weekDay.regular  },
            {hotel: "Ridgewood", stars: 5, cost: HotelData.hotels[2].prices.weekend.regular * 2 + HotelData.hotels[2].prices.weekDay.regular  },
        ])

        hotelRequest = HOTEL.parseInput("Rewards: 21Mar2009(sat), 16Mar2009(mon), 28Mar2009(sat)")
        hotelPrices = HOTEL.getAllPricesFromAllHotels(hotelData, hotelRequest)
        //rewards
        expect(hotelPrices).to.eql([
            {hotel: "Lakewood", stars: 3, cost: HotelData.hotels[0].prices.weekend.rewards * 2 + HotelData.hotels[0].prices.weekDay.rewards  },
            {hotel: "Bridgewood", stars: 4, cost: HotelData.hotels[1].prices.weekend.rewards * 2 + HotelData.hotels[1].prices.weekDay.rewards  },
            {hotel: "Ridgewood", stars: 5, cost: HotelData.hotels[2].prices.weekend.rewards * 2 + HotelData.hotels[2].prices.weekDay.rewards  },
        ])
    });
})