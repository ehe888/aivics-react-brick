"use strict"

/**
 * Demo entry
 */
import uuid from 'uuid'
import React from "react"
import Bricks from '../src'
import TransitionSettings from '../settings/transitionSettings/src'

$.Bricks = Bricks;

let Transition = Bricks.Transition;
let PagePreview = Bricks.PagePreview;
let Page = Bricks.Page;

import DataStorage from './DataStorage'

const PreviewTag = "preview_"

class Preview extends React.Component {

  constructor(props){
    super(props)

    var pageId = DataStorage.model("Bricks").find()[0].id;
    this.state = {
      pageId: pageId || ''
    }
  }

  componentDidMount() {
    var page = DataStorage.model("Bricks").find()[0];
    $(".preview-wrapper").css({
      'width': page.offset.width,
      'height': page.offset.height
    })

    this.pageViewUpdate();
  }

  componentDidUpdate() {
    var pageId = DataStorage.model("Bricks").find()[0].id;
    this.pageViewUpdate(pageId);
  }

  pageViewUpdate(id) {
    $(".preview .aivics-page-preview").css({
      top: "64px",
      left: "0px"
    })

    var barMode = this.props.barMode;
    if (!barMode || barMode == 0) {
      $(this.refs.footer).hide();
    }else {
      $(this.refs.footer).show();
    }

    var $bricks = $(".preview .aivics-brick");
    var model = DataStorage.model("Bricks");
    var treeName = this.props.treeName;
    for (var i = 0; i < $bricks.length; i++) {
      var $brick = $($bricks[i]);
      console.info($brick)
      var id = $brick.attr('id');
      var brick = model.find({id: id}, treeName);
      if (brick) {
        var animation = brick.animation;
        if (animation) {

          var animationName = animation.name;
          var animationDelay = 'f-ad';
          var delay = parseInt(animation.delay);
          if (!isNaN(delay)) {
            animationDelay+= delay*3;
          }
          var animationDuration = "animated";

          $brick.addClass(animationName+" " + animationDuration+" " +animationDelay)
        }
      }
    }

    var pageId = id?pageId:this.state.pageId;
    if (!pageId || pageId.length <= 0) {
      pageId = DataStorage.model("Bricks").find()[0].id;
    }

    var pages = $(".preview").find($(".aivics-page-preview"));
    for (var i = 0; i < pages.length; i++) {
      var $page = $(pages[i]);
      this.clearAnimate($page, true)
      if ($page.attr('data-preview-id') == pageId) {
        $page.removeClass('f-ann')
        $page.find(".animated").removeClass('f-ann')
        $page.show();
      }else{
        $page.hide();
      }
    }

  }

  showStory() {
    this.props.showStory();
    // this.refreshPreview();
  }

  refreshPreview() {

    var pageId = DataStorage.model("Bricks").find()[0].id;
    this.setState({
      'pageId': pageId
    })
    this.pageViewUpdate();
  }

  onBrickSelect(e, id, position) {
    console.info("click: " + id)
    var self = this;
    var transitionId, fromPageId, toPageId, fromPageTransition, toPageTransition;
    var events = DataStorage.model("Events").find();
    if (events) {
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.targetId == id) {
          transitionId = event.transitionId
          break;
        }
      }

      var transition = DataStorage.model("Transitions").find({id: transitionId}, this.props.treeName);
      if (transition) {
        fromPageId = transition.fromPageId
        toPageId = transition.toPageId;
        fromPageTransition = transition.fromPageTransition;
        toPageTransition = transition.toPageTransition;
        if (toPageId && toPageId.length > 0) {
          this.prepareTransition(fromPageId, toPageId, fromPageTransition, toPageTransition)
        }
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
      //when begin transiting
      //clear fromPage's animate, add fromPageTransition to fromPage;
      //show toPage, add toPageTransition to toPage;
      //when end transiting
      //hide fromPage, stop animation of fromPage's bricks
      //start animation of toPage's bricks
      this.clearAnimate($fromPage);
      $fromPage.removeClass("f-ann")
      $fromPage.addClass("animated "+fromPageTransition);
      $toPage.find('.animated').addClass('f-ann')
      $toPage.show();
      $toPage.removeClass("f-ann")
      $toPage.addClass("animated "+toPageTransition);
      setTimeout(function(){
        $fromPage.hide();
        $fromPage.removeClass(fromPageTransition);
        $fromPage.find('.animated').addClass('f-ann')
        $toPage.find('.animated').removeClass('f-ann')
      },1200)
    }
  }


  clearAnimate($obj, removeAnimated) {
    if (removeAnimated) {
      $obj.removeClass("animated");
    }
    $obj.addClass('f-ann')
  }

  renderPages() {
    var self = this;
    var pages = DataStorage.model("Bricks").find();
    var content = pages.map(function(page, i){

        return (
          <PagePreview
            id={page.id} key={page.id}
            dataStorage={DataStorage}
            preview= {true}
            treeName = {self.props.treeName}
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
            <div ref="footer" className="footer"></div>
          </div>
        </div>

      </div>
    )
  }

}
module.exports = Preview;
