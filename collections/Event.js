'use strick'

import BaseCollection from './Base.js'
import EventModel from '../models/Events'
import Models from '../models'

class EventCollections extends BaseCollection {

  constructor(props) {
    super(props)

    this.model = EventModel
  }

  save(callback) {
    console.log("save")
    var self = this;
    $.ajax({
      url: 'http://localhost:4000/saveEvent',
      type: 'post',
      data: {
        eventCollections: JSON.stringify(self.models)
      },
      success: function(response) {
        // console.log(response)
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
      url: 'http://localhost:4000/loadEvent',
      type: 'get',
      success: function(response) {
        // console.log(response)
        if (response.success) {
          var datas = response.data;
          for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var eventModel = new Models.EventModel(data);
            self.add(eventModel)
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

}

module.exports = EventCollections;
