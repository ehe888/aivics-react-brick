"use strict"

/**
 * Mongoose like inmemory runtime data storage
 *  Usage: DataStorage.model("Bricks").find({ id: id }).update({})
 *
 * TODO: 1. Flush data to ajax data source
 */

import uuid from 'uuid'

function hexToRgbA(hex, opacity) {
    var bigint = parseInt(hex.substring(1), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
}

var Model = function(name){
  if(!( this instanceof Model)){
    return new Model(name);
  }
  this.name = name;
  this.collections = [];
}

Model.prototype.findByPath = function(path, collection){
    console.log("path", path);
    var ids = _.split(path, '/');

    if(_.isEmpty(ids)) return null;

    if(ids.length === 1){
      console.log(ids[0], collection);
      return _.find(collection, { id: ids[0] });
    }else{
      var id = ids[0];
      ids.shift();
      var p = ids.join( "/");
      var collect = _.find(collection, { id: id })
      console.log("collection", collect.bricks);
      return this.findByPath(p, collect.bricks);
    }
}

Model.prototype.find = function(filter){


  var results = [];
  if(!filter)
    results = this.collections;
  else{
    results = this.findByPath(filter.id, this.collections);
  }


  console.log(_.isArray(results));

  if(_.isEmpty(results)){
    return null;
  }

  if( !_.isArray(results) ){
    return new Proxy(results, {
      get: function(target, property, receiver){
        if(property === "backgroundColor"){
          return hexToRgbA(target.backgroundColor, target.backgroundOpacity);
        }
        return target[property];
      }
    });
  }

  var rets = results.map(function(r){
    return new Proxy(r, {
      get: function(target, property, receiver){
        if(property === "backgroundColor"){
          return hexToRgbA(target.backgroundColor, target.backgroundOpacity);
        }
        return target[property];
      }
    });
  });

  if( !_.isEmpty(rets) ){
    if(rets.length > 1)
      return rets;
    else {
      return rets[0];
    }
  }
  return null;
}
Model.prototype.upsert = function(data) {
    if(!data) return false;

    if(data.id){
      var record = this.find({ id: data.id });
      if(!record){
        //insert
        this.collections.push(data);
      }else{
        //update
        _.merge(record, data);
      }
      return new Proxy(record, {
        get: function(target, property, receiver){
          if(property === "backgroundColor"){
            return hexToRgbA(target.backgroundColor, target.backgroundOpacity);
          }
          return target[property];
        }
      });
    }else{
      //generate id and insert
      data.id = uuid.v4();
      this.collections.push(data);
      return new Proxy(data, {
        get: function(target, property, receiver){
          if(property === "backgroundColor"){
            return hexToRgbA(target.backgroundColor, target.backgroundOpacity);
          }
          return target[property];
        }
      });
    }
}
Model.prototype.delete = function(filter){
  _.remove(this.collections, filter);
}

var DataStorage = function(){
  if( !(this instanceof DataStorage) ){
    return new DataStorage();
  }

  var Repository = this.Repository = {};

  DataStorage.prototype.connect = function(options){
      this.options = options;
  }

  DataStorage.prototype.model = function(name){
    //Return model of name
    if( ! (Repository[name] instanceof Model) ){
        Repository[name] = new Model(name);
    }
    return Repository[name];
  }
}

var _DataStorage = new DataStorage();


module.exports = _DataStorage;
