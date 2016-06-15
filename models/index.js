"use strick"

import PageModel from './Bricks/Page.js'
import BaseBrickModel from './Bricks/BaseBrick.js'
import TransitionModel from './Transitions/Transition.js'
import EventModel from './Events/Event.js'

var models = {};

models.PageModel = PageModel;
models.BaseBrickModel = BaseBrickModel;
models.TransitionModel = TransitionModel;
models.EventModel = EventModel;

module.exports = models;
