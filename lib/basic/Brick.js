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

require("./css/brick.css")

/**
 * ES6 Class Delcaration - equals to React.createClass
 */
class Brick extends React.Component {
  constructor(props){   //Equals to getInitialState
      super(props);
  }

  componentDidMount(){
    var self = this;
     $( ".brick" ).draggable({
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
     });
  }

  render() {
    var data = this.props.data;
    var styles = data.styles;

    styles["zIndex"] = data["zIndex"];

    return (
      <div style={styles} className="aivics-brick">
        This is a basic brick!
      </div>
    )
  }
}

module.exports = Brick;
