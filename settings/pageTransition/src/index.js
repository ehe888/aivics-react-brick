"use strict"

require('./css/style.css')

import React from "react"
import PageTransitionNew from "./PageTransitionNew"
import PageTransitionList from "./PageTransitionList"

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

    var model = this.props.dataStorage.model("Bricks")
    var activeBrick = model.find({id: this.props.activeBrickId})

    return (
      <div ref="PageTransitionPanel" className="aivics-page-transition-panel">
        <PageTransitionList
          activeBrickId = {this.props.activeBrickId}
          dataStorage = {this.props.dataStorage}
        />
        <div className="line"></div>
        <PageTransitionNew
          activeBrickId = {this.props.activeBrickId}
          dataStorage = {this.props.dataStorage}
        />
      </div>
    )
  }

}

module.exports = PageTransition;
