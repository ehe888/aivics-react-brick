import React from "react"

//const _aivicsBrickSettingsWidth = "aivicsBrickSettingsWidth";

class FieldWidth extends React.Component {
  constructor(props) {
    super(props);


    this.refName = "aivicsBrickSettingsWidth"
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

      //change width of brick
      //then notify parent
      if(!_.isNaN(changeToValue)){
        //Update birck width
        var record = self.props.model.find({ id: self.props.brickId });
        record.dimension.width = changeToValue;
        //notify parent
        self.props.onBrickSettingChange(record.id, fieldName, changeToValue);
      }

    }, delay ));
  }

  componentDidMount(){
    // var record = this.props.model.find({ id: this.props.brickId });
    // $("input[name='" + this.refName + "']").val(record.dimension.width);
  }

  componentDidUpdate(prevProps, prevState){
    // var record = this.props.model.find({ id: this.props.brickId });
    // $("input[name='" + this.refName + "']").val(record.dimension.width);
  }

  render() {
    var record = this.props.model.find({ id: this.props.brickId });
    var defaultValue = record.dimension.width;
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">Width</div>
            <input type="text"
              ref={this.refName}
              name={this.refName}
              key={this.refName}
              className="form-control"
              placeholder="width"
              defaultValue={defaultValue}
              onInput={this.handleChange}
              />
          <div className="input-group-addon">px</div>
        </div>
      </div>
    );
  }
}

module.exports = FieldWidth;