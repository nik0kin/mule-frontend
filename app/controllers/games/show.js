/*global _ */
import Ember from 'ember';

var publicUrl = '../../webservices/public',
  staticUrl = '../../webservices/static';

var GameShowController = Ember.ObjectController.extend({
  needs: 'headerRight',

  loggedInUserId: Ember.computed.alias('controllers.headerRight.loggedInUserId'),
  loggedInPlayerRelId: function () {
    var currentUserId = this.get('loggedInUserId'),
      currentPlayerRel;

    // try to find a matching userId
    _.each(this.get('players'), function (playerInfo, playerRel) {
      if (playerInfo.playerId === currentUserId) {
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
      ruleBundleName === 'MuleSprawl' || ruleBundleName === 'Backgammon' || ruleBundleName === 'ConnectX'
      || ruleBundleName === 'Vikings');
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
        'Vikings': 'vikings/?gameId=' + id,
        'ConnectX': 'connectx/?gameId='+ id,
        'TicTacToe': "tictactoe/?gameId="+id,
        'MuleSprawl': "mulesprawl/?gameId="+id,
        'Backgammon': 'backgammon/?gameId=' + id
      },
      url = ruleBundleUrlSwitchObject[ruleBundleName];

    return staticUrl + '/' + url; 
  }.property('_id', 'ruleBundle', 'loggedInPlayerRelId'),
  boardViewUrl: function () {
    return publicUrl + '/board.html?gameId=' + this.get('_id'); 
  }.property('_id')
});

export default GameShowController;
