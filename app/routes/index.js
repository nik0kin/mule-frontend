import BaseRoute from './baseRoute';

var IndexRoute = BaseRoute.extend({
  redirect: function() {
    this.transitionTo('games.open');
  }
});

export default IndexRoute;