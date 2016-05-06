"use strict"

class FieldPageTitle extends React.Component {

  constructor(props) {
    super(props);

    this.refName = "aivicsBrickSettingsTitle"
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
      var record = self.props.model.find({ id: self.props.brickId });
      record.title = changeToValue;
      self.props.onBrickSettingChange(self.props.brickId, fieldName, changeToValue);

    }, delay ));
  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps, prevState){

  }

  render() {
    var record = this.props.model.find({ id: this.props.brickId });
    var defaultValue = record.title;
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">Title</div>
            <input type="text"
              ref={this.refName}
              name={this.refName}
              key={this.refName}
              className="form-control"
              placeholder="Title"
              defaultValue={defaultValue}
              onInput={this.handleChange}
              />

        </div>
      </div>
    );
  }
}

module.exports = FieldPageTitle;
