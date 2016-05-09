"use strict"

import Story from "./main"
import Preview from "./preview"

class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.showPreview = this.showPreview.bind(this);
  }

  showPreview(show) {
    if (!show) {
      $(".story-content").show();
      $(".preview-content").hide();
    }else {
      $(".story-content").hide();
      $(".preview-content").show();
    }
  }

  render() {
    return (
      <div>
        <Story ref="AivicsStory" showPreview={(event)=>this.showPreview(true)}/>
        <Preview ref="AivicsPreview" showStory={(event=>this.showPreview(false))}/>
      </div>
    )
  }
}

ReactDOM.render(<Workspace/>,
    document.getElementById('workspace')
);
