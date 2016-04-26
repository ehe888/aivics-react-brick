"use strict"

/**
 * Demo entry
 */

import React from "react"
import Bricks from '../src'

let BrickMask = Bricks.Mask;
let Brick = Bricks.Base;
let LabelBrick = Bricks.Label;
let BrickSetting = Bricks.settings.Base;

import DataStorage from './DataStorage'

//window.DataStorage = DataStorage;

var data = DataStorage.model('Bricks').upsert({
    name: "a brick",
    brickType: "Base",
    dimension: {
      top: 10,
      left: 20,
      width: 50,
      height: 50,
    },
    "zIndex": 100,
    styles: {
      "backgroundColor": "rgba(240, 240, 210, 0.9)"
    },
    classNames: [ 'aClass', 'bClass' ]
});

var data2 = DataStorage.model('Bricks').upsert({
    name: "another brick",
    brickType: "Label",
    dimension: {
      top: 100,
      left: 100,
      width: 50,
      height: 50,
    },
    "zIndex": 100,
    styles: {
      "backgroundColor": "rgba(240, 240, 210, 0.9)"
    },
    labelText: "This is label box!!",
    settings: [ "labelText" ]
});


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.onBrickSelect = this.onBrickSelect.bind(this);
    this.onBrickResize = this.onBrickResize.bind(this);
    this.onBrickSettingChange = this.onBrickSettingChange.bind(this);

    this.state = {
        activeBrickId: data.id,
        activeBrickPosition: data.dimension,
        settingChangeName: null,
        settingChangeValue: null
    };
  }

  onBrickSelect(e, brickId, position) {
    this.setState({
      activeBrickId: brickId,
      activeBrickPosition: position,
      settingChangeName: null,
      settingChangeValue: null
    });
  }

  onBrickSettingChange(brickId, fieldName, changeToValue) {
    var record = DataStorage.model("Bricks").find({ id: brickId });

    console.log({ changed: record });
    this.setState({
      activeBrickId: brickId,
      settingChangeName: fieldName,
      settingChangeValue: changeToValue,
      activeBrickPosition: record.dimension
    });
  }

  onBrickResize(activeBrickId, position) {
    var editorLeft = $(this.refs.editor).position().left;
    var editorTop = $(this.refs.editor).position().top;
    var editorWidth = $(this.refs.editor).width();
    var editorHeight = $(this.refs.editor).height();

    //Constrain the component inside the container
    if(position.left < 0){
      position.left = 0;
    }
    if(position.top < 0){
      position.top = 0;
    }

    if( position.left + position.width > editorWidth ){
      position.width = editorWidth - position.left;
    }

    if(position.top + position.height > editorHeight){
      position.height = editorHeight - position.top;
    }

    if(position.left >= editorWidth ){
      position.left = editorWidth-1;
      position.width = 1;
    }

    if(position.top >= editorHeight){
      position.top = editorHeight -1;
      position.height = 1;
    }

    var record = DataStorage.model("Bricks").find({ id: activeBrickId });
    if(!record){
      return;
    }

    _.merge(record, { dimension: position });


    this.setState({
      activeBrickId: activeBrickId,
      activeBrickPosition: position,
      settingChangeName: null,
      settingChangeValue: null
    });
  }

  render() {
    var activeBrickPosition = this.state.activeBrickPosition;

    var components = DataStorage.model("Bricks").find();

    console.log("render of editor");

    var self = this;
    var contents = components.map(function(comp){
      var DynaBrick = Bricks[comp.brickType];
      //console.log(brick);

      return (
        <DynaBrick id={comp.id} key={comp.id}
          dataStorage={DataStorage}
          onBrickSelect={self.onBrickSelect} />
      )
    });

    // <Brick id={data.id}
    //   dataStorage={DataStorage}
    //   onBrickSelect={this.onBrickSelect} />
    // <LabelBrick id={data2.id}
    //     dataStorage={DataStorage}
    //     onBrickSelect={this.onBrickSelect} />

    return (
      <div>
        <div ref="editor" className="editor">
          {contents}
          <BrickMask activeBrickId={this.state.activeBrickId}
              activeBrickPosition={activeBrickPosition}
              onBrickResize={this.onBrickResize} />
        </div>
        <BrickSetting
            activeBrickId={this.state.activeBrickId}
            dataStorage={DataStorage}
            settingChangeName={this.state.settingChangeName}
            settingChangeValue={this.state.settingChangeValue}
            onBrickSettingChange={this.onBrickSettingChange} />
      </div>
    )
  }
}

ReactDOM.render(<Editor />,
    document.getElementById('workspace')
);
