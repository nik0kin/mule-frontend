import Ember from 'ember';

var GamesController = Ember.ArrayController.extend({
  itemController: 'games.show'
});

export default GamesController;