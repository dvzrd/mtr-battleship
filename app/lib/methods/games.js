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
    completeGame(argument) {
        check(argument, Object);

        try {
            var gameId = Games.update(argument._id, {
                $set: {'key': argument.key}
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