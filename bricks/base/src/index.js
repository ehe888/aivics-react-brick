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

      this.refName = "aivicsBrick"; //Class constant used to referece this component
      this.dataStorage = this.props.dataStorage;
      this.model = this.dataStorage.model("Bricks");
      this.handleOverlayClick = this.handleOverlayClick.bind(this);
      this.reload = this.reload.bind(this);
      this.getDOMElement = this.getDOMElement.bind(this);
  }

  //Use data to update view settings, TODO: implement as a delegate method
  reload(data){
    $(this.getDOMElement()).css(data.dimension)
              .css(data);

  }

  //shorthand to get DOMElement
  getDOMElement(){
    return this.refs[this.refName];
  }

  componentDidMount(){
    var record = this.model.find({ id: this.props.id });
    this.reload(record);
  }

  handleOverlayClick(e) {
    e.preventDefault();
    if(e.target.className !== e.currentTarget.className){
      return;
    }

    var $this = $(this.getDOMElement());

    //set mask over current brick;
    var left = $this.position().left;
    var top = $this.position().top;
    var width = $this.width();
    var height = $this.height();

    var position = {
      left: left,
      top: top,
      width: width,
      height: height
    };

    this.props.onBrickSelect(e, this.props.id, position);
  }

  componentDidUpdate(prevProps, prevState) {
    // var moveToBrickPosition = this.props.moveToBrickPosition;
    // if(moveToBrickPosition){
    //
    // }
    //Important -> Here we will update Local Data Storage
    var record = this.model.find({ id: this.props.id });
    // var self = this;
    // _.merge(record, { dimension: moveToBrickPosition } );
    // console.log({ record: record });
    // this.model.upsert(record);
    this.reload(record);
  }


  render() {

    var subContent = "";
    if(this.props.renderContent){
      subContent = this.props.renderContent();
    }

    return (
      <div id={this.props.id}
          ref={this.refName}
          className="aivics-brick" >
          <div ref="brickContentWrapper"
              className="aivics-brick-content-wrapper">
            {subContent}
          </div>
          <div ref="brickContentOverlay"
              className="aivics-brick-content-overlay"
              onClick={this.handleOverlayClick} >
          </div>
      </div>
    )
  }
}



module.exports = Brick;
