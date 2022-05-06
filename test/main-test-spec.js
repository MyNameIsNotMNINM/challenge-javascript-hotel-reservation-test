'use strict'

const chai = require('chai')
const expect = chai.expect
const hotels = require('../src/main')
const isWeekDay = hotels.isWeekDay 
const countWeekDays = hotels.countWeekDays 

describe('test', function () {
    it('isWeekDay_sunday_false', function () {
        expect(isWeekDay("15Mar2009(sun)")).to.equal(false);
    });
    it('isWeekDay_monday_true', function () {
        expect(isWeekDay("16Mar2009(mon)")).to.equal(true);
    });

    it('countWeekDays_5_5', function () {
        expect(countWeekDays(["16Mar2009(mon)", "17Mar2009(tue)", "18Mar2009(wed)", "19Mar2009(thu)", "20Mar2009(fri)"])).to.equal(5);
    });
    it('countWeekDays_0_0', function () {
        expect(countWeekDays(["15Mar2009(sun)", "01May2022(sun)", "25Jun2022(sat)", "17June2023(sat)", "05Nov2023(sun)"])).to.equal(0);
        expect(countWeekDays([])).to.equal(0);
    });

    it('getHotelCost should return 800', function () {
        expect(getHotelCost("Lakewood", {type:"Regular", weekdays: 5, weekends: 5})).to.equal(800);
    });

    it('getHotelCost should return 0', function () {
        expect(getHotelCost("Lakewood", {type:"Rewards", weekdays: 0, weekends: 0})).to.equal(0);
        expect(getHotelCost("Lakewood", {type:"Regular", weekdays: 0, weekends: 0})).to.equal(0);

        expect(getHotelCost("Bridgewood", {type:"Rewards", weekdays: 0, weekends: 0})).to.equal(0);
        expect(getHotelCost("Bridgewood", {type:"Regular", weekdays: 0, weekends: 0})).to.equal(0);

        expect(getHotelCost("Ridgewood", {type:"Rewards", weekdays: 0, weekends: 0})).to.equal(0);
        expect(getHotelCost("Ridgewood", {type:"Regular", weekdays: 0, weekends: 0})).to.equal(0);
    });

    



})