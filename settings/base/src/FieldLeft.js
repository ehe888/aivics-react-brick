import React from "react"


class FieldLeft extends React.Component {
  constructor(props) {
    super(props);


    this.refName = "aivicsBrickSettingsLeft"
    this.getDOMElement = function(){
      return this.refs[this.refName];
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, ui) {
    var changeToValue = _.toNumber(e.target.value);
    var self = this;
    var $this = $(this.getDOMElement());
    var delay = 800; //800ms
    var $field = $(e.target);

    clearTimeout($this.data('timer'));
    $this.data('timer', setTimeout(function(){
      $this.removeData('timer');
      var fieldName = $field.attr("name");
      console.log({ fieldName: fieldName });

      //change Left of brick
      //then notify parent
      if(!_.isNaN(changeToValue)){
        //Update brick Left
        var record = self.props.model.find({ id: self.props.brickId }, self.props.treeName).getValue();
        record.offset.left = changeToValue;
        //notify parent
        self.props.onBrickSettingChange(self.props.brickId, fieldName, changeToValue);
      }

    }, delay ));
  }

  componentDidMount(){
    // var record = this.props.model.find({ id: this.props.brickId });
    // $("input[name='" + this.refName + "']").val(record.offset.Left);
  }

  componentDidUpdate(prevProps, prevState){
    // var record = this.props.model.find({ id: this.props.brickId });
    // $("input[name='" + this.refName + "']").val(record.offset.left);
  }

  render() {
    var record = this.props.model.find({ id: this.props.brickId }, this.props.treeName).getValue();
    var defaultValue = record.offset.left;
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">Left</div>
            <input type="text"
              ref={this.refName}
              name={this.refName}
              key={this.refName}
              className="form-control"
              placeholder="Left"
              defaultValue={defaultValue}
              onInput={this.handleChange}
              />
          <div className="input-group-addon">px</div>
        </div>
      </div>
    );
  }
}

module.exports = FieldLeft;
