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

  //Begin /pageViewUpdate/
  //Purpose: update pages, include page style, animation, transition.
  //Actions: clear deeply animation of pages; reset barMode; add animation stlye to bricks
  //Arguments:
  //  * id - the first page
  pageViewUpdate(id) {
    $(".preview .aivics-page-preview").css({
      top: "64px",
      left: "0px"
    })

    //show the page of pageId as home page
    var pageId = id?pageId:this.state.pageId,
        $firstPage;
    if (!pageId || pageId.length <= 0) {
      pageId = DataStorage.model("Bricks").find()[0].id;
    }
    var pages = $(".preview").find($(".aivics-page-preview"));
    for (var i = 0; i < pages.length; i++) {
      var $page = $(pages[i]);
      this.clearAnimate($page, true, true)
      if ($page.attr('data-preview-id') == pageId) {
        $page.show();
        $firstPage = $page;
      }else{
        $page.hide();
      }
    }

    //reset bar mode
    var barMode = this.props.barMode;
    if (!barMode || barMode == 0) {
      $(this.refs.footer).hide();
    }else {
      $(this.refs.footer).show();
    }

    //add animation to bricks
    var $bricks = $(".preview .aivics-brick");
    var model = DataStorage.model("Bricks");
    var treeName = this.props.treeName;
    for (var i = 0; i < $bricks.length; i++) {
      var $brick = $($bricks[i]);
      var id = $brick.attr('id');
      var brick = model.find({id: id}, treeName);
      if (brick) {
        var animation = brick.animation;
        if (animation) {

          var animationName = animation.name;
          var animationDelay = 'f-ad';
          var delay = parseInt(animation.delay);
          if (!isNaN(delay)) {
            animationDelay+= delay*2;
          }
          var animationDuration = "animated";

          $brick.addClass(animationName+" " + animationDuration+" " +animationDelay)
        }
      }
    }
    $firstPage.removeClass('f-ann')
    $firstPage.find(".animated").removeClass('f-ann')

  }
  //End /pageViewUpdate/


  showStory() {

    this.props.showStory();
  }

  //Begin refresh button event handler /refreshPreview/
  //Purpose: reset the preview; enter the home page
  refreshPreview() {
    var pageId = DataStorage.model("Bricks").find()[0].id;
    this.setState({
      'pageId': pageId
    })
    this.pageViewUpdate();
  }
  //End refresh button event handler /refreshPreview/


  //Begin brick click event handler /onBrickClick/
  //Purpose: click brick, check if brick has event, then trigger it
  //Arguments:
  //  * event - jquery event object
  //  * id - brickId
  onBrickClick(event, id) {

    var self = this;
    var transitionId, fromPageId, toPageId, fromPageTransition, toPageTransition;

    //check if brick has its own event
    var events = DataStorage.model("Events").find();
    if (events) {
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.targetId == id) {
          transitionId = event.transitionId
          break;
        }
      }
      if (!transitionId) {
        return;
      }
      //if has event and transition, trigger it;
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
  //End brick click event handler /onBrickClick/


  //Begin transition method /prepareTransition/
  //Purpose: transit from fromPage to toPage
  //Actions: query fromPage and toPage by fromPageId and toPageId; clear animation
  //        of fromPage, show toPage, add transition animation to fromPage and toPage,
  //        when transition end, hide from page and start animation in toPage's bricks
  //Arguments:
  //  * fromPageId - id of fromPage
  //  * toPageId - id of toPage
  //  * fromPageTransition - animation of from page transition
  //  * toPageTransition - animation of to page transition
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
      },1000)
    }
  }
  //End transition method /prepareTransition/


  //Begin /clearAnimate/
  //Purpose: remove or reset animation of $obj
  //Arguments:
  //  * $obj - jquery object which we want to remove animate
  //  * removeAnimated - remove 'animated' class if true
  //  * clearDeep - remove $obj and its chidren's animated-relate class
  clearAnimate($obj, removeAnimated, clearDeep) {
    $obj.addClass('f-ann')
    if (removeAnimated) {
      $obj.removeClass("animated");
    }

    if (clearDeep) {
      var children = $obj.find('.animated');
      for (var i = 0; i < children.length; i++) {
        var $child = $(children[i]);
        var classes = $child.attr('class');
        $child.removeClass(classes);
        $child.addClass('animated')
        $child.addClass('aivics-brick')
      }
    }
  }
  //End /clearAnimate/

  //Begin render page method /renderPages/
  //Purpose: render pages saved in DataStorage
  renderPages() {
    var self = this;
    var pages = DataStorage.model("Bricks").find();
    var content = pages.map(function(page, i){
        console.info("render", page[self.props.treeName])
        return (
          <PagePreview
            id={page.id} key={page.id}
            dataStorage={DataStorage}
            preview= {true}
            treeName = {self.props.treeName}
            onBrickSelect={(e, id, position)=>self.onBrickClick(e, id)}
          />
        )
      })

    return content;
  }
  //End render page method /renderPages/

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
