"use strict"

/**
 * Base Brick Setting Panel, based on bootstrap form field
 * We have blow settings supported at this moment:
 * 			top, left, height, width,
 * 			background-color
 * 			LabelText
 *
 * TODO:
 * 		position - bottom, right
 * 		align option - top-left, top-right, bottom-left, bottom-right
 * 		rotate of content
 * 	 	offset of content - top, left, bottom, right
 *
 */

require("./style.css")

import React from "react"
import uuid from "uuid"

import FieldTop from "./FieldTop"
import FieldLeft from "./FieldLeft"
import FieldWidth from "./FieldWidth"
import FieldHeight from "./FieldHeight"
import FieldLabelText from "./FieldLabelText"
import FieldBgColor from "./FieldBgColor"
import FieldPageTitle from "./FieldPageTitle"
import FieldImage from "./FieldImage"
import PageAddReference from "./PageAddReference"

//
// const _aivicsBrickSettingsTop = "aivicsBrickSettingsTop";
// const _aivicsBrickSettingsWidth = "aivicsBrickSettingsWidth";
// const _aivicsBrickSettingsHeight = "aivicsBrickSettingsHeight";

/**** blow constants and functions should be put into a separate module */
const _baseTop = "baseTop";
const _baseWidth = "baseWidth";
const _baseHeight = "baseHeight";
const _labelText = "labelText";
const _baseLeft = "baseLeft";
const _baseBgColor = "baseBgColor";
const _imageUrl = "imageUrl"
const _pageTitle = "pageTitle"
const _pageReference = "pageReference"



var renderField = function(name){
  var FieldName = name;
  return (
    <FieldName model={this.model} key={uuid.v4()}
          brickId={this.props.activeBrickId}
          treeName = {this.props.treeName}
          onBrickSettingChange={this.props.onBrickSettingChange} />
  )
}



var renderTopField = function(){
  return renderField.call(this, FieldTop);
}

var renderLeftField = function(){
  return renderField.call(this, FieldLeft);
}

var renderWidthField = function(){
  return renderField.call(this, FieldWidth);
}

var renderHeightField = function(){
  return renderField.call(this, FieldHeight);
}

var renderLabelTextField = function(){
  return renderField.call(this, FieldLabelText);
}

var renderBgColorField = function(){
  return renderField.call(this, FieldBgColor);
}

var renderImageField = function(){
  return renderField.call(this, FieldImage)
}

var renderPageTitleField = function(){
  return renderField.call(this, FieldPageTitle)
}

var renderPageReference = function(){
  return (
    <PageAddReference model={this.model} key={uuid.v4()}
          brickId={this.props.activeBrickId}
          onPageAddReference={this.props.onPageAddReference}
          treeName = {this.props.treeName}
          onBrickSettingChange={this.props.onBrickSettingChange} />
  )
}

/*===================================================================*/

/**
 * ES6 Class Delcaration - equals to React.createClass
 */
class BrickSettingPanel extends React.Component {

  constructor(props){   //Equals to getInitialState
      super(props);
      this.refName = "aivicsBrickSetting";
      this.dataStorage = this.props.dataStorage;
      this.model = this.dataStorage.BrickCollections;

      this.getDOMElement = function(){
        return this.refs[this.refName];
      };

      this.baseSettings = [ _baseTop, _baseLeft, _baseWidth, _baseHeight, _baseBgColor ];

      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.renderFields = this.renderFields.bind(this);

      this.fields = {
        "baseTop": renderTopField.bind(this),
        "baseLeft": renderLeftField.bind(this),
        "baseWidth": renderWidthField.bind(this),
        "baseHeight": renderHeightField.bind(this),
        "labelText": renderLabelTextField.bind(this),
        "baseBgColor": renderBgColorField.bind(this),
        "imageUrl": renderImageField.bind(this),
        "pageTitle": renderPageTitleField.bind(this),
        "pageReference": renderPageReference.bind(this)
      }
  }

  handleFormSubmit(e){
      e.preventDefault();
  }

  componentDidMount(){
    var record = this.model.find({ id: this.props.activeBrickId }, this.props.treeName);
  }

  componentDidUpdate(prevProps, prevState){
    this.model = this.dataStorage.BrickCollections;
    var record = this.model.find({ id: this.props.activeBrickId }, this.props.treeName);
  }

  renderFields(){
    if (this.props.activeBrickId) {

      var record = this.model.find({ id: this.props.activeBrickId }, this.props.treeName).getValue();
      var settingFields = _.union(this.baseSettings, record.settings);
      var self = this;
      return settingFields.map(function(result){
        var r = self.fields[result];

        if(r)
          return r();
        else
          return "";
      })
    }else {
      return ""
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate = (this.props.activeBrickId !== nextProps.activeBrickId
        || _.isEmpty(nextProps.settingChangeName) );
    return shouldUpdate;
  }

  render() {
    return (
      <div ref="aivicsBrickSetting" className="aivics-brick-setting-panel">
        <form onSubmit={this.handleFormSubmit}>
          {this.renderFields()}
        </form>
      </div>
    )
  }
}

module.exports = BrickSettingPanel;
