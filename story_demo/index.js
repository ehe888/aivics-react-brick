"use strict"

import Story from "./main"
import Preview from "./preview"

import DataStorage from './DataStorage'

class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.showPreview = this.showPreview.bind(this);

    this.state = {
      preview: false,
      treeName: "referenceTree"
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

  render() {
    return (
      <div>
        <Story ref="AivicsStory"
               showPreview={(event)=>this.showPreview(true)}
               treeName={this.state.treeName}
                />
        <Preview
          ref="AivicsPreview"
          showStory={(event=>this.showPreview(false))}
          treeName={this.state.treeName}/>
      </div>
    )
  }
}

ReactDOM.render(<Workspace/>,
    document.getElementById('workspace')
);
