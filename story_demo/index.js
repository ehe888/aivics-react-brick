"use strict"

import Story from "./main"
import Preview from "./preview"

import DataStorage from './DataStorage'

import Config from "./config"

class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.showPreview = this.showPreview.bind(this);

    this.state = {
      preview: false,
      treeName: Config.mode.engineeringTree,
      barMode: 0
    }
  }

  showPreview(show) {
    if (!show) {
      $(".story-content").show();
      $(".preview-content").hide();
      this.setState({
        preview: false
      })
    }else {
      $(".story-content").hide();
      $(".preview-content").show();
      this.setState({
        preview: true
      })
    }
  }

  onPageBarModeChange(barMode) {
    this.setState({
      barMode: barMode
    })
  }

  render() {
    // console.info(this.state.treeName)
    return (
      <div>
        <Story ref="AivicsStory"
               showPreview={(event)=>this.showPreview(true)}
               treeName={this.state.treeName}
               config = {Config}
               barMode = {this.state.barMode}
               onPageBarModeChange = {this.onPageBarModeChange.bind(this)}
                />
        <Preview
          ref="AivicsPreview"
          showStory={(event=>this.showPreview(false))}
          treeName={this.state.treeName}
          barMode = {this.state.barMode}
          config = {Config}/>
      </div>
    )
  }
}

ReactDOM.render(<Workspace/>,
    document.getElementById('workspace')
);
