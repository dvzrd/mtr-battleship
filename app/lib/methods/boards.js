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
                status: null,
                // @TODO: function to generate targets
                targets: [
                    {id: '1A', status: 'empty', isTarget: false},
                    {id: '2A', status: 'empty', isTarget: false},
                    {id: '3A', status: 'empty', isTarget: false},
                    {id: '4A', status: 'empty', isTarget: false},
                    {id: '5A', status: 'empty', isTarget: false},
                    {id: '1B', status: 'empty', isTarget: false},
                    {id: '2B', status: 'empty', isTarget: false},
                    {id: '3B', status: 'empty', isTarget: false},
                    {id: '4B', status: 'empty', isTarget: false},
                    {id: '5B', status: 'empty', isTarget: false},
                    {id: '1C', status: 'empty', isTarget: false},
                    {id: '2C', status: 'empty', isTarget: false},
                    {id: '3C', status: 'empty', isTarget: false},
                    {id: '4C', status: 'empty', isTarget: false},
                    {id: '5C', status: 'empty', isTarget: false},
                    {id: '1D', status: 'empty', isTarget: false},
                    {id: '2D', status: 'empty', isTarget: false},
                    {id: '3D', status: 'empty', isTarget: false},
                    {id: '4D', status: 'empty', isTarget: false},
                    {id: '5D', status: 'empty', isTarget: false},
                    {id: '1E', status: 'empty', isTarget: false},
                    {id: '2E', status: 'empty', isTarget: false},
                    {id: '3E', status: 'empty', isTarget: false},
                    {id: '4E', status: 'empty', isTarget: false},
                    {id: '5E', status: 'empty', isTarget: false}
                ],
                placementCount: 0,
                targetCount: 0
            }), boardId = Boards.insert(board);

            return {
                _id: boardId
            };
        }
    },
    updateStatus(updateAttributes) {
        check(updateAttributes, {
            boardId: String,
            status: String
        });

        var user = Meteor.user(),
            board = Boards.findOne({_id: updateAttributes.boardId});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to close a game board');
        }
        if (!board) {
            throw new Meteor.Error('game-board-does-not-exist', 'This game board is not in the collection');
        } else {
            Boards.update(updateAttributes.boardId, {
                $set: {'status': updateAttributes.status}
            });
        }
    },
    placeUnit(targetAttributes) {
        check(targetAttributes, {
            boardId: String,
            targetId: String
        });

        var user = Meteor.user(),
            board = Boards.findOne({_id: targetAttributes.boardId, owner: user.username}),
            placementLimit = board.placementCount === 5;

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to place units on game board');
        }
        if (!board) {
            throw new Meteor.Error('game-board-does-not-exist', 'This game board is not available');
        }
        if (placementLimit) {
            throw new Meteor.Error('max-selected-units', 'You don\'t have any more units to spare.');
        } else {
            Boards.update({_id: targetAttributes.boardId, 'targets.id': targetAttributes.targetId}, {
                $set: {'targets.$.status': 'selected'},
                $inc: { placementCount: +1 }
            });
        }
    },
    removeUnit(targetAttributes) {
        check(targetAttributes, {
            boardId: String,
            targetId: String
        });

        var user = Meteor.user(),
            board = Boards.findOne({_id: targetAttributes.boardId, owner: user.username});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to remove units from game board');
        }
        if (!board) {
            throw new Meteor.Error('game-board-does-not-exist', 'This game board is not available');
        } else {
            Boards.update({_id: targetAttributes.boardId, 'targets.id': targetAttributes.targetId}, {
                $set: {'targets.$.status': 'empty'},
                $inc: { placementCount: -1 }
            });
        }
    },
    chooseTarget(targetAttributes) {
        check(targetAttributes, {
            boardId: String,
            targetId: String
        });

        var user = Meteor.user(),
            board = Boards.findOne({_id: targetAttributes.boardId}),
            targetLimit = board.targetCount === 1,
            targetHit = board.targets.id === targetAttributes.targetId && board.targets.status === 'selected';

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to target game board');
        }
        if (!board) {
            throw new Meteor.Error('game-board-does-not-exist', 'This game board is not in the collection');
        }
        if (targetLimit) {
            throw new Meteor.Error('max-targets', 'You can only pick one target, choose wisely.');
        } else {
            Boards.update({_id: targetAttributes.boardId, 'targets.id': targetAttributes.targetId}, {
                $set: {'targets.$.isTarget': true},
                $inc: { targetCount: +1 }
            });
            //if (targetHit) {
            //    Boards.update({_id: targetAttributes.boardId, 'targets.id': targetAttributes.targetId}, {
            //        $set: {'targets.$.status': 'destroyed'}
            //    });
            //
            //    return {
            //        score: 5
            //    };
            //} else {
            //    Boards.update({_id: targetAttributes.boardId, 'targets.id': targetAttributes.targetId}, {
            //        $set: {'targets.$.status': 'missed'}
            //    });
            //
            //    return {
            //        score: 0
            //    }
            //}
        }
    },
    removeTarget(targetAttributes) {
        check(targetAttributes, {
            boardId: String,
            targetId: String
        });

        var user = Meteor.user(),
            board = Boards.findOne({_id: targetAttributes.boardId});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to remove targets from game board');
        }
        if (!board) {
            throw new Meteor.Error('game-board-does-not-exist', 'This game board is not available');
        } else {
            Boards.update({_id: targetAttributes.boardId, 'targets.id': targetAttributes.targetId}, {
                $set: {'targets.$.isTarget': false},
                $inc: { targetCount: -1 }
            });
        }
    }
});