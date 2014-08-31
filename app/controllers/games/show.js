import Ember from 'ember';
import constants from '../../common/constants';

var GameShowController = Ember.ObjectController.extend({
  canPlayGame: function () {
    var ruleBundleName = this.get('ruleBundle.name');
    var loggedIn = this.controllerFor('headerRight').loggedInUserId;
    console.log('logged in: ' + loggedIn);
    return this.get('gameStatus') !== 'open' && loggedIn && ruleBundleName === 'TicTacToe' || 
      ruleBundleName === 'MuleSprawl' || ruleBundleName === 'Backgammon';
  }.property('gameStatus', 'ruleBundle'),
  canJoinGame: function () {
    return this.get('gameStatus') === 'open';
  }.property('gameStatus'),
  playGameUrl: function () {
    if (!this.get('ruleBundle')) return '';

    var baseUrl = '../../webservices/public';

    var currentUserId = this.controllerFor('headerRight').loggedInUserId;
    var currentPlayerRel;
    _.each(this.get('players'), function (playerInfo, playerRel) {
      if (playerInfo.playerID === currentUserId) {
        currentPlayerRel = playerRel;
      }
    });
/*
    if (!currentPlayerRel) {
      alert('You are not in this game!');
      return;
    }
*/
    var ruleBundleName = this.get('ruleBundle').name,
      id = this.get('_id'),
      url;
    if (ruleBundleName === 'TicTacToe') 
      url = "tictactoe/?gameID="+id + '&playerRel=' + currentPlayerRel;
    else if (ruleBundleName === 'MuleSprawl')
      url = "mulesprawl/?gameID="+id;
    else if (ruleBundleName === 'Backgammon')
      url = "backgammon/?gameID="+id + '&playerRel=' + currentPlayerRel;

    return baseUrl + '/' + url; 
  }.property('_id', 'ruleBundle', 'players')
});

export default GameShowController;