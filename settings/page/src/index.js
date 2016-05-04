"use strict"

require('./css/style.css')

import React from "react"
import uuid from "uuid"

import PageAddDelete from "./PageAddDelete"

class PageSettingPanel extends React.Component {

  constructor(prop){
    super(prop);

    this.refName = "PageSettingPanel";
    this.dataStorage = this.props.dataStorage;
    this.model = this.dataStorage.model("Bricks");

    this.getDOMElement = function(){
      return this.refs[this.refName];
    };

  }

  render() {
    return (
      <div ref="PageSettingPanel" className="aivics-page-setting-panel">
        <PageAddDelete
          onPageAdding = {this.props.onPageAdding}/>
      </div>
    )
  }

}

module.exports = PageSettingPanel;
