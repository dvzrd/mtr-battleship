// @TODO: add exceptions

Meteor.methods({
    createGame(creatorAttributes) {
        check(creatorAttributes, {
            title: String
        });

        var now = new Date(),
            user = Meteor.user(),
            duplicateTitle = Games.findOne({title: creatorAttributes.title});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'You need to be logged in to create games.');
        }
        if (duplicateTitle) {
            return Meteor.Error('game-title-already-exists', 'This game title already exists.');
        } else {

            var game = _.extend(creatorAttributes, {
                creator: user.username,
                createdAt: now,
                destroyer: null,
                playerCount: 1,
                winner: null,
                completedAt: null
            }), gameId = Games.insert(game);

            return {
                _id: gameId
            };
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