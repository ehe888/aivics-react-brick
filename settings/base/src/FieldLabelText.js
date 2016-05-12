import React from "react"

//const _aivicsBrickSettingsLabel = "aivicsBrickSettingsLabel";

class FieldLabelText extends React.Component {
  constructor(props) {
    super(props);


    this.refName = "aivicsBrickSettingsLabelText"
    this.getDOMElement = function(){
      return this.refs[this.refName];
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, ui) {
    var changeToValue = e.target.value;
    var self = this;
    var $this = $(this.getDOMElement());
    var delay = 300; //800ms
    var $field = $(e.target);

    clearTimeout($this.data('timer'));
    $this.data('timer', setTimeout(function(){
      $this.removeData('timer');
      var fieldName = $field.attr("name");
      // console.log({ fieldName: fieldName });

      //change Label of brick
      //then notify parent
      //Update birck Label
      var record = self.props.model.find({ id: self.props.brickId }, self.props.treeName);
      record.labelText = changeToValue;
      //notify parent
      self.props.onBrickSettingChange(self.props.brickId, fieldName, changeToValue);

    }, delay ));
  }

  componentDidMount(){
    // var record = this.props.model.find({ id: this.props.brickId });
    // $("input[name='" + this.refName + "']").val(record.labelText);
  }

  componentDidUpdate(prevProps, prevState){
    // var record = this.props.model.find({ id: this.props.brickId });
    // $("input[name='" + this.refName + "']").val( record.labelText );
  }

  render() {
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">Label</div>
            <input type="textarea"
              ref={this.refName}
              key={this.refName}
              name={this.refName}
              defaultValue={this.props.model.find({ id: this.props.brickId }, this.props.treeName).labelText}
              className="form-control"
              placeholder="Label"
              onInput={this.handleChange}
              />
        </div>
      </div>
    );
  }
}

module.exports = FieldLabelText;
