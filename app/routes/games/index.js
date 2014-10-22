import BaseRoute from '../baseRoute';

var GamesIndexRoute = BaseRoute.extend({
  beforeModel: function() {
    this.transitionTo('games.open');
  }
});

export default GamesIndexRoute;