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
      url: 'http://localhost:4000/loadBrick',
      type: 'get',
      success: function(response) {
        // console.log(response)
        if (response.success) {
          var datas = response.data;
          for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var pageModel = new Models.PageModel(data);
            pageModel.set("engineeringTree", self.recursionModel(data, "engineeringTree"))
            self.add(pageModel)
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

  //Begin Recursion Model
  //Purpose: convert treeDatas in data[treeName] to BrickModel
  //Arguments:
  //  * data - treeDatas' parent data
  //  * treeName - engineeringTree or referenceTree
  //Returns:
  //  * models - array of treeDatas' Brick Model
  recursionModel(data, treeName) {
    var self = this;
    var treeDatas = data[treeName];
    var models = [];
    if (treeDatas && treeDatas.length > 0) {
      for (var i = 0; i < treeDatas.length; i++) {
        var treeData = treeDatas[i];
        var treeModel = new Models.BaseBrickModel(treeData);
        treeModel.set(treeName, self.recursionModel(treeData, treeName));
        models.push(treeModel);
      }
    }
    return models;
  }

}

module.exports = BrickCollections;
