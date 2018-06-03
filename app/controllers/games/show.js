/*global _ */
import Ember from 'ember';

var publicUrl = '../../webservices/public',
  staticUrl = '../../webservices/static';

var playableGames = ['TicTacToe', 'MuleSprawl', 'Backgammon', 'Battleship', 'ConnectX', 'Vikings'];

var GameShowController = Ember.Controller.extend({
  needs: 'headerRight',

  isCollapsed: true,

  actions: {
    toggleCollapsed: function() {
      console.log('called', this.get('model._id'));
      this.set('isCollapsed', !this.get('isCollapsed'));
    }
  },

  loggedInUserId: Ember.computed.alias('controllers.headerRight.loggedInUserId'),
  loggedInPlayerRelId: function () {
    var currentUserId = this.get('loggedInUserId'),
      currentPlayerRel;

    // try to find a matching userId
    _.each(this.get('model.players'), function (playerInfo, playerRel) {
      if (playerInfo.playerId === currentUserId) {
        currentPlayerRel = playerRel;
      }
    });
    console.log('pRel: ' + currentPlayerRel);
    return currentPlayerRel;
  }.property('model.players', 'loggedInUserId'),

  canPlayGame: function () {
    var ruleBundleName = this.get('model.ruleBundle.name'),
      loggedInPlayerRelId = this.get('loggedInPlayerRelId');

    return this.get('model.gameStatus') !== 'open' && loggedInPlayerRelId && _.contains(playableGames, ruleBundleName);
  }.property('model.gameStatus', 'model.ruleBundle', 'loggedInPlayerRelId'),

  canJoinGame: function () {
    return this.get('model.gameStatus') === 'open' && !this.get('loggedInPlayerRelId') && this.get('loggedInUserId');
  }.property('model.gameStatus', 'loggedInUserId', 'loggedInPlayerRelId'),

  lobbyLinkMessage: function () {
    var gameStatus = this.get('model.gameStatus');
    switch (gameStatus) {
      case 'open':
        return 'Join Game Now!';
      case 'inProgress':
        return 'Last played MM/DD/YY';
      case 'finished':
        return 'Game Over';
      default:
        return 'weirdStatus: ' + gameStatus;
    }
  }.property('model.gameStatus'),

  playGameUrl: function () {
    if (!this.get('model.ruleBundle')) { return ''; }

    //var currentPlayerRel = this.get('loggedInPlayerRelId');

    var ruleBundleName = this.get('model.ruleBundle').name,
      id = this.get('model._id'),
      ruleBundleUrlSwitchObject = {
        'Vikings': 'vikings/?gameId=' + id,
        'ConnectX': 'connectx/?gameId='+ id,
        'TicTacToe': "tictactoe/?gameId="+id,
        'MuleSprawl': "mulesprawl/?gameId="+id,
        'Backgammon': 'backgammon/?gameId=' + id,
        'Battleship': 'battleship/?gameId=' + id
      },
      url = ruleBundleUrlSwitchObject[ruleBundleName];

    return staticUrl + '/' + url;
  }.property('model._id', 'model.ruleBundle', 'loggedInPlayerRelId'),
  boardViewUrl: function () {
    return publicUrl + '/board.html?gameId=' + this.get('model._id');
  }.property('model._id')
});

export default GameShowController;
