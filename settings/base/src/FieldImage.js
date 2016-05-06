"use stick"

class FieldImage extends React.Component {

  constructor(props) {
    super(props);


    this.refName = "aivicsBrickSettingsLabelText"
    this.getDOMElement = function(){
      return this.refs[this.refName];
    };

    this.handleChange = this.handleChange.bind(this)
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
      var record = self.props.model.find({ id: self.props.brickId });
      record.imageUrl = changeToValue;
      //notify parent
      self.props.onBrickSettingChange(record.id, fieldName, changeToValue);

    }, delay ));
  }

  render() {
    var record = this.props.model.find({ id: this.props.brickId });
    var defaultValue = record.imageUrl
    // console.log(record.pageImage)
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">Image</div>
            <input type="textarea"
              ref={this.refName}
              key={this.refName}
              name={this.refName}
              defaultValue={defaultValue}
              className="form-control"
              placeholder="ImageUrl"
              onInput={this.handleChange}
              />
        </div>
      </div>
    )
  }
}

module.exports = FieldImage;
