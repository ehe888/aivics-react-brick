"use strict"

/**
 * Demo entry
 */
import uuid from 'uuid'
import React from "react"
import Bricks from '../src'
import PageSettingPanel from '../settings/pageTools/src'
import PageTransitionSettings from '../settings/pageTransitionSettings/src'
import PageContextMenu from '../settings/contextMenu/src'

$.Bricks = Bricks;

let BrickMask = Bricks.Mask;
let Brick = Bricks.Base;
let LabelBrick = Bricks.Label;
let Page = Bricks.Page;
let BrickSetting = Bricks.settings.Base;
let Transition = Bricks.Transition;
let PagePreview = Bricks.PagePreview;

import DataStorage from './DataStorage'

const PreviewTag = "preview_"

class Preview extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      pageId: this.props.pageId || ''
    }
  }

  componentDidMount() {
    var page = DataStorage.model("Pages").find()[0];
    $(".preview-wrapper").css({
      'width': page.offset.width,
      'height': page.offset.height+64
    })

    this.pageViewUpdate();
  }

  componentDidUpdate() {
    this.pageViewUpdate();
  }

  pageViewUpdate() {
    $(".preview .aivics-page-preview").css({
      top: "64px",
      left: "0px"
    })

    var pageId = this.state.pageId;
    if (!pageId || pageId.length <= 0) {
      pageId = DataStorage.model("Pages").find()[0].id;
    }

    var pages = $(".preview").find($(".aivics-page-preview"));
    for (var i = 0; i < pages.length; i++) {
      var $page = $(pages[i]);
      $page.removeClass("animated fadeIn fadeOut")
      if ($page.attr('data-preview-id') == pageId) {
        $page.show();
      }else{
        $page.hide();
      }
    }
  }

  showStory() {
    this.props.showStory();
    this.refreshPreview();
  }

  refreshPreview() {

    var pageId = DataStorage.model("Pages").find()[0].id;
    this.setState({
      'pageId': pageId
    })
    this.pageViewUpdate();
  }

  onBrickSelect(e, id, position) {
    var self = this;
    var toPageId, fromPageTransition, toPageTransition;
    var transitions = DataStorage.model("Transitions").find();
    if (transitions && transitions.length > 0) {
      transitions.map(function(transition){
        if (transition.fromPageId == id) {
          toPageId = transition.toPageId;
          fromPageTransition = transition.fromPageTransition;
          toPageTransition = transition.toPageTransition;
          return;
        }
      })
      if (toPageId && toPageId.length > 0) {
        this.prepareTransition(self.state.pageId, toPageId, fromPageTransition, toPageTransition)
      }
    }
  }

  prepareTransition(fromPageId, toPageId, fromPageTransition, toPageTransition) {
    var self = this;
    var $fromPage, $toPage;
    var pages = $(".preview").find($(".aivics-page-preview"));
    for (var i = 0; i < pages.length; i++) {
      var $page = $(pages[i]);

      if ($page.attr('data-preview-id') == fromPageId) {
        $fromPage = $page;
      }else if ($page.attr('data-preview-id') == toPageId) {
        $toPage = $page;
      }
    }

    if ($fromPage && $toPage && fromPageTransition && toPageTransition) {
      console.info("add animate")
      $fromPage.removeClass("animated fadeIn");
      $fromPage.addClass("animated fadeOut");
      $toPage.show();
      $toPage.addClass("animated fadeIn");

      // setTimeout(function(){
      //   self.setState({
      //     'pageId': toPageId
      //   }, 1000);
      // })
    }

  }

  renderPages() {
    var self = this;
    var pages = DataStorage.model("Pages").find();
    var content = pages.map(function(page, i){

        return (
          <PagePreview
            id={page.id} key={page.id}
            dataStorage={DataStorage}
            preview= {true}
            onBrickSelect={(e, id, position)=>self.onBrickSelect(e, id, position)}
          />
        )
      })

    return content;
  }

  render() {

    var pageContent = this.renderPages();

    return (
      <div className="preview-content">
        <div ref="header" className="header">
          <div className="btn-group preview" role="group">
            <button type="button"
                    className="btn btn-default"
                    onClick={(event)=>this.showStory(event)}>BACK</button>
            <button type="button"
                    className="btn btn-default"
                    onClick={(event)=>this.refreshPreview(event)}>REFRESH</button>
          </div>
        </div>
        <div ref="content" className="preview">
          <div className="preview-wrapper" ref="previewWrapper">
            <div className="aivics-page-header">
              <p className="status">01:30</p>
              <p className="title">title</p>
            </div>
            {pageContent}
          </div>
        </div>
      </div>
    )
  }

}
module.exports = Preview;
