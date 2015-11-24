// @TODO: add exceptions

Meteor.methods({
    createGame(creatorAttributes) {
        check(creatorAttributes, Object);

        try {
            var game = Games.insert(creatorAttributes);
            return game;
        } catch (exception) {
            return exception;
        }
    },
    joinGame(gameId) {
        check(gameId, String);

        var user = Meteor.user(),
            game = Games.findOne({_id: gameId}),
            userIsPlaying = game.creator === user.username || game.destroyer === user.username,
            gameIsFull = game.playerCount === 2 && !userIsPlaying,
            pathDef = '/battle/:_id',
            params = {_id: gameId},
            path = FlowRouter.path(pathDef, params);

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to join a game');
        }
        if (!game) {
            throw new Meteor.Error('game-does-not-exist', 'This game is not in the collection');
        }
        if (gameIsFull) {
            // @TODO: method for joining a recently created and available game
            return Meteor.Error('game-full', 'This game is full.');
        } else {
            if (userIsPlaying) {
                FlowRouter.go(path);
            } else {
                Games.update(gameId, {
                    $set: {'destroyer': user.username, 'playerCount': 2}
                });
            }
        }
    },
    completeGame(gameId) {
        check(gameId, String);

        var now = new Date();

        try {
            var game = Games.update(gameId, {
                $set: {'completedAt': now}
            });
            return game;
        } catch (exception) {
            return exception;
        }
    },
    declareWinner(argument) {
        check(argument, Object);

        try {
            var game = Games.update(argument._id, {
                $set: {'key': argument.key}
            });
            return game;
        } catch (exception) {
            return exception;
        }
    }
});