'use strick'

import BaseCollection from './Base.js'
import BrickModel from '../models/Bricks'
import Models from '../models'

class BrickCollections extends BaseCollection {

  constructor(props) {
    super(props)

    this.model = BrickModel
  }

  save(callback) {
    console.log("save")
    var self = this;
    $.ajax({
      url: 'http://localhost:4000/saveBrick',
      type: 'post',
      data: {
        brickCollections: JSON.stringify(self.models)
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
      url: 'http://localhost:4000/loadBrick',
      type: 'get',
      success: function(response) {
        console.log(response)
        if (response.success) {
          var datas = response.data;
          for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var treeDatas = data.engineeringTree;
            data.engineeringTree = [];
            var pageModel = new Models.PageModel(data);
            for (var j = 0; j < treeDatas.length; j++) {
              var treeData = treeDatas[j]
              var treeModel = new Models.BaseBrickModel(treeData);
              pageModel.getValue().engineeringTree.push(treeModel)
            }
            self.add(pageModel)
          }
          console.log(self.models)
          callback()
        }
      },
      error: function(error) {
        console.log(error)
      }
    })
  }

}

module.exports = BrickCollections;
