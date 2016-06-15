"use stick"

class FieldImage extends React.Component {

  constructor(props) {
    super(props);


    this.refName = "aivicsBrickSettingsImageUrl"
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

      var record = self.props.model.find({ id: self.props.brickId }, self.props.treeName).getValue();
      record.imageUrl = changeToValue;
      //notify parent
      self.props.onBrickSettingChange(self.props.brickId, fieldName, changeToValue);

    }, delay ));
  }

  render() {

    var record = this.props.model.find({ id: this.props.brickId }, this.props.treeName).getValue();
    var defaultValue = record.imageUrl
    // console.log(record.pageImage)
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">Image</div>
            <button className="btn btn-default imageGallery"
                    type="submit" data-toggle="modal" data-target="#galleryMenu"
                    >Gallery</button>
        </div>
      </div>
    )
  }
}

module.exports = FieldImage;
