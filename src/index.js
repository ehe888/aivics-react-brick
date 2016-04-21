"use strict"

var MaskBox = require("../bricks/mask/src");
var BaseBrick = require("../bricks/base/src");
var BaseBrickSettingPanel = require("../settings/base/src");

var Brick = function(){
  if( !(this instanceof Brick) ){
    return new Brick();
  }
  this.settings = {};

  this.Mask = MaskBox;
  /**
   * Base Brick and Setting Panel
   */
  this.Base = BaseBrick;
  this.settings.Base = BaseBrickSettingPanel;


  return this;
}

/**
 * Use name as key to generate a Brick Object
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
Brick.prototype.produce = function(name) {
  return this[name] || BaseBrick;
};

Brick.prototype.setting = function(name) {
  return this.settings[name] || BaseBrickSettingPanel;
}

module.exports = new Brick();
