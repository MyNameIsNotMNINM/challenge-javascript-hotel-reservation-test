'use strict'

const chai = require('chai')
const expect = chai.expect
const hotels = require('../src/main')
const isWeekDay = hotels.isWeekDay 

describe('test', function () {
  it('isWeekDay_saturday_false', function () {
    expect(getCheapestHotel("15Mar2009(sun)")).to.equal("Lakewood");
  });
  it('isWeekDay_monday_true', function () {
    expect(isWeekDay("16Mar2009(mon)")).to.equal(true);
  });
})