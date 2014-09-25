/*global _ */
import Ember from 'ember';

var baseUrl = '../../webservices/public';

var GameShowController = Ember.ObjectController.extend({
  needs: 'headerRight',

  loggedInUserId: Ember.computed.alias('controllers.headerRight.loggedInUserId'),
  loggedInPlayerRelId: function () {
    var currentUserId = this.get('loggedInUserId'),
      currentPlayerRel;

    // try to find a matching userId
    _.each(this.get('players'), function (playerInfo, playerRel) {
      if (playerInfo.playerID === currentUserId) {
        currentPlayerRel = playerRel;
      }
    });
    console.log('pRel: ' + currentPlayerRel);
    return currentPlayerRel;
  }.property('players', 'loggedInUserId'),

  canPlayGame: function () {
    var ruleBundleName = this.get('ruleBundle.name'),
      loggedInPlayerRelId = this.get('loggedInPlayerRelId');

    return this.get('gameStatus') !== 'open' && loggedInPlayerRelId && (ruleBundleName === 'TicTacToe' || 
      ruleBundleName === 'MuleSprawl' || ruleBundleName === 'Backgammon');
  }.property('gameStatus', 'ruleBundle', 'loggedInPlayerRelId'),

  canJoinGame: function () {
    return this.get('gameStatus') === 'open' && !this.get('loggedInPlayerRelId') && this.get('loggedInUserId');
  }.property('gameStatus', 'loggedInUserId', 'loggedInPlayerRelId'),

  playGameUrl: function () {
    if (!this.get('ruleBundle')) { return ''; }

    var currentPlayerRel = this.get('loggedInPlayerRelId');

    var ruleBundleName = this.get('ruleBundle').name,
      id = this.get('_id'),
      ruleBundleUrlSwitchObject = {
        'TicTacToe': "tictactoe/?gameID="+id + '&playerRel=' + currentPlayerRel,
        'MuleSprawl': "mulesprawl/?gameID="+id,
        'Backgammon': "backgammon/?gameID="+id + '&playerRel=' + currentPlayerRel
      },
      url = ruleBundleUrlSwitchObject[ruleBundleName];

    return baseUrl + '/' + url; 
  }.property('_id', 'ruleBundle', 'loggedInPlayerRelId'),
  boardViewUrl: function () {
    return baseUrl + '/board.html?gameID=' + this.get('_id'); 
  }.property('_id')
});

export default GameShowController;
