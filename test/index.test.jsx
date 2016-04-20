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


describe("Brick Setting Factory", function(){
  it("should has BaseBrickSettingPanel classe as property", function(){
    var Base = Brick.settings.Base;
    console.log(Base.prototype)
    expect(Base).to.exist;
  });

  it("should has setting method to get BaseBrickSettingPanel", function(){
    var Base = Brick.setting("Base");
    console.log(Base.prototype)
    expect(Base).to.exist;
  });

  it("should has handleWidthChange method", function(){
    var Base = Brick.settings.Base;
    expect(Base.prototype.handleWidthChange).to.exist;

  });
});
