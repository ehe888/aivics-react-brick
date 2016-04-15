"use strict"

var Brick = require("./basic/Brick");

var BrickFactory = function(){
  if( !(this instanceof BrickFactory) ){
    return new BrickFactory();
  }

  this.Brick = Brick;

  return this;
}

/**
 * Use name as key to generate a Brick Object
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
BrickFactory.prototype.produce = function(name) {
  return this[name] || Brick;
};

module.exports = new BrickFactory();
