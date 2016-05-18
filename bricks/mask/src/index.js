"use strict"

/**
 * Props must be provided:
 * 	1. onBrickResize(position){} - Parent should implement event handler : onBrickResize
 *
 * Sample implementation:
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

 * Constrain the brick inside parent container
 *
 */

import React from "react"

require("./style.css");

/**
 * ES6 Class Delcaration - equals to React.createClass
 */
class MaskBox extends React.Component {
  constructor(props){   //Equals to getInitialState
      super(props);
      this.activeBrickId = this.props.activeBrickId;
      this.handleResize = this.handleResize.bind(this);
      this.handleDoubleClick = this.handleDoubleClick.bind(this);

      this.zoomScale = this.props.storyScale || 1;
  }

  handleDoubleClick(){
      $(this.refs.aivicsBrickMask).css("display", "none"); //Double click to hide mask
  }

  handleResize(maskBox) {

    var left = _.replace(maskBox[0].style.left, 'px', ''),
        top = _.replace(maskBox[0].style.top, 'px', '');
    var finalPosition = {
      width: maskBox.width() - 10,
      height: maskBox.height() - 10,
      left: parseInt(left) + 5,
      top: parseInt(top) + 5
    };

    this.props.onBrickResize(this.activeBrickId, finalPosition);
  }

