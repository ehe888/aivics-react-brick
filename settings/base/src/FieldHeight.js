import React from "react"

//const _aivicsBrickSettingsHeight = "aivicsBrickSettingsHeight";

class FieldHeight extends React.Component {
  constructor(props) {
    super(props);


    this.refName = "aivicsBrickSettingsHeight"
    this.getDOMElement = function(){
      return this.refs[this.refName];
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, ui) {
    var changeToValue = _.toNumber(e.target.value);
    var self = this;
    var $this = $(this.getDOMElement());
    var delay = 300; //800ms
    var $field = $(e.target);

    clearTimeout($this.data('timer'));
    $this.data('timer', setTimeout(function(){
      $this.removeData('timer');
      var fieldName = $field.attr("name");
      console.log({ fieldName: fieldName });

      //change Height of brick
      //then notify parent
      if(!_.isNaN(changeToValue)){
        //Update birck Height
        var record = self.props.model.find({ id: self.props.brickId });
        record.dimension.height = changeToValue;
        //notify parent
        self.props.onBrickSettingChange(record.id, fieldName, changeToValue);
      }

    }, delay ));
  }

  componentDidMount(){
    // var record = this.props.model.find({ id: this.props.brickId });
    // $("input[name='" + this.refName + "']").val(record.dimension.height);
  }

  componentDidUpdate(prevProps, prevState){
    // var record = this.props.model.find({ id: this.props.brickId });
    // $("input[name='" + this.refName + "']").val(record.dimension.height);
  }

  render() {
    var record = this.props.model.find({ id: this.props.brickId });
    var defaultValue = record.dimension.height;
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">Height</div>
            <input type="text"
              ref={this.refName}
              name={this.refName}
              key={this.refName}
              className="form-control"
              placeholder="Height"
              defaultValue={defaultValue}
              onInput={this.handleChange}
              />
          <div className="input-group-addon">px</div>
        </div>
      </div>
    );
  }
}

module.exports = FieldHeight;