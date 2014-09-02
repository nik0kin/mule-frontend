/*global _ */
import Ember from 'ember';

var baseUrl = '../../webservices/public';

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
    if (!this.get('ruleBundle')) { return ''; }

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
      ruleBundleUrlSwitchObject = {
        'TicTacToe': "tictactoe/?gameID="+id + '&playerRel=' + currentPlayerRel,
        'MuleSprawl': "mulesprawl/?gameID="+id,
        'Backgammon': "backgammon/?gameID="+id + '&playerRel=' + currentPlayerRel
      },
      url = ruleBundleUrlSwitchObject[ruleBundleName];

    return baseUrl + '/' + url; 
  }.property('_id', 'ruleBundle', 'players'),
  boardViewUrl: function () {
    return baseUrl + '/board.html?gameID=' + this.get('_id'); 
  }.property('_id')
});

export default GameShowController;
