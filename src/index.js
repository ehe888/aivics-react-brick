"use strict"

var BaseBrick = require("../bricks/base/src");

var Brick = function(){
  if( !(this instanceof Brick) ){
    return new Brick();
  }

  this.Base = BaseBrick;

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
