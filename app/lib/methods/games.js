Meteor.methods({
    createGame(creatorAttributes) {
        check(creatorAttributes, {
            title: String
        });

        var now = new Date(),
            user = Meteor.user(),
            duplicateTitle = Games.findOne({title: creatorAttributes.title, completedAt: null});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'You need to be logged in to create games.');
        }
        if (duplicateTitle) {
            return Meteor.Error('game-title-already-exists', 'This game title already exists.');
        } else {

            var game = _.extend(creatorAttributes, {
                creator: user.username,
                creatorScore: 0,
                createdAt: now,
                destroyer: null,
                destroyerScore: 0,
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

        var user = Meteor.user(),
            game = Games.findOne({_id: gameId}),
            now = new Date();

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to close a game');
        }
        if (!game) {
            throw new Meteor.Error('game-does-not-exist', 'This game is not in the collection');
        } else {
            Games.update(gameId, {
                $set: {'completedAt': now}
            });
        }
    },
    updateScore(scoreAttributes) {
        check(scoreAttributes, {
            gameId: String,
            attacker: String,
            boardId: String
        });

        var game = Games.findOne({_id: scoreAttributes.gameId, completedAt: null}),
            creatorScoredPoints = game.creator === scoreAttributes.attacker,
            pointsLimit = game.creatorScore === 25 || game.destroyerScore === 25,
            points = +5;

        if (!game) {
            throw new Meteor.Error('game-does-not-exist', 'This game is not in the collection');
        }
        if (pointsLimit) {
            throw new Meteor.Error('points-limit-reached', 'You have reached the limit of the amount of points you can score');
        } else {
            if (creatorScoredPoints) {
                Games.update(scoreAttributes.gameId, {
                    $set: {'creatorScore': points}
                });
            } else {
                Games.update(scoreAttributes.gameId, {
                    $set: {'destroyerScore': points}
                });
            }
        }
    },
    declareWinner(winnerAttributes) {
        check(winnerAttributes, {
            gameId: String,
            winner: String
        });

        var game = Games.findOne({_id: gameId}),
            now = new Date();

        if (!game) {
            throw new Meteor.Error('game-does-not-exist', 'This game is not in the collection');
        } else {
            Games.update(winnerAttributes.gameId, {
                $set: {'winner': winnerAttributes.winner, 'completedAt': now}
            });
        }
    }
});