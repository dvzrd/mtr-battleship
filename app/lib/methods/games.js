Meteor.methods({
    createGame(creatorAttributes) {
        check(creatorAttributes, Object);

        try {
            var gameId = Games.insert(creatorAttributes);
            return gameId;
        } catch (exception) {
            return exception;
        }
    },
    joinGame(destroyerAttributes) {
        check(destroyerAttributes, Object);

        try {
            var gameId = Games.update(destroyerAttributes._id, {
                $set: {'key': destroyerAttributes.key}
            });
            return gameId;
        } catch (exception) {
            return exception;
        }
    },
    completeGame(gameId) {
        check(gameId, String);

        var user = Meteor.user(),
            now = new Date();

        try {
            var gameId = Games.update(gameId, {
                $set: {'completedAt': now}
            });
            return gameId;
        } catch (exception) {
            return exception;
        }
    },
    declareWinner(argument) {
        check(argument, Object);

        try {
            var gameId = Games.update(argument._id, {
                $set: {'key': argument.key}
            });
            return gameId;
        } catch (exception) {
            return exception;
        }
    }
});