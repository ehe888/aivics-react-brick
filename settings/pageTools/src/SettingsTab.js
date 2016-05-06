"use strict"

import React from "react"

class SettingsTab extends React.Component {

  constructor(props) {
    super(props);

    this.refName = "PageSettingsTab"
    this.getDOMElement = function(){
      return this.refs[this.refName];
    };
  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps, prevState){

  }

  onPageSettingsClick() {
    $(".aivics-page-transition-panel").hide();
    $(".aivics-brick-setting-panel").show();
  }

  onPageTransitionClick() {
    $(".aivics-page-transition-panel").show();
    $(".aivics-brick-setting-panel").hide();
  }

  render() {
    return (
      <div className="btn-group settings-tab" role="group" aria-label="...">
        <button type="button"
                className="btn btn-default"
                onClick={(event)=>this.onPageSettingsClick()}>Page</button>
        <button type="button"
                className="btn btn-default"
                onClick={(event)=>this.onPageTransitionClick()}>Transition</button>
      </div>
    )
  }

}

module.exports = SettingsTab
