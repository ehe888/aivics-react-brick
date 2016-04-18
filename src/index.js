"use strict"

var BaseBrick = require("../bricks/base/src");
var ImageBrick = require("../bricks/image/src");

var Brick = function(){
  if( !(this instanceof Brick) ){
    return new Brick();
  }

  this.Base = BaseBrick;
  this.Image = ImageBrick;

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

module.exports = new Brick();
