"use strict"

/**
 * Demo entry
 */

import React from "react"
import Bricks from '../src'

let BrickMask = Bricks.Mask;
let Brick = Bricks.Base;

var data = {
    id: 1,
    name: "a brick",
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
};


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.onBrickClick = this.onBrickClick.bind(this);
    this.onBrickResize = this.onBrickResize.bind(this);

    this.state = {
        activeBrickPosition: { left: 0, top: 0, width: 0, height: 0 },
        moveToBrickPosition: false
    };
  }

  onBrickClick(e, position) {
    this.setState({ activeBrickPosition: position });
  }

  onBrickResize(position) {
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

    this.setState({
      moveToBrickPosition: position,
      activeBrickPosition: position
    });
  }

  render() {
    //var maskData = { activeBrickPosition: this.state.activeBrickPosition }
    var activeBrickPosition = this.state.activeBrickPosition;
    var moveToBrickPosition = this.state.moveToBrickPosition;

    return (
      <div ref="editor" className="editor">
        <Brick data={data}
          onBrickClick={this.onBrickClick}
          moveToBrickPosition={moveToBrickPosition} />
        <BrickMask activeBrickPosition={activeBrickPosition} onResize={this.onBrickResize} />
      </div>
    )
  }
}

ReactDOM.render(<Editor />,
    document.getElementById('workspace')
);
