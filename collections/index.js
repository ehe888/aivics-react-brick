"use strick"

import Backbone from 'backbone'
import BrickCollections from './Bricks.js'
import TransitionCollections from './Transition.js'
import EventCollections from './Event.js'

var DataStorage = {};

var brickCollections = new BrickCollections();
DataStorage.BrickCollections = brickCollections;

var transtionCollections = new TransitionCollections();
DataStorage.TransitionCollections = transtionCollections;

var eventCollections = new EventCollections();
DataStorage.EventCollections = eventCollections;

module.exports = DataStorage;
