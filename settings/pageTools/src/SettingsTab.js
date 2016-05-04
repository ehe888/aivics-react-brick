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

  render() {
    return (
      <div className="btn-group settings-tab" role="group" aria-label="...">
        <button type="button"
                className="btn btn-default"
                onClick={this.props.onPageSettingsClick}>Page</button>
        <button type="button"
                className="btn btn-default"
                onClick={this.props.onPageTransitionClick}>Transition</button>
      </div>
    )
  }

}

module.exports = SettingsTab
