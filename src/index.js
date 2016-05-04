"use strict"

var MaskBox = require("../bricks/mask/src");
var BaseBrick = require("../bricks/base/src");
var LabelBrick = require("../bricks/label/src");
var BaseBrickSettingPanel = require("../settings/base/src");
var Page = require("../bricks/page/src");

var Bricks = function(){
  if( !(this instanceof Bricks) ){
    return new Bricks();
  }
  this.settings = {};

  this.Mask = MaskBox;
  /**
   * Base Brick and Setting Panel
   */
  this.Base = BaseBrick;
  this.settings.Base = BaseBrickSettingPanel;

  this.Page = Page;

  this.Label = LabelBrick;
  this.settings.Label = BaseBrickSettingPanel;
  return this;
}

/**
 * Use name as key to generate a Brick Object
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
Bricks.prototype.produce = function(name) {
  return this[name] || BaseBrick;
};

Bricks.prototype.setting = function(name) {
  return this.settings[name] || BaseBrickSettingPanel;
}
//
// Bricks.prototype.renderComponent = function(data){
//   if(data.brickType === "Base"){
//     return
//   }
// }

module.exports = new Bricks();
