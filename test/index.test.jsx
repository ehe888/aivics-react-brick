"use strict"

var React = require('react');
var ReactDom = require('react-dom');
var $ = require("jquery");
require("jquery-ui");
var should  = require('chai').should;
var expect  = require('chai').expect;
var TestUtils = require('react-addons-test-utils');

var BrickFactory = require("../lib");


describe("Brick Factory", function(){
  it("should has Brick classe as property", function(){
    var Brick = BrickFactory.Brick;
    console.log(Brick.prototype)
    expect(Brick).to.exist;
  });

  it("should has produce Brick classe", function(){
    var Brick = BrickFactory.produce("Brick");
    console.log(Brick.prototype)
    expect(Brick).to.exist;
  });
});
