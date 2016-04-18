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
 *
 *			zIndex: 1000,
 *			styles: {
 *				"backgroundColor": "rgba(240, 240, 240, 0.9)"
 *			},
 *			classNames: [ 'aClass', 'bClass' ]
 *		}
 */

import React from "react"
import ReactDOM from "react-dom"
import Brick from "../../base/src/index.js"

require("./style.css");

/**
 * ES6 Class Delcaration - equals to React.createClass
 */
class ImageBrick extends Brick {
  constructor(props){   //Equals to getInitialState
      super(props);
  }

  componentDidMount(){
    // super.componentDidMount();
    var self = this,
        imageBrick = ReactDOM.findDOMNode(self);
     $(imageBrick).draggable({
       containment: "parent",
       refreshPositions: true,
       start: function(e, ui) {
         console.log(ui.position);
         $(this).css("z-index", 9999);
       },
       stop: function(e, ui){
         console.log(ui.position);
         $(this).css("z-index", self.props.data["zIndex"]);
       }
     }).resizable({
       helper: "ui-resizable-helper"
     });
  }

  render() {
    var data = this.props.data;
    var styles = data.styles;
    var src = data.src;

    styles["zIndex"] = data["zIndex"];

    return (
      <div style={styles} className="aivics-brick aivics-brick-image">
        <img src={src}/>
      </div>
    )
  }
}

module.exports = ImageBrick;
