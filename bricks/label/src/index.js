"use strict"

require("./style.css")

import Brick from "../../base/src"

class LabelText extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidUpdate(prevProps, prevState){
  }

  render() {
    return (
      <p className="aivcis-brick-label-paragraph"
        dangerouslySetInnerHTML={ { __html: this.props.labelText } } ></p>
    )
  }
}

class LabelBrick extends React.Component  {
  constructor(props){   //Equals to getInitialState
    super(props);
    //this.refName = "aivicsBrick"; //Class constant used to referece this component
    this.dataStorage = this.props.dataStorage;
    this.model = this.dataStorage.model("Bricks");
    this.renderContent = this.renderContent.bind(this);
    this.updateContentView = this.updateContentView.bind(this);
  }

  updateContentView() {
    var $brick = $("#" + this.props.id);
    var height = $brick.outerHeight();
    var para = $brick.find("p.aivcis-brick-label-paragraph");
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
      <LabelText ref="aivicsLabelBrickContent"
                labelText={record.labelText} />
    );
  }


  render() {
    return (
      <Brick id={this.props.id}
            dataStorage={this.props.dataStorage}
            onBrickSelect={this.props.onBrickSelect}
            renderContent={this.renderContent} >
      </Brick>
    )
  }
}

module.exports = LabelBrick;
