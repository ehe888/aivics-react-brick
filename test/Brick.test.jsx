/**
 * Test Case to Brick.js
 */
"use strict"

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");
require("jquery-ui");
var should  = require('chai').should;
var expect  = require('chai').expect;
var TestUtils = require('react-addons-test-utils');

var Brick = require("../lib/basic/Brick");

var data = {
    id: 1,
    name: "a brick",
    dimension: {
      top: 10,
      left: 20,
      width: 0.50,
      height: 0.50,
    },
    "zIndex": 100,
    styles: {
      "backgroundColor": "rgba(240, 240, 240, 0.9)",
      "width": "50%",
      "height": "200px"
    },
    classNames: [ 'aClass', 'bClass' ]
};

describe("Brick", function(){
  it("should render a basic brick", function(){
    var component = TestUtils.renderIntoDocument(
      <Brick data={data} />
    );
    var node = TestUtils.findRenderedDOMComponentWithClass( component, "aivics-brick" );
    //var text = "This is a basic brick!"

    expect(TestUtils.isDOMComponent(node)).to.be.true;

    var nodeElement = ReactDOM.findDOMNode(node);

    expect(nodeElement.innerHTML).to.equal("This is a basic brick!");

  });
});
