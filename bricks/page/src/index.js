"use strict"

require("./style.css")

import Brick from "../../base/src"

class Page extends React.Component  {
  constructor(props){   //Equals to getInitialState
    super(props);
    //this.refName = "aivicsBrick"; //Class constant used to referece this component
    this.dataStorage = this.props.dataStorage;
    this.model = this.dataStorage.model("Bricks");
    this.updateContentView = this.updateContentView.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  updateContentView() {

    var $brick = $("#" + this.props.id);
    var height = $brick.outerHeight();
    var para = $brick.find("h3.aivcis-page-title-paragraph");
    var pHeight = para.outerHeight();

    console.log(height, pHeight);
    console.log((100 * ((height - pHeight)/height) / 2.0) + "%");

    para.css({
      "top": (100 * ((height - pHeight)/height) / 2.0) + "%"
    });

  }

  componentDidMount(){
    this.updateContentView();
  }


  componentDidUpdate(){
    this.updateContentView();
  }

  renderContent() {
    var record = this.model.find({ id: this.props.id });
    return (
      <h3 className="aivcis-page-title-paragraph"
        dangerouslySetInnerHTML={ { __html: record.title} } ></h3>
    )
  }

  render() {
    return (
      <Brick id={this.props.id}
            dataStorage={this.props.dataStorage}
            onBrickSelect={this.props.onBrickSelect}
            renderContent={this.renderContent}
            >
      </Brick>
    )
  }
}

module.exports = Page;
