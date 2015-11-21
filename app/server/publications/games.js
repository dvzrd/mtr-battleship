Meteor.publish('games', function () {
    return Games.find();
});

Meteor.publish('creatorsGames', function () {
    return Games.find({'creator': this.userId}, {fields: {'creator': 1}});
});

