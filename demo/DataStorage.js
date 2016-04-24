"use strict"

/**
 * Mongoose like inmemory runtime data storage
 *  Usage: DataStorage.model("Bricks").find({ id: id }).update({})
 *
 * TODO: 1. Flush data to ajax data source
 */

import uuid from 'uuid'

var Model = function(name){
  if(!( this instanceof Model)){
    return new Model(name);
  }
  this.name = name;
  this.collections = [];
}

Model.prototype.find = function(filter){
  if(!filter) return this.collections;

  return _.find(this.collections, filter);

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
      return record;
    }else{
      //generate id and insert
      data.id = uuid.v4();
      this.collections.push(data);

      return data;
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
