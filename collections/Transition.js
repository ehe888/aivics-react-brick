'use strick'

import BaseCollection from './Base.js'
import TransitionModel from '../models/Transitions'
import Models from '../models'

class TransitionCollections extends BaseCollection {

  constructor(props) {
    super(props)

    this.model = TransitionModel
  }

  save(callback) {
    console.log("save")
    var self = this;
    $.ajax({
      url: 'http://localhost:4000/saveTransition',
      type: 'post',
      data: {
        transitionCollections: JSON.stringify(self.models)
      },
      success: function(response) {
        console.log(response)
        if (response.success) {
          if (callback) {
            callback();
          }
        }
      },
      error: function(error) {
        console.log(error)
      }
    })
  }

  load(callback) {
    var self = this;
    $.ajax({
      url: 'http://localhost:4000/loadTransition',
      type: 'get',
      success: function(response) {
        // console.log(response)
        if (response.success) {
          var datas = response.data;
          for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var transitionModel = new Models.TransitionModel(data);
            self.add(transitionModel)
          }
          // console.log(self.models)
          callback()
        }
      },
      error: function(error) {
        console.log(error)
      }
    })
  }

  delete(filter) {
    console.log(filter)
    this.remove(filter);
    console.log(this.models)
  }

}

module.exports = TransitionCollections;
