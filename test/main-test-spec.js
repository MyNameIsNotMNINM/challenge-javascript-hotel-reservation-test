'use strict'

const chai = require('chai')
const expect = chai.expect
const hotels = require('../src/main')
const isWeekDay = hotels.isWeekDay 

describe('test', function () {
    it('isWeekDay_sunday_false', function () {
        expect(isWeekDay("15Mar2009(sun)")).to.equal(false);
    });
    it('isWeekDay_monday_true', function () {
        expect(isWeekDay("16Mar2009(mon)")).to.equal(true);
    });

    it('countWeekends_0_0', function () {
        expect(countWeekends(["16Mar2009(mon)", "17Mar2009(tue)", "18Mar2009(wed)", "19Mar2009(thu)", "20Mar2009(fri)"])).to.equal(true);
    });
    it('countWeekends_5_5', function () {
        expect(countWeekends(["15Mar2009(sun)", "01May2022(sun)", "25Jun2022(sat)", "17June2023(sat)", "05Nov2023(sun)"])).to.equal(true);
    });
})