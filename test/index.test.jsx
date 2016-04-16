"use strict"

var React = require('react');
var ReactDom = require('react-dom');
var $ = require("jquery");
require("jquery-ui");
var should  = require('chai').should;
var expect  = require('chai').expect;
var TestUtils = require('react-addons-test-utils');

var Brick = require("../src");


describe("Brick Factory", function(){
  it("should has Brick classe as property", function(){
    var Base = Brick.Base;
    console.log(Base.prototype)
    expect(Base).to.exist;
  });

  it("should has produce Brick classe", function(){
    var Base = Brick.produce("Base");
    console.log(Base.prototype)
    expect(Base).to.exist;
  });
});
