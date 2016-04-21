"use strict"

/**
 * {
 *			id: 1,
 *			name: "a brick",
 *			dimension: {
 *				top: 10,
 *				left: 20,
 *				width: 0.50,
 *				height: 0.50,
 *			},
 *			zIndex: 1000,
 *			styles: {
 *				"backgroundColor": "rgba(240, 240, 240, 0.9)"
 *			},
 *			classNames: [ 'aClass', 'bClass' ]
 *		}
 */

import React from "react"

require("./style.css");

/**
 * ES6 Class Delcaration - equals to React.createClass
 */
class Brick extends React.Component {
  constructor(props){   //Equals to getInitialState
      super(props);
      this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentDidMount(){
    var self = this;
  }

  handleDoubleClick(e) {
    e.preventDefault();

    if(e.target.className !== e.currentTarget.className){
      return;
    }

    //set mask over current brick;
    var left = e.currentTarget.offsetLeft;
    var top = e.currentTarget.offsetTop;
    var width = e.currentTarget.offsetWidth;
    var height = e.currentTarget.offsetHeight;

    var position = {
      left: left,
      top: top,
      width: width,
      height: height
    };

    this.props.onBrickClick(e, position);
  }

  componentWillUpdate(nextProps, nextState) {
    var moveToBrickPosition = nextProps.moveToBrickPosition;
    if(moveToBrickPosition){
      $(this.refs.aivicsBrick).css(moveToBrickPosition);
    }
  }

  render() {
    return (
      <div ref="aivicsBrick"
          className="aivics-brick"
          onDoubleClick={this.handleDoubleClick} >
      </div>
    )
  }
}

module.exports = Brick;
