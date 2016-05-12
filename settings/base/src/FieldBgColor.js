import React from "react"


class FieldBgColor extends React.Component {
  constructor(props) {
    super(props);
    this.refName = "aivicsBrickSettingsBgColor"
    this.getDOMElement = function(){
      return this.refs[this.refName];
    };
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
  }

  handleChange(e, ui) {
    var changeToValue = e.target.value;
    var self = this;
    var $this = $(this.getDOMElement());
    var delay = 300; //800ms
    var $field = $(e.target);

    var fieldName = $this.attr("name");
    console.log(fieldName + " changed to ==> " + changeToValue);

    var record = this.props.model.find({ id: this.props.brickId }, self.props.treeName);
    record.backgroundColor = changeToValue;
    this.props.onBrickSettingChange(self.props.brickId,  fieldName, changeToValue);

    this.setState({ currentColor: changeToValue });

    // clearTimeout($this.data('timer'));
    // $this.data('timer', setTimeout(function(){
    //   $this.removeData('timer');
    //   var fieldName = $field.attr("name");
    //   console.log({ fieldName: fieldName });
    //
    //   //change BgColor of brick
    //   //then notify parent
    //   if(!_.isNaN(changeToValue)){
    //     var record = self.props.model.find({ id: self.props.brickId });
    //     record.bgColor = changeToValue;
    //     //notify parent
    //     self.props.onBrickSettingChange(record.id, fieldName, changeToValue);
    //   }
    //
    // }, delay ));
  }

  render() {
    var record = this.props.model.find({ id: this.props.brickId }, this.props.treeName);
    var defaultValue = record.backgroundColor || "#000000";
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">BG Color</div>
            <input type="color"
              ref={this.refName}
              name={this.refName}
              key={this.refName}
              className="form-control"
              defaultValue={defaultValue}
              onInput={this.handleChange}
              />
          <div className="input-group-addon input-color-text">#FFFFFF</div>
        </div>
      </div>
    );
  }
}

module.exports = FieldBgColor;
