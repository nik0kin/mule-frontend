import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

Ember.Handlebars.registerBoundHelper('jsonToString', 
  function(json) {
  return JSON.stringify(json);
});

export default App;


/**
top bar ( login or register (popup?) : turns into user info after logged in(hello user123))
  - and create game button?

/createGame

/games - list of games (click to expand for limited info )
  - index?

/games/1
  - all info about game (including board render)

/users
  - your info?

*/