Boards = new Mongo.Collection('boards');

Boards.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Boards.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let BoardsSchema = new SimpleSchema({
    'gameId': {
        type: String,
        label: 'The id of the game this board belongs to'
    },
    'owner': {
        type: String,
        label: 'The username of user that owns the board'
    },
    'createdAt': {
        type: Date,
        label: 'The date the board was created'
    },
    'status': {
        type: String,
        label: 'The status of the game',
        optional: true
    },
    'targets.$.id': {
        type: String,
        label: 'The id of the target cell'
    },
    'targets.$.status': {
        type: String,
        label: 'Status of the target cell'
    }
});

Boards.attachSchema(BoardsSchema);