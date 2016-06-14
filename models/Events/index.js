"use strick"

import Backbone from 'backbone'

var BaseModel = Backbone.Model.extend({

  defaults: {

  },

  getValue: function() {
    return this.toJSON();
  }

})

module.exports = BaseModel;
