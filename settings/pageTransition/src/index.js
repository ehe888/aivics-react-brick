"use strict"

require('./css/style.css')

import React from "react"

class PageTransition extends React.Component {

  constructor(prop){
    super(prop);

    this.refName = "PageTransitionPanel";
    this.dataStorage = this.props.dataStorage;
    this.model = this.dataStorage.model("Transitions");

    this.getDOMElement = function(){
      return this.refs[this.refName];
    }

  }

  render() {
    return (
      <div ref="PageTransitionPanel" className="aivics-page-transition-panel">
        Transitions
      </div>
    )
  }

}

module.exports = PageTransition;
