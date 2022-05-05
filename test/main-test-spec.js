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
})