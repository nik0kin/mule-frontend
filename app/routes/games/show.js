import Ember from 'ember';
import Game from '../../models/Game';
import constants from '../../common/constants';

var GamesShowRoute = Ember.Route.extend({
	renderTemplate: function () {
    this.render('headerLeft', { 
      view: 'headerLeft', 
      outlet: 'headerLeft', 
      into: 'application',
      controller: this.controllerFor('headerLeft')
    });
		this.render('headerRight', { 
      view: 'headerRight', 
      outlet: 'headerRight', 
      into: 'application',
      controller: this.controllerFor('headerRight')
    });
    this.render('gamesShow', {
      view: 'gamesShow',
      into: 'application',
      controller: this.controllerFor('games.show')
    });
	},
  setupController: function(controller, model) {
    console.log('set it up');
    console.log(controller);
    console.log(model);

    var that = this;
    Game.findQ(model._id).then(function (game) {
      controller.set('content', game);
    })
      .fail(function () {
        console.log('404 Game, redirecting');
        that.transitionTo('games');
      });
  },
  actions: {
    joinGame: function (id) {
      var that = this;
      Ember.$.ajax({
          type: "POST",
          url: constants.webservicesUrl + "/games/" + id + '/join'
        }).done(function(data) {
          console.log( "Data Recieved: " + JSON.stringify(data) );

          if(data.status !== 0){
            alert("join game failed: "+data.statusMsg);
            return;
          }

          alert('you joined gameID[' + data.gameID + ']');
          console.log(this);
          that.refresh();

        }).fail(function(msg){
          alert("JoinGame Fail Response:" + JSON.stringify(msg));
        });
    }
  }
});

export default GamesShowRoute;