"use strick"

import Backbone from 'backbone'

var BaseBrickModel = Backbone.Model.extend({

  defaults: {

  },

  getValue: function() {
    return this.toJSON();
  }

})

module.exports = BaseBrickModel;
