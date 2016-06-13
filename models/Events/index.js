"use strick"

import Backbone from 'backbone'

var EventModel = Backbone.Model.extend({

  defaults: {

  },

  getValue: function() {
    return this.toJSON();
  }

})

module.exports = EventModel;
