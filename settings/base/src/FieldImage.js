"use stick"

class FieldImage extends React.Component {

  constructor(props) {
    super(props);


    this.refName = "aivicsBrickSettingsLabelText"
    this.getDOMElement = function(){
      return this.refs[this.refName];
    };
  }

  render() {
    var record = this.props.model.find({ id: this.props.brickId });
    // console.log(record.pageImage)
    return (
      <div>
        <input className="btn btn-primary"
               type="submit"
               name={this.refName}
               value={record.pageImage}
               onClick={this.props.onImageBtnClick}
               />
      </div>
    )
  }
}

module.exports = FieldImage;
