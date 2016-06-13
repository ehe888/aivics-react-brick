"use strick"

import Backbone from 'backbone'

var BaseCollection = Backbone.Collection.extend({

  find: function(filter, treeName) {
    var results = [];
    treeName = treeName?treeName:"engineeringTree"
    if (!filter) {
      results = this.models;
    }else {
      results = this.findByPath(filter.id, treeName);
    }

    return results;
  },

  findByPath: function(path, treeName) {
    var ids = _.split(path, '/');

    if(_.isEmpty(ids)) return [];

    if(ids.length === 1){
      // console.log(ids[0], collection);
      return _.find(this.models, { id: ids[0] });
    }else{
      var id = ids[0];
      ids.shift();
      var p = ids.join( "/");
      var collect = _.find(this, { id: id })
      // console.log("collection", collection)
      if (!collect) {
        return [];
      }
      // console.log("collection", collect[treeName]);
      return this.findByPath(p, treeName);
    }
  }

})

module.exports = BaseCollection;