  componentDidMount(){
    var self = this;
    var maskBox = $(self.refs.aivicsBrickMask);


    $( this.refs.aivicsBrickMask ).draggable({
      refreshPositions: false,
      start: function(e, ui) {

      },
      drag: function(event, ui) {
        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = (ui.originalPosition.left + changeLeft)/self.zoomScale; // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = (ui.originalPosition.top + changeTop)/self.zoomScale; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

      },
      stop: function(e, ui){
        e.stopPropagation();
        self.handleResize(maskBox);
      }
    });

    $("#brickHandy1").draggable({
      start: function(e, ui){
        //hide
        $(this).css('display', 'none');
      },
      drag: function(e, ui){
        if( !_.isEmpty(ui.position)) {
          var originTop = self.props.activeBrickPosition.top - 5;
          var originHeight = self.props.activeBrickPosition.height + 10;
          var maskTop = originTop + ui.position.top;
          var maskHeight = originHeight - ui.position.top;

          var originLeft = self.props.activeBrickPosition.left - 5;
          var originWidth = self.props.activeBrickPosition.width + 10;
          var maskLeft = originLeft + ui.position.left;
          var maskWidth = originWidth - ui.position.left;

          maskBox.css( "left",  maskLeft )
                  .css( "width", maskWidth )
                  .css( "top",  maskTop )
                  .css( "height", maskHeight );
        }
      },
      stop: function(e, ui){
        e.stopPropagation();
        $(this).removeAttr('style');
        $(this).css('display', 'block');
        self.handleResize(maskBox);
      }
    });

    $("#brickHandy2").draggable({
      axis: "y",
      start: function(e, ui){
        //hide
        $(this).css('display', 'none');
      },
      drag: function(e, ui){
        if( !_.isEmpty(ui.position)) {
          var originTop = self.props.activeBrickPosition.top - 5;
          var originHeight = self.props.activeBrickPosition.height + 10;
          var maskTop = originTop + ui.position.top;
          var maskHeight = originHeight - ui.position.top;

          maskBox.css( "top",  maskTop )
                  .css( "height", maskHeight );
        }
      },
      stop: function(e, ui){
        e.stopPropagation();
        $(this).removeAttr('style');
        $(this).css('display', 'block');
        self.handleResize(maskBox);
      }
    });

    $("#brickHandy3").draggable({
      start: function(e, ui){
        //hide
        $(this).css('display', 'none');
      },
      drag: function(e, ui){
        if( !_.isEmpty(ui.position) && ui.position.left >= 5){
          var maskWidth = ui.position.left + 5;
          var originTop = self.props.activeBrickPosition.top - 5;
          var originHeight = self.props.activeBrickPosition.height + 10;
          var maskTop = originTop + ui.position.top;
          var maskHeight = originHeight - ui.position.top;

          maskBox.css( "top",  maskTop )
                  .css( "height", maskHeight )
                  .css("width", maskWidth);
        }
      },
      stop: function(e, ui){
        e.stopPropagation();
       $(this).removeAttr('style');
       self.handleResize(maskBox);
      }
    });

    $("#brickHandy4").draggable({
      axis: "x",
      drag: function(e, ui){
        if( !_.isEmpty(ui.position) && ui.position.left >= 5){
          var originLeft = self.props.activeBrickPosition.left - 5;
          var maskWidth = ui.position.left + 5;
          maskBox.css("width", maskWidth);
        }
      },
      stop: function(e, ui){
        e.stopPropagation();
       $(this).removeAttr('style');
       self.handleResize(maskBox);
      }
    });

    $("#brickHandy5").draggable({
      start: function(e, ui){
        //hide
        $(this).css('display', 'none');
      },
      drag: function(e, ui){
        if( !_.isEmpty(ui.position)) {
          var maskWidth = ui.position.left + 5;
          var maskHeight = ui.position.top + 5;
          maskBox.css("width", maskWidth)
                  .css("height", maskHeight);
        }
      },
      stop: function(e, ui){
        e.stopPropagation();
        $(this).removeAttr('style');
        $(this).css('display', 'block');
        self.handleResize(maskBox);
      }
    });

    $("#brickHandy6").draggable({
      axis: "y",
      drag: function(e, ui){

        if( !_.isEmpty(ui.position) && ui.position.top >= 5){
          var maskHeight = ui.position.top + 5;
          maskBox.css("height", maskHeight);
        }
      },
      stop: function(e, ui){
        e.stopPropagation();
       $(this).removeAttr('style');
       self.handleResize(maskBox);
      }
    });

    $("#brickHandy7").draggable({
      start: function(e, ui){
        //hide
        $(this).css('display', 'none');
      },
      drag: function(e, ui){
        if( !_.isEmpty(ui.position)) {
          var originLeft = self.props.activeBrickPosition.left - 5;
          var originWidth = self.props.activeBrickPosition.width + 10;
          var maskLeft = originLeft + ui.position.left;
          var maskWidth = originWidth - ui.position.left;
          var maskHeight = ui.position.top + 5;
          maskBox.css("height", maskHeight)
                  .css( "left",  maskLeft )
                  .css( "width", maskWidth );
        }
      },
      stop: function(e, ui){
        e.stopPropagation();
        $(this).removeAttr('style');
        $(this).css('display', 'block');
        self.handleResize(maskBox);
      }
    });

    $("#brickHandy8").draggable({
      axis: "x",
      start: function(e, ui){
        //hide
        $(this).css('display', 'none');
      },
      drag: function(e, ui){
        if( !_.isEmpty(ui.position)) {
          var originLeft = self.props.activeBrickPosition.left - 5;
          var originWidth = self.props.activeBrickPosition.width + 10;
          var maskLeft = originLeft + ui.position.left;
          var maskWidth = originWidth - ui.position.left;

          maskBox.css( "left",  maskLeft )
                  .css( "width", maskWidth );
        }
      },
      stop: function(e, ui){
        e.stopPropagation();
        $(this).removeAttr('style');
        $(this).css('display', 'block');
        self.handleResize(maskBox);
      }
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.activeBrickId) {
      $(this.refs.aivicsBrickMask).css("display", "block");
    }else {
      $(this.refs.aivicsBrickMask).css("display", "none");
    }
    var model = this.props.dataStorage.model("Bricks");
    var activeBrickPosition = this.props.activeBrickPosition;

    var maskPosition = {
      left: activeBrickPosition.left - 5,
      top: activeBrickPosition.top - 5,
      width: activeBrickPosition.width + 10,
      height: activeBrickPosition.height + 10
    };
    $(this.refs.aivicsBrickMask).css(maskPosition);
    $(this.refs.aivicsBrickMask).css("z-index", 99999);

    this.zoomScale = this.props.storyScale || 1;
  }

  contextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    var record = this.props.dataStorage.model("Bricks").find({id: this.props.activeBrickId}, this.props.treeName);
    // if (record.brickType == "Page") {
      var position = {
        left: event.pageX,
        top: event.pageY
      }
      this.props.onPageContextMenu(this.props.activeBrickId, position);

      return false;
    // }

  }

  render() {
    this.activeBrickId = this.props.activeBrickId;
    return (
      <div ref="aivicsBrickMask"
          className="aivics-brick-mask"
          onDoubleClick={this.handleDoubleClick}
          onContextMenu={(event)=>this.contextMenu(event)}>
          <div id="brickHandy1" className="aivics-brick-handy"></div>
          <div id="brickHandy2" className="aivics-brick-handy"></div>
          <div id="brickHandy3" className="aivics-brick-handy"></div>
          <div id="brickHandy4" className="aivics-brick-handy" ></div>
          <div id="brickHandy5" className="aivics-brick-handy"></div>
          <div id="brickHandy6" className="aivics-brick-handy"></div>
          <div id="brickHandy7" className="aivics-brick-handy"></div>
          <div id="brickHandy8" className="aivics-brick-handy"></div>
          <div id="brickRefTop" className="aivics-brick-ref-line"></div>
          <div id="brickRefBottom" className="aivics-brick-ref-line"></div>
          <div id="brickRefLeft" className="aivics-brick-ref-line"></div>
          <div id="brickRefRight" className="aivics-brick-ref-line"></div>
      </div>
    )
  }
}

module.exports = MaskBox;
