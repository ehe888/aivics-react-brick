"use strict"

require('./css/style.css')

import React from "react"
import uuid from "uuid"

import PageAddDelete from "./PageAddDelete"
import PageScale from "./PageScale"
import SettingsTab from "./SettingsTab"

class PageSettingPanel extends React.Component {

  constructor(prop){
    super(prop);

    this.refName = "PageSettingPanel";
    this.dataStorage = this.props.dataStorage;
    this.model = this.dataStorage.model("Pages");

    this.getDOMElement = function(){
      return this.refs[this.refName];
    }

  }

  render() {
    return (
      <div ref="PageSettingPanel" className="aivics-page-setting-panel">
        <PageAddDelete
          onPageAdd = {this.props.onPageAdd}
          onPageDelete = {this.props.onPageDelete}
          />
        <PageScale
          onPageScaleLarge = {this.props.onPageScaleLarge}
          onPageScaleSmall = {this.props.onPageScaleSmall}
        />
        <SettingsTab
          onPageSettingsClick = {this.props.onPageSettingsClick}
          onPageTransitionClick = {this.props.onPageTransitionClick}
          />
      </div>
    )
  }

}

module.exports = PageSettingPanel;
