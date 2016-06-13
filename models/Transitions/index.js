"use strick"

import Backbone from 'backbone'

var TransitionModel = Backbone.Model.extend({

  defaults: {

  },

  getValue: function() {
    return this.toJSON();
  }

})

module.exports = TransitionModel;
