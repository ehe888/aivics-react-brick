"use strict"

/**
 * Base Brick Setting Panel, based on bootstrap form field
 */

import React from "react"

/**
 * ES6 Class Delcaration - equals to React.createClass
 */
class BrickSettingPanel extends React.Component {
  constructor(props){   //Equals to getInitialState
      super(props);
      this.handleWidthChange = this.handleWidthChange.bind(this);
  }

  handleWidthChange(e){
    e.preventDefault();
    console.log(e.target.value);
    this.props.onBrickWidthChange(e.target.value);
  }

  componentDidMount(){

  }

  render() {
    var data = this.props.data;

    return (
      <div className="aivics-brick-setting-panel">
        <form className="form-inline">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">Width</div>
                <input type="text"
                  className="form-control"
                  placeholder="Width"
                  value={data.dimension.width}
                  onChange={this.handleWidthChange}
                  />
              <div className="input-group-addon">px</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = BrickSettingPanel;
