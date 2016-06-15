/**
 * settings/pageTools/src/index.js
 */


"use strict"

require('./css/style.css')

import React from "react"
import uuid from "uuid"

import PageAddDelete from "./PageAddDelete"
import PageScale from "./PageScale"
import SettingsTab from "./SettingsTab"
import PageBarMode from "./PageBarMode"

class PageSettingPanel extends React.Component {

  constructor(prop){
    super(prop);

    this.refName = "PageSettingPanel";

    this.getDOMElement = function(){
      return this.refs[this.refName];
    }

  }

  save() {
    var collections = this.props.dataStorage;
    collections.BrickCollections.save();
    collections.TransitionCollections.save();
    collections.EventCollections.save();
  }

  render() {
    return (
      <div ref="PageSettingPanel" className="aivics-page-setting-panel">
        <div className="btn-group preview" role="group">
          <button type="button"
                  className="btn btn-default"
                  onClick={this.props.onPreview}>PREVIEW</button>
          <button type="button"
                  className="btn btn-default"
                  onClick={(event)=>this.save(event)}>Save</button>
        </div>
        <PageAddDelete
          onPageAdd = {this.props.onPageAdd}
          onPageDelete = {this.props.onPageDelete}
          />
        <PageScale
          onPageScaleLarge = {this.props.onPageScaleLarge}
          onPageScaleSmall = {this.props.onPageScaleSmall}
        />
        <PageBarMode
          onPageBarModeChange = {this.props.onPageBarModeChange}
        />

      </div>
    )
  }

}

module.exports = PageSettingPanel;
