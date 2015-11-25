Meteor.methods({
    createGameBoard(boardAttributes) {
        check(boardAttributes, {
            gameId: String
        });

        var now = new Date(),
            user = Meteor.user(),
            duplicateBoard = Boards.findOne({gameId: boardAttributes.gameId, owner: user.username});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'You need to be logged in to create a game board.');
        }
        if (duplicateBoard) {
            return Meteor.Error('game-board-already-exists', 'This game board already exists.');
        } else {

            var board = _.extend(boardAttributes, {
                owner: user.username,
                createdAt: now,
                unitPlacements: null,
                status: null,
            }), boardId = Boards.insert(board);

            return {
                _id: boardId
            };
        }
    },
    placeBattleUnits(placementAttributes) {
        check(placementAttributes, {
            boardId: String,
            unitPlacements: Array
        });

        var user = Meteor.user(),
            board = Boards.findOne({_id: boardId, owner: user.username});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to place units on game board');
        }
        if (!board) {
            throw new Meteor.Error('game-board-does-not-exist', 'This game board is not in the collection');
        } else {
            Boards.update(placementAttributes.boardId, {
                $set: {'unitPlacements': placementAttributes.unitPlacements, 'status': 'ready'}
            });
        }
    },
    targetGameBoard(targetAttributes) {
        check(targetAttributes, {
            boardId: String,
            boardOwner: String,
            targetId: String
        });

        var user = Meteor.user(),
            board = Boards.findOne({_id: targetAttributes.boardId, owner: targetAttributes.boardOwner});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to target game board');
        }
        if (!board) {
            throw new Meteor.Error('game-board-does-not-exist', 'This game board is not in the collection');
        } else {
            // @TODO: if targetId matches unitId in unitPlacements of board
            // set unitId to destroyed and add point to attacker
            // else register as miss -- return messages to client
        }
    },
    completeGameBoard(boardId) {
        check(boardId, String);

        var user = Meteor.user(),
            board = Boards.findOne({_id: boardId, owner: user.username});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to close a game board');
        }
        if (!board) {
            throw new Meteor.Error('game-board-does-not-exist', 'This game board is not in the collection');
        } else {
            Boards.update(boardId, {
                $set: {'status': 'closed'}
            });
        }
    }
});