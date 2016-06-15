"use strict"

require('./css/style.css')

class GalleryMenuItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="gallery-image">
        <img src={this.props.src} onClick={(event)=>this.props.handleGalleryItemClick(this.props.src)}/>
      </div>
    )
  }
}

class GalleryMenu extends React.Component {
  constructor(props) {
    super(props)

    this.imageUrls = [
      "http://cc.cocimg.com/api/uploads/20160512/1463023394508339.jpg",
      "http://cc.cocimg.com/api/uploads/20160512/1463021972649553.jpg",
      "http://cc.cocimg.com/api/uploads/20160511/1462956017792324.jpg",
      "http://cc.cocimg.com/api/uploads/20160512/1463039069701400.jpg",
      "http://cc.cocimg.com/api/uploads/20160511/1462958243216969.png"
    ]
  }

  handleGalleryItemClick(imageUrl) {
    // console.info("handleGalleryItemClick")
    var imageBrick = this.props.dataStorage.BrickCollections
                      .find({id: this.props.activeBrickId}, this.props.treeName)
    if (imageBrick) {
      imageBrick.set("imageUrl", imageUrl);
    }

    this.props.onBrickSettingChange(this.props.activeBrickId, "image", imageUrl);
    // console.info(this.refs["AivicsImageGallery"])
    $(this.refs["AivicsImageGallery"]).modal("hide");
  }

  renderItems() {
    var self = this;
    return this.imageUrls.map(function(imageUrl){
      return(
        <GalleryMenuItem
          id={imageUrl} key={imageUrl}
          handleGalleryItemClick={self.handleGalleryItemClick.bind(self)}
          src={imageUrl}
          />
      )
    })
  }

  render() {

    var items = this.renderItems();
    return(
      <div className="modal fade galleryMenu" id="galleryMenu" ref="AivicsImageGallery">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Gallery</h4>
            </div>
            <div className="modal-body">
              {items}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = GalleryMenu;
